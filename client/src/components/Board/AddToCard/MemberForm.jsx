import React, { useState } from "react";
import { Card } from "antd";
import { Input } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import { findIndex } from "lodash";
import PropTypes from "prop-types";

MemberForm.propTypes = {
  card: PropTypes.shape({
    member: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  }),
  handleAddMember: PropTypes.func,
};

const MEMBER = [
  {
    alias: "PH",
    name: "phạm quốc huy",
  },
  {
    alias: "LN",
    name: "lê trọng nghĩa",
  },
];

function MemberForm(props) {
  const { card, handleAddMember } = props;
  console.log(props);
  const [member, setMember] = useState(MEMBER);

  const handleSearch = (e) => {
    let fil = MEMBER.filter((mem) => {
      return mem.name.search(`${e.target.value}`) >= 0;
    });
    setMember(fil);
  };

  return (
    <Card title={<h3>Thành viên</h3>} size="small" bordered={false}>
      <Input
        placeholder="input search text"
        onChange={handleSearch}
        style={{ width: 200 }}
      />
      <div style={{ marginTop: "3vh" }}>
        <h4>Thành viên của bảng</h4>
        {member.map((mem, index) => {
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
              {mem.name}
              {card.member.length > 0 &&
              findIndex(card.member, function (o) {
                return o.alias === mem.alias;
              }) !== -1 ? (
                <CheckOutlined
                  style={{ position: "absolute", top: "1.7vh", right: "0.5vw" }}
                />
              ) : null}
            </p>
          );
        })}
      </div>
    </Card>
  );
}

export default MemberForm;
