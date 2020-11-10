import React from "react";
import { Card } from "antd";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

UploadFileForm.propTypes = {
  card: PropTypes.object,
  handlePreviewFile: PropTypes.func,
};

const PROP = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function UploadFileForm(props) {
  const { card, handlePreviewFile } = props;

  return (
    <Card
      title={<div>Đính kèm</div>}
      bordered={false}
      bodyStyle={{ padding: "0" }}
      headStyle={{ padding: "0" }}
    >
      <Upload
        {...PROP}
        onPreview={(infor) => {
          handlePreviewFile(infor, card);
        }}
      >
        <Button icon={<UploadOutlined />}>Tải lên file đính kèm</Button>
      </Upload>
    </Card>
  );
}

export default UploadFileForm;
