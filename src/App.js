import React from 'react';
import './App.css';
import NamePasswordForm from './NamePasswordForm'; // Import your NamePasswordForm component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My React App</h1>
      </header>
      <main>
        {/* Add your NamePasswordForm component */}
        <NamePasswordForm />
      </main>
    </div>
  );
}

export default App;
