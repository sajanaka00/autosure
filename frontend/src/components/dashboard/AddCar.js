import '../../styles/add-car.css';

export default function AddCar({ user }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add car logic here
    console.log('Adding new car...');
  };

  return (
    <div className="add-car-container fade-in">
      <h2 className="page-title">Add New Car</h2>
      <div className="form-container">
        <form className="car-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Car Make</label>
            <input type="text" className="form-input" required />
          </div>
          
          <div className="form-group">
            <label className="form-label">Car Model</label>
            <input type="text" className="form-input" required />
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Year</label>
              <input type="number" className="form-input" min="1900" max="2024" required />
            </div>
            <div className="form-group">
              <label className="form-label">Price</label>
              <input type="number" className="form-input" min="0" step="0.01" required />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-textarea" rows="4" required></textarea>
          </div>
          
          <button type="submit" className="btn-primary submit-btn">
            Add Car
          </button>
        </form>
      </div>
    </div>
  );
}