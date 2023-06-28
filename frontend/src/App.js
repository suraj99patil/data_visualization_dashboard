import React from 'react';
import Dashboard from './components/Dashboard';
import { Provider } from 'react-redux';
import store from './redux/store';
// import BarChart from './components/BarChart'; // Import the BarChart component

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Data Visualization Dashboard</h1>
        <Dashboard/>
        
      </div>
    </Provider>
  );
};

export default App;
