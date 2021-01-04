import React from "react";
import PropTypes from "prop-types";
import FileAttachments from "../../components/Board/DetailCard/FileAttachments";
import { Card, Col, Image, Row } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";

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
  const { card } = props;
  return (
    <Card
      title={
        <Row>
          <Col span={1}>
            <PaperClipOutlined style={{ color: "#757575" }} />
          </Col>
          <Col span={23}>
            <span style={{ color: "#757575" }}>Các tập tin đính kèm</span>
          </Col>
        </Row>
      }
      style={style.cardStyle}
      headStyle={style.headCardStyle}
      bodyStyle={{ padding: "0 10px" }}
      bordered={false}
    >
      <Row>
        <Col offset={1} span={23}>
          {card.files.length > 0
            ? card.files.map((file, index) => {
                return <FileAttachments file={file} key={index} />;
              })
            : null}
        </Col>
      </Row>
    </Card>
  );
}

export default FileAttachmentsContainer;
