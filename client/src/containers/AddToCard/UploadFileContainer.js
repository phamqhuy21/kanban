import React, { useState } from "react";
import PropTypes from "prop-types";
import UploadFileForm from "../../components/Board/AddToCard/UploadFileForm";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../api/file";
import { Button, Dropdown, message } from "antd";
import { getBoardDetailReq } from "../../redux/actions/boards";
import { getDataCardReq } from "../../redux/actions/cardTask";
import { createAction } from "../../api/action";
import { PaperClipOutlined } from "@ant-design/icons";

UploadFileContainer.propTypes = {};

const style = {
  styleButton: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "90%",
    marginBottom: "1vh",
  },
};

function UploadFileContainer(props) {
  const [visible, setVisisble] = useState(false);
  const cardTaskReducer = useSelector((state) => state.cardTaskReducer);
  const dispatch = useDispatch();

  const handleChange = (cardId, boardId, originFileObj) => {
    setVisisble(false);
    uploadFile(cardId, boardId, originFileObj)
      .then((res) => {
        if (res.status === 200) {
          message.success(
            `Tải lên tập tin ${res.data.data.fileName} thành công`
          );
          dispatch(getBoardDetailReq(boardId));
          dispatch(getDataCardReq(boardId, cardId));
          createAction({
            boardId,
            cardId,
            data: {
              action: `tải lên tập tin ${res.data.data.fileName}`,
            },
          }).then((res) => {
            if (res.status === 200) {
              dispatch(getBoardDetailReq(boardId));
            }
          });
        } else {
          message.error(`Tải lên tập tin thất bại`);
        }
      })
      .catch((err) => {
        message.error("Tải lên tập tin thất bại");
      });
  };

  return (
    <Dropdown
      overlay={
        <UploadFileForm card={cardTaskReducer} handleChange={handleChange} />
      }
      trigger="click"
      visible={visible}
      onVisibleChange={(flag) => {
        setVisisble(flag);
      }}
    >
      <Button style={style.styleButton}>
        <PaperClipOutlined />
        Đính kèm
      </Button>
    </Dropdown>
  );
}

export default UploadFileContainer;
