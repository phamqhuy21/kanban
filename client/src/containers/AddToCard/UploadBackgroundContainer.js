import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Dropdown, message } from "antd";
import UploadImageForm from "../../components/Board/AddToCard/UploadImageForm";
import { PictureOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroundRequest } from "../../redux/actions/board";
import { uploadImage } from "../../api/file";
import { getBoardDetailReq } from "../../redux/actions/boards";
import { getDataCardReq } from "../../redux/actions/cardTask";
import { createAction } from "../../api/action";

UploadBackgroundContainer.propTypes = {};

const style = {
  styleButton: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "90%",
    marginBottom: "1vh",
  },
};

function UploadBackgroundContainer(props) {
  const [visible, setVisisble] = useState(false);
  const cardTaskReducer = useSelector((state) => state.cardTaskReducer);
  const dispatch = useDispatch();

  const handleChange = (cardId, boardId, originFileObj) => {
    uploadImage(cardId, boardId, originFileObj)
      .then((res) => {
        if (res.status === 200) {
          message.success("Cập nhật ảnh bìa thành công");
          dispatch(getBoardDetailReq(boardId));
          dispatch(getDataCardReq(boardId, cardId));
          createAction({
            boardId,
            cardId,
            data: {
              action: `tải lên ảnh bìa`,
            },
          }).then((res) => {
            if (res.status === 200) {
              dispatch(getBoardDetailReq(boardId));
            }
          });
        } else message.error("Cập nhật ảnh bìa thất bại");
      })
      .catch((err) => {
        message.error("Cập nhật ảnh bìa thất bại");
      });
  };

  return (
    <Dropdown
      overlay={
        <UploadImageForm card={cardTaskReducer} handleChange={handleChange} />
      }
      trigger="click"
      visible={visible}
      onVisibleChange={(flag) => {
        setVisisble(flag);
      }}
    >
      <Button style={style.styleButton}>
        <PictureOutlined />
        Ảnh bìa
      </Button>
    </Dropdown>
  );
}

export default UploadBackgroundContainer;
