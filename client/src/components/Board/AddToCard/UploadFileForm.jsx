import React from "react";
import { Card } from "antd";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { uploadFile } from "../../../api/file";
import { useRouteMatch } from "react-router-dom";

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
};

const dummyRequest = ({ file, onSuccess }) => {
  onSuccess("ok");
};

function UploadFileForm(props) {
  const { card, handleChange } = props;
  const match = useRouteMatch();

  const onChange = (info) => {
    let boardId = match.params.id;
    let cardId = card._id;
    if (info.file.status === "uploading") {
      return;
    } else {
      handleChange(cardId, boardId, info.file.originFileObj);
    }
  };

  return (
    <Card
      size="small"
      title={<div style={{ textAlign: "center" }}>Đính kèm</div>}
      bordered={false}
      style={{ boxShadow: "0 0 2px 2px rgba(0,0,0,0.2)" }}
      //   headStyle={{ padding: "0" }}
    >
      <Upload
        customRequest={dummyRequest}
        onChange={onChange}
        showUploadList={false}
      >
        <Button
          icon={
            <i className="fas fa-upload" style={{ marginRight: "5px" }}></i>
          }
        >
          Tải lên file đính kèm
        </Button>
      </Upload>
    </Card>
  );
}

export default UploadFileForm;
