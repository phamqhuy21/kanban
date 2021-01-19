import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";

Activity.propTypes = {};

function Activity(props) {
  const { action } = props;

  return (
    <Row style={{ margin: "0 0 10px 0" }}>
      <Col span={2} style={{ textAlign: "center" }}>
        <Avatar style={{ marginRight: "10px", marginTop: "5px" }}>
          {action?.createdById?.alias}
        </Avatar>
      </Col>
      <Col span={21}>
        <p style={{ marginBottom: "0" }}>
          <b>{action?.createdById?.fullname}</b> đã {action?.action}{" "}
          {action?.card ? <span>ở thẻ này</span> : ""}
        </p>
        <p style={{ color: "#9e9e9e", fontSize: "0.9em" }}>
          {moment()
            .subtract(
              (new Date().valueOf() - new Date(action?.createdAt).valueOf()) /
                60000,
              "minutes"
            )
            .fromNow()}
        </p>
      </Col>
    </Row>
  );
}

export default Activity;
