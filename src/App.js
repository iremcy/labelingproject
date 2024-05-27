import "./App.css";
import LabelingComp from "./components/LabelingComp";
import UploadComp from "./components/UploadComp";
import DownloadComp from "./components/DownloadComp";
import { useState, useRef } from "react";
import { Row, Col } from "antd";

function App() {
  const [image, setImage] = useState();
  const canvasRef = useRef(null);
  return (
    <div className="App">
      <h2>Image Labeling</h2>
      <Row justify={"center"}>
        <Col lg={12} sm={24}>
          <UploadComp setImage={setImage}></UploadComp>
        </Col>
        {image && <Col lg={12} sm={24}>
          <DownloadComp ref={canvasRef}></DownloadComp>
        </Col>}
      </Row>
      <LabelingComp image={image} ref={canvasRef}></LabelingComp>
    </div>
  );
}

export default App;
