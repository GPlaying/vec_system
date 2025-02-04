import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './ModelPage.css'; // 引入 CSS 文件

export default function ModelTwoPage() {
  const [speed, setSpeed] = useState('');
  const [roadCondition, setRoadCondition] = useState('');
  const [distance, setDistance] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [roadId, setRoadId] = useState('');
  const [roadType, setRoadType] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/predict/', {
        speed: parseInt(speed),
        road_condition: parseInt(roadCondition),
        distance: parseInt(distance),
        vehicle_id: vehicleId,
        vehicle_type: vehicleType,
        road_id: roadId,
        road_type: roadType,
      });
      setResult(response.data.predicted_energy_consumption);
    } catch (error) {
      console.error(error);
      setResult('Error: Unable to get prediction.');
    }
  };

  return (
    <div className="model-page">
      <h2>基于历史轨迹特征挖掘的车辆能耗预测算法</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Vehicle ID:</label>
          <input
            type="text"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            required
          >
            {/* <option value="">Select Vehicle ID</option>
            <option value="1">Vehicle 1</option>
            <option value="2">Vehicle 2</option>
            <option value="3">Vehicle 3</option> */}
          </input>
        </div>
        <div className="form-group">
          <label>Vehicle Type:</label>
          <input
            type="text"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Road Sequence IDs:</label>
          <input
            type="text"
            value={roadId}
            onChange={(e) => setRoadId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Road Sequence Types:</label>
          <input
            type="text"
            value={roadType}
            onChange={(e) => setRoadType(e.target.value)}
            required
          />
        </div>
        {/* <div className="form-group">
          <label>Speed (km/h):</label>
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Road Condition (0 = City, 1 = Highway):</label>
          <input
            type="number"
            value={roadCondition}
            onChange={(e) => setRoadCondition(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Distance (km):</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            required
          />
        </div> */}
        <button type="submit" className="submit-button">Predict</button>
      </form>

      {result !== null && (
        <div className="result-container">
          <h3>Predicted Energy Consumption: {result}</h3>

          {/* Display Vehicle and Road Information */}
          <div className="info-container" style={{ height: '100%', width: '100%', border: '2px solid black' }}>
            <h4>Vehicle and Road Information:</h4>
            <ul>
              <li><strong>Vehicle ID:</strong> {vehicleId}</li>
              <li><strong>Vehicle Type:</strong> {vehicleType}</li>
              <li><strong>Road Sequence IDs:</strong> {roadId}</li>
              <li><strong>Road Sequence Types:</strong> {roadType}</li>
            </ul>
          </div>

          {/* Map */}
          <div className="map-container">
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[51.505, -0.09]}>
                <Popup>Model 1 Prediction Location</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
}

// export default ModelOnePage;
