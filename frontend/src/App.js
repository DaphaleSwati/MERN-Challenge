import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ChartPage from './components/ChartPage'; // Make sure this path is correct

const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/chart/bar">Bar Chart</Link>
                <Link to="/chart/pie">Pie Chart</Link>
            </nav>
            <Routes>
                <Route path="/chart/:type" element={<ChartPage />} />
                <Route path="/" element={<h1>Welcome to the Chart App</h1>} />
            </Routes>
        </Router>
    );
};

export default App;
