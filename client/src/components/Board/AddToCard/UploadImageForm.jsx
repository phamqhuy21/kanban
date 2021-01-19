import React from "react";
import { Upload, Card, Button, message } from "antd";
import PropTypes from "prop-types";
import { uploadImage } from "../../../api/file";
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBoardDetailReq } from "../../../redux/actions/boards";
import { getDataCardReq } from "../../../redux/actions/cardTask";
import { PlusOutlined } from "@ant-design/icons";

UploadImageForm.propTypes = {
  card: PropTypes.shape({
    groundImage: PropTypes.string,
  }),
  handlePreviewImg: PropTypes.func,
  handleDeleteGround: PropTypes.func,
};

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  return isJpgOrPng;
}

function UploadImageForm(props) {
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

  const dummyRequest = ({ file, onSuccess }) => {
    onSuccess("ok");
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Card
      size="small"
      title={<div style={{ textAlign: "center" }}>Ảnh bìa</div>}
      bordered={false}
      style={{ boxShadow: "0 0 2px 2px rgba(0,0,0,0.2)" }}
      bodyStyle={{ textAlign: "center" }}
      headStyle={{ padding: "0" }}
    >
      <div id="scroll-upload" style={{ marginBottom: "2vh" }}>
        <Upload
          customRequest={dummyRequest}
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          onChange={onChange}
          beforeUpload={beforeUpload}
          showUploadList={false}
        >
          {uploadButton}
        </Upload>
      </div>
    </Card>
  );
}

export default UploadImageForm;
