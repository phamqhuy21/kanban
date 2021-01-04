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
  const { card, handlePreviewFile } = props;
  const match = useRouteMatch();

  const handleChange = (info) => {
    let boardId = match.params.id;
    let cardId = card._id;
    if (info.file.status === "uploading") {
      return;
    } else {
      uploadFile(cardId, boardId, info.file.originFileObj)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Card
      size="small"
      title={<div>Đính kèm</div>}
      bordered={false}
      //   bodyStyle={{ padding: "0" }}
      //   headStyle={{ padding: "0" }}
    >
      <Upload
        {...PROP}
        customRequest={dummyRequest}
        onChange={handleChange}
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
