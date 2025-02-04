import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import './ModelPage.css'; // 引入 CSS 文件
import Graph from 'react-graph-vis'; // 使用默认导出
import 'vis-network/styles/vis-network.min.css'; // 引入 vis-network 样式

function ModelOnePage() {
  const [speed, setSpeed] = useState('');
  const [roadCondition, setRoadCondition] = useState('');
  const [distance, setDistance] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [roadId, setRoadId] = useState('');
  const [roadType, setRoadType] = useState('');
  const [result, setResult] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

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

  // 图形数据
  const data = {
    nodes: [
      { id: 'Driver_1', label: 'Driver 1', size: 40, color: '#A31D1D' },  // 驾驶员节点
      // { id: 'Driver_2', label: 'Driver 2', size: 40, color: '#A31D1D' },  // 驾驶员节点
      { id: 'Vehicle_1', label: 'Vehicle 1', size: 40, color: '#6D2323' },  // 车辆节点
      // { id: 'Vehicle_2', label: 'Vehicle 2', size: 40, color: '#6D2323' },  // 车辆节点
      { id: 'Road_1', label: 'Road 1', size: 40, color: '#E5D0AC' },  // 道路节点
      // { id: 'Road_2', label: 'Road 2', size: 40, color: '#E5D0AC' },  // 道路节点
      { id: 'Road_3', label: 'Road 3', size: 40, color: '#E5D0AC' },  // 道路节点
      { id: 'Road_4', label: 'Road 4', size: 40, color: '#E5D0AC' },  // 道路节点
    ],
    edges: [
      { from: 'Driver_1', to: 'Vehicle_1', label: 'drives' },
      // { from: 'Driver_2', to: 'Vehicle_2', label: 'drives' },
      { from: 'Vehicle_1', to: 'Road_1', label: 'drives on' },
      // { from: 'Vehicle_2', to: 'Road_2', label: 'drives on' },
      { from: 'Vehicle_1', to: 'Road_3', label: 'drives on' },
      // { from: 'Vehicle_1', to: 'Road_2', label: 'drives on' },
      { from: 'Vehicle_1', to: 'Road_4', label: 'drives on' },
    ],
  };

  const options = {
    layout: {
      randomSeed: 2,
      hierarchical: {
        enabled: true,
        levelSeparation: 150,
        nodeSpacing: 200,
        treeSpacing: 200,
        blockShifting: true,
        edgeMinimization: true,
        direction: 'LR', // 从左到右布局
        sortMethod: 'directed', // 让节点有固定的排列顺序
      },
    },
    nodes: {
      shape: 'dot',
      size: 20,
    },
    edges: {
      arrows: {
        to: { enabled: true, type: 'arrow' },
      },
    },
    physics: {
      enabled: true,
      stabilization: { iterations: 200 },
    },
  };

  const handleGraphClick = (event) => {
    const { nodes } = event;
    if (nodes.length > 0) {
      const nodeId = nodes[0];
      setSelectedNode(data.nodes.find(node => node.id === nodeId));
      alert(`Clicked node: ${nodeId}`);
    }
  };

  return (
    <div className="model-page">
      <h2>基于车-路-人交互关系的车辆能耗预测算法</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Driver ID:</label>
          <input
            type="text"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Vehicle ID:</label>
          <input
            type="text"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            required
          />
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
          <label>Road Sequence ID:</label>
          <input
            type="text"
            value={roadId}
            onChange={(e) => setRoadId(e.target.value)}
            required
          />
        </div>
        {/* <div className="form-group">
          <label>Road Type:</label>
          <input
            type="text"
            value={roadType}
            onChange={(e) => setRoadType(e.target.value)}
            required
          />
        </div> */}
        <button type="submit" className="submit-button">Predict</button>
      </form>

      {result !== null && (
        <div className="result-container">
          {/* First row: Predicted Energy Consumption */}
          <div className="result-info">
            <h3>Predicted Energy Consumption: {result}</h3>
          </div>

          {/* Second row: Map and Interaction Network */}
          <div className="map-graph-container">
            {/* Left: Map */}
            <div className="left-side">
              <div className="map-container">
                <MapContainer center={[31.2304, 121.4737]} zoom={13} style={{ height: '100%', width: '100%' }}> {/* 上海的经纬度 */}
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[31.2304, 121.4737]}>
                    <Popup>Model 1 Prediction Location</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* Right: Interaction Network */}
            <div className="right-side">
              <div style={{ height: '100%', width: '100%', border: '2px solid black' }}>
                <Graph
                  graph={data}
                  options={options}
                  events={{ click: handleGraphClick }}
                />
              </div>

              {selectedNode && (
                <div>
                  <h3>Selected Node:</h3>
                  <p>Node ID: {selectedNode.id}</p>
                  <p>Node Label: {selectedNode.label}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModelOnePage;
