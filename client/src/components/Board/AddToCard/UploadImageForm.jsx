import React from "react";
import { Upload, Card, Button } from "antd";
import PropTypes from "prop-types";

UploadImageForm.propTypes = {
  card: PropTypes.shape({
    groundImage: PropTypes.string,
  }),
  handlePreviewImg: PropTypes.func,
  handleDeleteGround: PropTypes.func,
};

function UploadImageForm(props) {
  const { card, handlePreviewImg, handleDeleteGround } = props;
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
  };

  const uploadButton = (
    <div>
      <Button style={{ marginTop: 8, width: "20vw" }}>Tải lên ảnh bìa</Button>
    </div>
  );
  return (
    <div style={{ overflow: "auto" }}>
      <Card
        size="small"
        title={<div style={{ textAlign: "center" }}>Ảnh bìa</div>}
        bordered={false}
        bodyStyle={{ padding: "0", width: "20vw", height: "30vh" }}
        headStyle={{ padding: "0" }}
      >
        <div id="scroll-upload" style={{ marginBottom: "2vh" }}>
          <Upload
            style={{ width: "10vw" }}
            name="avatar"
            listType="picture"
            className="avatar-uploader"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={handleChange}
            onPreview={(infor) => {
              handlePreviewImg(infor, card);
            }}
          >
            {uploadButton}
          </Upload>
        </div>
        <Button
          type="primary"
          danger
          onClick={() => {
            handleDeleteGround(card);
          }}
          style={{ width: "20vw" }}
          disabled={card.groundImage === "" ? true : false}
        >
          Xóa ảnh bìa
        </Button>
      </Card>
    </div>
  );
}

export default UploadImageForm;
