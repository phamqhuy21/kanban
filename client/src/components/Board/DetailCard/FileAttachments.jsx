import React from "react";
import PropTypes from "prop-types";
import { Col, Image, Row } from "antd";
import moment from "moment";

FileAttachments.propTypes = {};

function FileAttachments(props) {
  const { file, handleDeleteFile } = props;
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
      <Col span={17}>
        <div>
          <a
            href={`${file.url}`}
            rel="noreferrer"
            target="_blank"
            style={{ fontWeight: "500" }}
          >
            {file.fileName}
          </a>
        </div>
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
      <Col span={2}>
        <i
          className="fas fa-trash-alt"
          style={{
            marginLeft: "5px",
            padding: "5px 10px",
            cursor: "pointer",
            color: "#ef5350",
          }}
          onClick={() => {
            handleDeleteFile(file);
          }}
        ></i>
      </Col>
    </Row>
  );
}

export default FileAttachments;
