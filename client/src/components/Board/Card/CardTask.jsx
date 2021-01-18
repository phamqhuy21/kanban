import React, { useState } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { Button, Card, Col, Image, Row } from "antd";
import {
  AlignLeftOutlined,
  ClockCircleOutlined,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  PaperClipOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from "moment";
import "./CardTask.css";

CardTask.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string,
    saved: PropTypes.bool,
    groundImage: PropTypes.string,
    label: PropTypes.arrayOf(PropTypes.string),
    content: PropTypes.string,
  }),
  index: PropTypes.number,
  handleSave: PropTypes.func,
  onDeleteCard: PropTypes.func,
};

function CardTask(props) {
  const {
    card,
    index,
    refCard,
    onDeleteCard,
    handleOpenDetailCard,
    onEditCard,
  } = props;
  const [extra, setExtra] = useState(false);

  function getStyle(style, snapshot) {
    if (!snapshot.isDropAnimating) {
      return { ...style };
    }
    return {
      ...style,
      transitionDuration: `0.001s`,
    };
  }

  return (
    <React.Fragment>
      <Draggable key={card._id} draggableId={card._id} index={index}>
        {(provided, snapshot) => {
          return (
            <div
              //   style={
              //     card.saved === true ? { display: "none" } : { width: "100%" }
              //   }
              style={{ width: "100%" }}
              ref={refCard}
            >
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getStyle(provided.draggableProps.style, snapshot)}
              >
                <Card
                  className="card-task"
                  headStyle={{
                    padding: 0,
                    fontSize: "0.8rem",
                    fontWeight: "initial",
                    border: "none",
                  }}
                  style={{
                    margin: "0.5rem 0",
                    backgroundColor: "white",
                    borderRadius: "0.2rem",
                    boxShadow: "0 1px 0 rgba(9,30,66,.25)",
                    color: "#616161",
                  }}
                  //   bodyStyle={{
                  //     padding: "0",
                  //   }}
                  size="small"
                  hoverable={true}
                  title={
                    card.background.length > 0 ? (
                      <div
                        style={{
                          backgroundImage: `url(${card.background})`,
                          textAlign: "center",
                        }}
                        onClick={() => {
                          handleOpenDetailCard(card);
                        }}
                      >
                        <Image src={card.background} preview={false} />
                      </div>
                    ) : null
                  }
                  onMouseEnter={() => setExtra(true)}
                  onMouseLeave={() => setExtra(false)}
                >
                  <div>
                    {card.labels.length > 0 ? (
                      <Row style={{ width: "90%" }}>
                        {card.labels.map((label, index) => {
                          return (
                            <Col key={index}>
                              <div
                                style={{
                                  minWidth: "50px",
                                  minHeight: "1vh",
                                  margin: "0.2vh 0.1vw",
                                  backgroundColor: label.color,
                                  borderRadius: "5px",
                                }}
                              />
                            </Col>
                          );
                        })}
                      </Row>
                    ) : null}
                    <div
                      onClick={() => {
                        handleOpenDetailCard(card);
                      }}
                    >
                      <div style={{ paddingTop: "0.5vh" }}>{card.title}</div>
                      <Row>
                        {card.deadline ? (
                          <Col span={11}>
                            <ClockCircleOutlined
                              style={{ marginRight: "5px" }}
                            />
                            <span>
                              {moment(card.deadline).format("MMM Do YY")}
                            </span>
                          </Col>
                        ) : null}
                        {card.description.length > 0 ? (
                          <Col span={2}>
                            <AlignLeftOutlined />
                          </Col>
                        ) : null}
                        {card.comments.length > 0 ? (
                          <Col span={4}>
                            <CommentOutlined style={{ marginRight: "5px" }} />
                            <span>{card.comments.length}</span>
                          </Col>
                        ) : null}
                        {card.files.length > 0 ? (
                          <Col span={4}>
                            <PaperClipOutlined style={{ marginRight: "5px" }} />
                            <span>{card.files.length}</span>
                          </Col>
                        ) : null}
                        {card.members.length > 0 ? (
                          <Col span={3}>
                            <UserOutlined style={{ marginRight: "5px" }} />
                            <span>{card.members.length}</span>
                          </Col>
                        ) : null}
                      </Row>
                    </div>
                    {extra ? (
                      <div
                        style={{
                          position: "absolute",
                          top: "3px",
                          right: "3px",
                          display: "flex",
                        }}
                      >
                        <Button
                          style={{
                            backgroundColor: "rgba(0,0,0,0.3)",
                            padding: "0 0.5vw",
                            marginRight: "3px",
                            border: "none",
                            color: "#212121",
                          }}
                        >
                          <EditOutlined
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={onEditCard}
                          />
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "rgba(0,0,0,0.3)",
                            padding: "0 0.5vw",
                            border: "none",
                            color: "#212121",
                          }}
                        >
                          <DeleteOutlined
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={onDeleteCard}
                          />
                        </Button>
                      </div>
                    ) : null}
                  </div>
                </Card>
              </div>
            </div>
          );
        }}
      </Draggable>
    </React.Fragment>
  );
}

export default CardTask;
