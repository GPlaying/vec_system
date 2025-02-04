import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import ModelOnePage from './ModelOnePage';
import ModelTwoPage from './ModelTwoPage';
import './App.css'; // 引入CSS文件
import 'leaflet/dist/leaflet.css';
import 'reactflow/dist/style.css';



export default function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">首页</Link>
            </li>
            <li>
              <Link to="/model1">模型一预测</Link>
            </li>
            <li>
              <Link to="/model2">模型二预测</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/model1" element={<ModelOnePage />} />
          <Route path="/model2" element={<ModelTwoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// export default App;
