import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import UpdateProject from './UpdateProject';
import ViewSingleProject from './ViewSingleProject';
import ViewBdeBids from './ViewBdeBids';

function ViewDetails() {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState('view');

  const renderContent = () => {
    switch (activeTab) {
      case 'update':
        return <UpdateProject id={id} />;
      case 'bids':
        return <ViewBdeBids id={id} />;
      default:
        return <ViewSingleProject id={id} />;
    }
  };

  return (
    <>
      {/* Inline CSS for tab style */}
      <style>
        {`
          .custom-tabs {
            border-bottom: 2px solid #e0e0e0;
            background-color: #F3F8FF;
            border-radius: 8px;
            margin: 30px auto 0;
            max-width: 600px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            padding: 8px;
            display: flex;
            justify-content: center;
          }

          .custom-tabs button {
            border: none;
            background: transparent;
            padding: 10px 20px;
            margin: 0 8px;
            font-size: 16px;
            font-weight: 500;
            color: #035397;
            border-radius: 6px;
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .custom-tabs button:hover {
            background-color: #e0f3ff;
            color: #023e73;
          }

          .custom-tabs button.active {
            background-color: #CDE8E5;
            font-weight: 600;
            color: #000;
          }
        `}
      </style>

      <div className="custom-tabs">
        <button
          onClick={() => setActiveTab('view')}
          className={activeTab === 'view' ? 'active' : ''}
        >
          View
        </button>
        <button
          onClick={() => setActiveTab('update')}
          className={activeTab === 'update' ? 'active' : ''}
        >
          Update
        </button>
        <button
          onClick={() => setActiveTab('bids')}
          className={activeTab === 'bids' ? 'active' : ''}
        >
          View Bids
        </button>
      </div>

      <div className="container mt-4">
        {renderContent()}
      </div>
    </>
  );
}

export default ViewDetails;
