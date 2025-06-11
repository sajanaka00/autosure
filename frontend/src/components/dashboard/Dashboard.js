import { useState } from 'react';
import Navbar from '../common/Navbar';
import Home from '../dashboard/Home';
import BrowseCars from '../dashboard/BrowseCars';
import MyCars from '../dashboard/MyCars';
import AddCar from '../dashboard/AddCar';
import Orders from '../dashboard/Orders';
import MyOrders from '../dashboard/MyOrders';
import '../../styles/dashboard.css';

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home user={user} />;
      case 'browse':
        return <BrowseCars user={user} />;
      case 'cars':
        return <MyCars user={user} />;
      case 'add-car':
        return <AddCar user={user} />;
      case 'orders':
        return <Orders user={user} />;
      case 'my-orders':
        return <MyOrders user={user} />;
      default:
        return <Home user={user} />;
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar 
        user={user} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={onLogout} 
      />

      <main className="dashboard-main">
        {renderContent()}
      </main>
    </div>
  );
}