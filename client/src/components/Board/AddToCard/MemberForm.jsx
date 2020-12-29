import React, { useState } from "react";
import { Card } from "antd";
import { Input } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import { findIndex } from "lodash";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

MemberForm.propTypes = {
  card: PropTypes.shape({
    member: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  }),
  handleAddMember: PropTypes.func,
};

function MemberForm(props) {
  const { card, handleAddMember } = props;
  const detailBoardReducer = useSelector((state) => state.detailBoardReducer);
  const [members, setMembers] = useState(detailBoardReducer.members);

  const handleSearch = (e) => {
    let fil = detailBoardReducer.members.filter((mem) => {
      return mem.fullname.search(`${e.target.value}`) >= 0;
    });
    setMembers(fil);
  };

  return (
    <Card title={<h3>Thành viên</h3>} size="small" bordered={false}>
      <Input
        placeholder="Nhập tên thành viên ..."
        onChange={handleSearch}
        style={{ width: 200 }}
      />
      <div style={{ marginTop: "3vh" }}>
        <h4>Thành viên của bảng</h4>
        {members.map((mem, index) => {
          return (
            <p
              key={index}
              style={{
                position: "relative",
                backgroundColor: "#f5f5f5",
                padding: "1vh 1vw",
                cursor: "pointer",
              }}
              onClick={() => {
                handleAddMember(mem, card);
              }}
            >
              <Avatar style={{ marginRight: "1vw" }}>{mem.alias}</Avatar>
              {mem.email}
              {/* {card.member.length > 0 &&
              findIndex(card.member, function (o) {
                return o.alias === mem.alias;
              }) !== -1 ? (
                <CheckOutlined
                  style={{ position: "absolute", top: "1.7vh", right: "0.5vw" }}
                />
              ) : null} */}
            </p>
          );
        })}
      </div>
    </Card>
  );
}

export default MemberForm;
