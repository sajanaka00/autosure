import '../../styles/my-orders.css';

export default function MyOrders({ user }) {
  return (
    <div className="my-orders-container fade-in">
      <h2 className="page-title">My Orders</h2>
      <div className="orders-list">
        {[1, 2].map((order) => (
          <div key={order} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <h3 className="order-title">Order #ORD00{order}</h3>
                <p className="order-details">Sample Car {order} • 2023 Model</p>
              </div>
              <span className="status-badge badge-customer">
                Processing
              </span>
            </div>
            <div className="order-footer">
              <p className="order-price">$25,000</p>
              <button className="btn-primary">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}