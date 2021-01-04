import React from "react";
import PropTypes from "prop-types";
import { Col, Image, Row } from "antd";

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
      </Col>
    </Row>
  );
}

export default FileAttachments;
