import React, { useState } from "react";
import PropTypes from "prop-types";
import FileAttachments from "../../components/Board/DetailCard/FileAttachments";
import { Button, Card, Col, Image, message, Row } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { cloneDeep, findIndex } from "lodash";
import { useRouteMatch } from "react-router-dom";
import { updateCardTask } from "../../api/cardTask";
import { getBoardDetailReq } from "../../redux/actions/boards";
import { getDataCardReq } from "../../redux/actions/cardTask";
import { createAction } from "../../api/action";

FileAttachmentsContainer.propTypes = {};

const style = {
  cardStyle: { backgroundColor: "#f5f5f5" },
  headCardStyle: { padding: "0 1vw", border: "none" },
  buttonSaveStyle: {
    backgroundColor: "#5aac44",
    color: "#fff",
  },
  iconCloseStyle: {
    position: "absolute",
    top: "1vh",
    padding: "0 0.7rem",
    fontSize: "1.2rem",
    border: "none",
    cursor: "pointer",
  },
};

function FileAttachmentsContainer(props) {
  const [show, setShow] = useState(false);
  const cardTaskReducer = useSelector((state) => state.cardTaskReducer);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const handleDeleteFile = (file) => {
    let card = cloneDeep(cardTaskReducer);
    let indexFileDel = findIndex(
      card.files,
      (fileFilter) => fileFilter._id === file._id
    );
    card.files.splice(indexFileDel, 1);
    let boardId = match.params.id;
    let cardId = card._id;
    let dataReq = {
      boardId,
      cardId,
      data: {
        files: card.files,
      },
    };
    updateCardTask(dataReq)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getBoardDetailReq(boardId));
          dispatch(getDataCardReq(boardId, cardId));
          message.success(`Xóa file ${file.fileName} thành công`);
          createAction({
            boardId,
            cardId,
            data: {
              action: `xóa file ${file.fileName}`,
            },
          }).then((res) => {
            if (res.status === 200) {
              dispatch(getBoardDetailReq(boardId));
            }
          });
        } else {
          message.error(`Xóa file ${file.fileName} thất bại`);
        }
      })
      .catch((err) => {
        message.error(`Xóa file ${file.fileName} thất bại`);
      });
  };

  return (
    <Card
      title={
        <Row>
          <Col span={1}>
            <PaperClipOutlined style={{ color: "#757575" }} />
          </Col>
          <Col span={15}>
            <span style={{ color: "#757575" }}>Các tập tin đính kèm</span>
          </Col>
          <Col span={8} style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              style={{
                backgroundColor: "rgba(0,0,0,0.1)",
                border: "none",
                marginLeft: "5px",
              }}
              onClick={() => {
                setShow(!show);
              }}
            >
              {!show ? "Hiện chi tiết" : "Ẩn"}
            </Button>
          </Col>
        </Row>
      }
      style={style.cardStyle}
      headStyle={style.headCardStyle}
      bodyStyle={{ padding: "0 10px" }}
      bordered={false}
    >
      {show ? (
        <Row>
          <Col offset={1} span={23}>
            {cardTaskReducer.files.length > 0
              ? cardTaskReducer.files.map((file, index) => {
                  return (
                    <FileAttachments
                      file={file}
                      key={index}
                      handleDeleteFile={handleDeleteFile}
                    />
                  );
                })
              : null}
          </Col>
        </Row>
      ) : null}
    </Card>
  );
}

export default FileAttachmentsContainer;
