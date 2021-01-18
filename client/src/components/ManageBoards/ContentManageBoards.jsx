import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { cloneDeep } from "lodash";

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
  const {
    boards,
    children,
    handleOpenFormCreate,
    openFormCreate,
    typeBoard,
  } = props;
  const [individualBoard, setIndividualBoard] = useState([]);
  const [groupBoard, setGroupBoard] = useState([]);
  const [boardByType, setBoardByType] = useState();

  useEffect(() => {
    let cloneBoards = cloneDeep(boards);
    switch (typeBoard) {
      case "done": {
        setBoardByType(
          cloneBoards.filter((board) => {
            return board.done;
          })
        );
        break;
      }
      case "progress": {
        setBoardByType(
          cloneBoards.filter((board) => {
            return !board.done;
          })
        );
        break;
      }
      case "recently": {
        setBoardByType(
          cloneBoards
            .sort((prev, next) => {
              let prevDate = new Date(prev.createdAt).valueOf();
              let nextDate = new Date(next.createdAt).valueOf();
              return nextDate - prevDate;
            })
            .slice(0, 4)
        );
        break;
      }
      default:
        break;
    }
  }, [boards, typeBoard]);

  useEffect(() => {
    console.log(boardByType);
    if (boardByType) {
      let cloneBoards = cloneDeep(boardByType);
      let cloneInvidualBoard = cloneBoards.filter((board) => {
        return board.members.length === 1;
      });
      let cloneGroupBoard = cloneBoards.filter((board) => {
        return board.members.length > 1;
      });
      setIndividualBoard(cloneInvidualBoard);
      setGroupBoard(cloneGroupBoard);
    }
  }, [boardByType, boards]);

  return (
    <div>
      {individualBoard.length ? (
        <React.Fragment>
          <Row className="role-boards">
            <div style={style.coverRoleBoard}>
              <i className="fad fa-user"></i>
              <b style={{ marginLeft: "0.5vw" }}>Bảng Cá Nhân</b>
            </div>
          </Row>
          <Row>
            {individualBoard.map((board, index) => (
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
          </Row>
        </React.Fragment>
      ) : null}
      {groupBoard.length ? (
        <React.Fragment>
          <Row className="role-boards">
            <div style={style.coverRoleBoard}>
              <i className="fad fa-users"></i>
              <b style={{ marginLeft: "0.5vw" }}>Bảng Nhóm</b>
            </div>
          </Row>
          <Row>
            {groupBoard.map((board, index) => (
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
          </Row>
        </React.Fragment>
      ) : null}
      <React.Fragment>
        <Row className="role-boards">
          <div style={style.coverRoleBoard}>
            <i className="fad fa-clipboard-list"></i>
            <b style={{ marginLeft: "0.5vw" }}>Bảng Quản lý Công việc</b>
          </div>
        </Row>
        <Row>
          {boardByType
            ? boardByType.map((board, index) => (
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
              ))
            : null}
          {typeBoard === "progress" ? (
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
          ) : null}
        </Row>
      </React.Fragment>
    </div>
  );
}

export default ContentManageBoards;
