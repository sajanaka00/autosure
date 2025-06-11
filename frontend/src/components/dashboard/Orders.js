import '../../styles/orders.css';

export default function Orders({ user }) {
  return (
    <div className="orders-container fade-in">
      <h2 className="page-title">Orders</h2>
      <div className="table-container">
        <table className="orders-table">
          <thead className="table-header">
            <tr>
              <th>Order ID</th>
              <th>Car</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {[1, 2, 3].map((order) => (
              <tr key={order}>
                <td className="order-id">#ORD00{order}</td>
                <td>Sample Car {order}</td>
                <td>Customer {order}</td>
                <td>
                  <span className="status-badge badge-verified">
                    Completed
                  </span>
                </td>
                <td className="order-amount">$25,000</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-small btn-primary">View</button>
                    <button className="btn-small btn-secondary">Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}