import React from "react";
import PropTypes from "prop-types";
import { Avatar, Col, Row } from "antd";

MemberHeader.propTypes = {};

function MemberHeader(props) {
  const { member } = props;

  return (
    <div style={{ minWidth: "150px", display: "flex", alignItems: "center" }}>
      <div style={{ marginRight: "10px" }}>
        <Avatar
          icon={<p>{member.alias}</p>}
          style={{
            color: "#424242",
            fontWeight: "500",
            cursor: "context-menu",
          }}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: 0, fontSize: "1.1em" }}>
          {member.fullname}
        </h4>
        <p style={{ marginBottom: 0, opacity: "0.7", fontSize: "0.9em" }}>
          {member.email}
        </p>
      </div>
    </div>
  );
}

export default MemberHeader;
