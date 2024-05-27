import React from "react";
import JSZip from "jszip";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";

const uploadProps = {
  beforeUpload: (file) => {
    const isZIP = file.type === "application/x-zip-compressed";
    if (!isZIP) {
      message.error(`${file.name} is not a zip file`);
    }
    return isZIP || Upload.LIST_IGNORE;
  }
};

function UploadComp(props) {

  const fileUpload = (selectedFile) => {
    const zip = new JSZip();
    zip.loadAsync(selectedFile.originFileObj).then((value) => {
      zip
        .file(Object.values(value.files)[0].name)
        .async("uint8array")
        .then(function (data) {
          props.setImage(
            URL.createObjectURL(
              new Blob([data], {
                type: "image/png",
              })
            )
          );
        });
    });
  };

  const onFileUpload = (e) => {
    fileUpload(e.file);
  };

  return (
    <div style={{margin: "15px"}}>
      <Upload {...uploadProps} onChange={onFileUpload}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  );
}

export default UploadComp;
