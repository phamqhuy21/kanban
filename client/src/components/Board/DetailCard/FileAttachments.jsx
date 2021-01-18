import React from "react";
import PropTypes from "prop-types";
import { Col, Image, Row } from "antd";
import moment from "moment";

FileAttachments.propTypes = {};

function FileAttachments(props) {
  const { file } = props;
  return (
    <Row>
      <Col span={5}>
        <Image
          src={file.url}
          style={{ margin: "5px 0" }}
          width={120}
          height={80}
        />
      </Col>
      <Col span={19}>
        <b>{file.fileName}</b>
        <p style={{ color: "#9e9e9e", fontSize: "0.9em" }}>
          {moment()
            .subtract(
              (new Date().valueOf() - new Date(file.createdAt).valueOf()) /
                60000,
              "minutes"
            )
            .fromNow()}
        </p>
      </Col>
    </Row>
  );
}

export default FileAttachments;
