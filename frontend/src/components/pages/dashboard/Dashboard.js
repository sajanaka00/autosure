import { useState } from 'react';
import Navbar from '../../common/Navbar';
import Home from '../dashboard/Home';
import BrowseCars from '../listings/BrowseCars';

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home user={user} />;
      case 'browse':
        return <BrowseCars user={user} />;
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