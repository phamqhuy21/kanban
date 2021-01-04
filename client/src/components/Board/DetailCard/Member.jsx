import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "antd";
import { findIndex } from "lodash";

Member.propTypes = {};

function Member(props) {
  const { members, inforMembers } = props;

  const renderMember = (member, inforMembers) => {
    let result = null;
    let index = findIndex(inforMembers, (inforMember) => {
      return inforMember._id === member;
    });
    if (index !== -1) {
      result = (
        <Avatar style={{ marginRight: "1vw" }}>
          {inforMembers[index].alias}
        </Avatar>
      );
    }
    return result;
  };

  return (
    <div>
      <h5 style={{ color: "#757575" }}>THÀNH VIÊN</h5>
      {members.map((member, index) => {
        return (
          <React.Fragment key={index}>
            {/* <div>{renderMember(member, inforMembers)}</div> */}
            <Avatar style={{ marginRight: "1vw" }}>{member.alias}</Avatar>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Member;
