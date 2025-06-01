

import React from 'react';
import AutocompleteInput from './components/AutocompleteInput';
import ErrorBoundary from './components/common/ErrorBoundary';
import './App.css';


const App: React.FC = () => (
  <ErrorBoundary>
    <div className="app-container">
      <img src="https://www.clinikally.com/cdn/shop/files/Clinikally_LOGO_for_Website_240x.png?v=1672654638" alt="Clinikally Logo" className="app-logo" />
     
      <p className="app-description">
        Search your favourite products *
      </p>
        
      <AutocompleteInput />
      <p className="app-subtitle">
        *Type at least 2 characters to start searching
      </p>
    </div>
  </ErrorBoundary>
);

export default App;
