import React from "react";
import { Upload, Card, Button, message } from "antd";
import PropTypes from "prop-types";
import { uploadImage } from "../../../api/file";
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBoardDetailReq } from "../../../redux/actions/boards";
import { getDataCardReq } from "../../../redux/actions/cardTask";

UploadImageForm.propTypes = {
  card: PropTypes.shape({
    groundImage: PropTypes.string,
  }),
  handlePreviewImg: PropTypes.func,
  handleDeleteGround: PropTypes.func,
};

function UploadImageForm(props) {
  const { card, handlePreviewImg, handleDeleteGround } = props;
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const handleChange = (info) => {
    let boardId = match.params.id;
    let cardId = card._id;
    if (info.file.status === "uploading") {
      return;
    } else {
      uploadImage(cardId, boardId, info.file.originFileObj)
        .then((res) => {
          if (res.status === 200) {
            message.success("Cập nhật ảnh bìa thành công");
            dispatch(getBoardDetailReq(boardId));
            dispatch(getDataCardReq(boardId, cardId));
          } else message.error("Cập nhật ảnh bìa thất bại");
        })
        .catch((err) => {
          message.error("Cập nhật ảnh bìa thất bại");
        });
      if (info.file.status === "uploading") {
        return;
      }
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    onSuccess("ok");
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
            customRequest={dummyRequest}
            name="avatar"
            listType="picture"
            className="avatar-uploader"
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
