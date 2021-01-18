import React, { useState } from "react";
import { Card, Col, Row } from "antd";
import { Input } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import { findIndex } from "lodash";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

MemberForm.propTypes = {
  handleAddMember: PropTypes.func,
};

function MemberForm(props) {
  const { handleAddMember, card } = props;
  const detailBoardReducer = useSelector((state) => state.detailBoardReducer);
  const [members, setMembers] = useState(detailBoardReducer.members);

  const handleSearch = (e) => {
    let fil = detailBoardReducer.members.filter((mem) => {
      return (
        mem.email.search(`${e.target.value}`) >= 0 ||
        mem.fullname.search(`${e.target.value}`) >= 0
      );
    });
    setMembers(fil);
  };

  return (
    <Card
      title={<h3>Thành viên</h3>}
      size="small"
      style={{ boxShadow: "0 0 2px 2px rgba(0,0,0,0.2)" }}
      bordered={false}
    >
      <Input
        placeholder="Nhập tên thành viên ..."
        onChange={handleSearch}
        style={{ width: "100%" }}
      />
      <div style={{ marginTop: "3vh" }}>
        <h4>Thành viên của bảng</h4>
        {members.map((mem, index) => {
          return (
            <Row
              key={index}
              style={{
                backgroundColor: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                padding: "1vh 0.5vw 1vh 1vw",
                marginBottom: "7px",
                cursor: "pointer",
                width: "100%",
              }}
              onClick={() => {
                handleAddMember(mem, card);
              }}
            >
              <Col span={4}>
                <Avatar style={{ marginRight: "1vw" }}>{mem.alias}</Avatar>
              </Col>
              <Col span={15} offset={1}>
                <div>
                  <p style={{ fontWeight: "500", marginBottom: "0" }}>
                    {mem.fullname}
                  </p>
                  <p
                    style={{
                      marginBottom: "0",
                      fontSize: "0.8rem",
                      opacity: "0.5",
                    }}
                  >
                    {mem.email}
                  </p>
                </div>
              </Col>
              <Col span={2} offset={2}>
                {card.members.length > 0 &&
                findIndex(card.members, function (memberCard) {
                  return memberCard._id === mem._id;
                }) !== -1 ? (
                  <p style={{ width: "15px" }}>
                    <CheckOutlined />
                  </p>
                ) : (
                  <p style={{ width: "15px" }}></p>
                )}
              </Col>
            </Row>
          );
        })}
      </div>
    </Card>
  );
}

export default MemberForm;
