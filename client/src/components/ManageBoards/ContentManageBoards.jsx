import React from "react";
import PropTypes from "prop-types";
import { Card, Col, Row } from "antd";
import "./style.css";
import { Link } from "react-router-dom";

ContentManageBoards.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string })),
};

const style = {
  coverRoleBoard: {
    display: "flex",
    alignItems: "center",
    paddingBottom: "2vh",
  },
  bodyCardStyle: {
    height: "100px",
    padding: "1.5vh 1vw",
    borderRadius: "3px",
    color: "#fff",
    cursor: "pointer",
  },
};

function ContentManageBoards(props) {
  const { boards, children, handleOpenFormCreate, openFormCreate } = props;
  return (
    <div>
      <Row className="role-boards">
        <div style={style.coverRoleBoard}>
          <i className="fad fa-user"></i>
          <b style={{ marginLeft: "0.5vw" }}>Bảng Cá Nhân</b>
        </div>
      </Row>
      <Row>
        {boards.map((board, index) => (
          <Col
            span={6}
            key={index}
            style={{ marginRight: "1vw", marginBottom: "7px" }}
          >
            <Link to={`/board/${board._id}`}>
              <Card
                className="card-board"
                bodyStyle={{
                  ...style.bodyCardStyle,
                  backgroundColor: board.backgroundColor
                    ? board.backgroundColor
                    : "#4caf50",
                }}
              >
                <p title={board.title}>{board.title}</p>
              </Card>
            </Link>
          </Col>
        ))}
        <Col span={6} style={{ marginBottom: "7px" }}>
          {openFormCreate ? (
            children
          ) : (
            <Card
              bodyStyle={{
                ...style.bodyCardStyle,
                backgroundColor: "#e0e0e0",
                color: "#000000",
              }}
              onClick={handleOpenFormCreate}
            >
              <p>Tạo bảng mới</p>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default ContentManageBoards;
