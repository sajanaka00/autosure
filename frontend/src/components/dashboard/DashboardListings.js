import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { tokenManager } from '../../utils/tokenManager';

export default function DashboardListings() {
    const navigate = useNavigate();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = tokenManager.getUser();

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            // Try to fetch real listings first
            const data = await api.getVehicles(user?.token);
            // API returns { success: true, vehicles: [...], pagination: ... }
            if (data.success && Array.isArray(data.vehicles)) {
                setListings(data.vehicles);
            } else if (Array.isArray(data)) {
                // Fallback for direct array response
                setListings(data);
            } else {
                setListings([]);
            }
        } catch (err) {
            console.error("Failed to fetch listings", err);
            setListings([]); // If API fails, listings should be empty
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            // Check if it's a mock ID (simple string/number) or real Mongo ID
            const isMock = !/^[0-9a-fA-F]{24}$/.test(id);

            if (isMock) {
                setListings(prev => prev.filter(v => v.id !== id));
                return;
            }

            try {
                await api.deleteVehicle(id, user?.token);
                setListings(prev => prev.filter(v => (v._id || v.id) !== id));
            } catch (error) {
                console.error('Failed to delete:', error);
                alert('Failed to delete listing');
            }
        }
    };

    const handleEdit = (vehicle) => {
        // Navigate to Add Page with state/search param to populate form
        navigate('/vehicles/add', { state: { editMode: true, vehicleData: vehicle } });
    };

    const handleView = (id) => {
        navigate(`/vehicles/${id}`);
    };

    if (loading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading listings...</div>;
    }

    return (
        <div className="dashboard-listings-container">
            <div className="listings-table-header">
                <div className="col-image">Vehicle</div>
                <div className="col-details">Details</div>
                <div className="col-price">Price</div>
                <div className="col-status">Status</div>
                <div className="col-actions">Actions</div>
            </div>

            <div className="listings-list">
                {listings.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                        No listings found. Add your first vehicle!
                    </div>
                ) : (
                    listings.map((vehicle) => (
                        <div key={vehicle._id || vehicle.id} className="listing-row">
                            <div className="col-image">
                                {(() => {
                                    const SERVER_URL = 'http://localhost:3001';
                                    let imgPath = null;

                                    // 1. Check legacy 'image' field
                                    if (vehicle.image) {
                                        imgPath = vehicle.image;
                                    }
                                    // 2. Check 'images' array
                                    else if (vehicle.images && vehicle.images.length > 0) {
                                        const firstImg = vehicle.images[0];
                                        // Handle if it's an object with url property, or a string
                                        imgPath = typeof firstImg === 'object' ? firstImg.url : firstImg;
                                    }

                                    // 3. Fallback
                                    if (!imgPath) {
                                        return <img src="https://placehold.co/100x60?text=No+Image" alt={vehicle.title} />;
                                    }

                                    // 4. Construct Full URL
                                    let fullUrl = imgPath;
                                    if (!imgPath.startsWith('http') && !imgPath.startsWith('blob:') && !imgPath.startsWith('data:')) {
                                        // If it starts with slash, allow it. If it looks like a filename, prepend path?
                                        // Backend says: url: '/uploads/vehicles/...'
                                        // So just prepend SERVER_URL
                                        fullUrl = `${SERVER_URL}${imgPath}`;
                                    }

                                    return <img src={fullUrl} alt={vehicle.title} onError={(e) => { e.target.src = 'https://placehold.co/100x60?text=Error'; }} />;
                                })()}
                            </div>
                            <div className="col-details">
                                <h4>{vehicle.title || `${vehicle.make} ${vehicle.model}`}</h4>
                                <p>{vehicle.year} • {vehicle.mileage || vehicle.mileageRange || 'N/A'}</p>
                                <div className="mobile-only-price">{typeof (vehicle.price || vehicle.totalValue) === 'number' ? `$${(vehicle.price || vehicle.totalValue).toLocaleString()}` : (vehicle.price || vehicle.totalValue || 'N/A')}</div>
                            </div>
                            <div className="col-price">
                                {typeof (vehicle.price || vehicle.totalValue) === 'number'
                                    ? `$${(vehicle.price || vehicle.totalValue).toLocaleString()}`
                                    : (vehicle.price || vehicle.totalValue || 'N/A')}
                            </div>
                            <div className="col-status">
                                <span className={`status-badge ${vehicle.condition === 'New' ? 'active' : 'pending'}`}>
                                    Active
                                </span>
                            </div>
                            <div className="col-actions">
                                <button
                                    className="action-icon edit"
                                    title="Edit"
                                    onClick={() => handleEdit(vehicle)}
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    className="action-icon view"
                                    title="View"
                                    onClick={() => handleView(vehicle._id || vehicle.id)}
                                >
                                    <Eye size={18} />
                                </button>
                                <button
                                    className="action-icon delete"
                                    title="Delete"
                                    onClick={() => handleDelete(vehicle._id || vehicle.id)}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
