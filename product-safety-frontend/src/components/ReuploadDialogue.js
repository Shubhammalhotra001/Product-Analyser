import React from 'react';
import './ReuploadDialogue.css';

function ReuploadDialogue({ onReupload, onClose }) {
  return (
    <div className="reupload-overlay">
      <div className="reupload-content">
        <div className="reupload-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/>
            <path d="M12 8V12M12 16H12.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        
        <h2 className="reupload-title">Image Quality Issue Detected</h2>
        
        
        <p className="reupload-suggestion">
          Please try uploading a clearer image with better lighting and focus on the ingredient list.
        </p>
        
        <div className="reupload-actions">
          <button className="reupload-btn primary" onClick={onReupload}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Reupload Image
          </button>
          
          <button className="reupload-btn secondary" onClick={onClose}>
            View Results Anyway
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReuploadDialogue;