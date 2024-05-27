import React, { forwardRef } from "react";
import JSZip from "jszip";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const DownloadComp = forwardRef((props, canvasRef) => {
  const downloadAnnotatedImg = () => {
    var canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      const imgData = new File([blob], "annoatedimg.png");
      var zip = new JSZip();
      var img = zip.folder("images");
      img.file("annoatedimg.png", imgData, { base64: true });
      zip.generateAsync({ type: "base64" }).then(function (base64) {
        window.location.href = "data:application/zip;base64," + base64;
      });
    });
  };

  return (
    <>
      <Button
        type="primary"
        shape="round"
        icon={<DownloadOutlined />}
        size={"large"}
        onClick={downloadAnnotatedImg}
      >
        Download
      </Button>
    </>
  );
});

export default DownloadComp;
