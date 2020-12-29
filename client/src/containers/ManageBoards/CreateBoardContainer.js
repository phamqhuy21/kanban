import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useSelector } from "react-redux";
import { CheckOutlined } from "@ant-design/icons";

CreateBoardContainer.propTypes = {};

const COLOR = [
  "#f44336",
  "#03a9f4",
  "#4caf50",
  "#e91e63",
  "#673ab7",
  "#cddc39",
  "#ffc107",
  "#ff5722",
  "#a1887f",
  "#9c27b0",
  "#757575",
  "#78909c",
];

function CreateBoardContainer(props) {
  const { openFormCreate, handleCloseFormCreate, handleCreateBoard } = props;
  const [stateColor, setStateColor] = useState(COLOR[0]);
  const [stateTitle, setStateTitle] = useState("");
  const usersReducer = useSelector((state) => state.usersReducer);
  return (
    <Modal
      visible={openFormCreate}
      onCancel={handleCloseFormCreate}
      style={{ backgroundColor: "transparent" }}
      bodyStyle={{ background: "transparent", padding: "5px" }}
      closable={false}
      footer={false}
    >
      <Form>
        <Row>
          <Col
            span={16}
            style={{ backgroundColor: stateColor, padding: "5px" }}
          >
            <Form.Item name="title">
              <Input
                placeholder="Thêm tiêu đề bảng"
                onChange={(e) => {
                  setStateTitle(e.target.value);
                }}
              />
            </Form.Item>
            <p style={{ color: "#fff" }}>
              {Object.keys(usersReducer).length > 0
                ? usersReducer.fullname
                : null}
            </p>
          </Col>
          <Col span={7} offset={1}>
            <Row>
              {COLOR.map((color, index) => {
                return (
                  <Col span={6} key={index}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "30px",
                        width: "30px",
                        marginBottom: "5px",
                        backgroundColor: color,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setStateColor(color);
                      }}
                    >
                      {stateColor === color ? (
                        <CheckOutlined style={{ color: "#fff" }} />
                      ) : null}
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
        <Row style={{ paddingTop: "5px" }}>
          <Button
            type="primary"
            style={{
              backgroundColor: "#4caf50",
              border: 0,
              marginRight: "5px",
            }}
            disabled={stateTitle.length > 0 ? false : true}
            onClick={() => {
              handleCreateBoard(stateTitle, stateColor);
            }}
          >
            Tạo bảng
          </Button>
          <Button type="primary" danger onClick={handleCloseFormCreate}>
            Hủy bỏ
          </Button>
        </Row>
      </Form>
    </Modal>
  );
}

export default CreateBoardContainer;
