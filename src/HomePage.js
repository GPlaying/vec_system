import React from 'react';
import { useNavigate } from 'react-router-dom'; // 用于页面跳转
import './HomePage.css'; // 引入更新后的 CSS 文件

export default function HomePage() {
  const navigate = useNavigate();  // React Router Hook 用于页面跳转

  const handleModelOneClick = () => {
    navigate('/model1');  // 点击按钮跳转到模型一预测页面
  };

  const handleModelTwoClick = () => {
    navigate('/model2');  // 点击按钮跳转到模型二预测页面
  };

  return (
    <div className="home-page">
      <div className="home-content">
        <h1>车辆能耗预测系统</h1>
        <p>
          车辆能耗预测，主要基于车辆信息、道路网络、驾驶行为偏好等多种因素，利用先进的机器学习技术进行精准预测。
          通过分析车辆的速度、负载、路况以及气候条件等数据，结合驾驶员的驾驶习惯，我们能够为不同类型的车辆提供定制化的能耗预测。
          这项技术可以帮助车主优化驾驶方式，减少能源浪费，同时为汽车制造商提供数据支持，推动绿色出行的未来发展。
        </p>
        <p>请选择下面其中一个模型进行能耗预测：</p>
        
        {/* 两个开始预测按钮 */}
        <div className="button-container">
          <button className="start-button" onClick={handleModelOneClick}>
            模型一预测
          </button>
          <button className="start-button" onClick={handleModelTwoClick}>
            模型二预测
          </button>
        </div>
      </div>
    </div>
  );
}

// export default HomePage;
