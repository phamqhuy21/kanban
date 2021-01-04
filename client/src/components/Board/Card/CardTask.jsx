import React, { useState } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

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
                  headStyle={{
                    padding: "0 0.4rem",
                    fontSize: "0.8rem",
                    fontWeight: "initial",
                  }}
                  style={{
                    margin: "0.5rem 0",
                    backgroundColor: "white",
                    borderRadius: "0.2rem",
                    boxShadow: "0 1px 0 rgba(9,30,66,.25)",
                  }}
                  bodyStyle={{
                    padding: "0",
                  }}
                  size="small"
                  hoverable={true}
                  title={
                    <div>
                      {/* {card.groundImage.length > 0 ? (
                        <div
                          style={{
                            backgroundColor: "#bdbdbd",
                            textAlign: "center",
                          }}
                        >
                          <Image
                            src={card.groundImage}
                          />
                        </div>
                      ) : null} */}
                      {card.labels.length > 0 ? (
                        <div style={{ display: "flex" }}>
                          {card.labels.map((label, index) => {
                            return (
                              <div
                                key={index}
                                style={{
                                  width: "18%",
                                  height: "1vh",
                                  marginRight: "0.2vw",
                                  backgroundColor: label.color,
                                  borderRadius: "5px",
                                }}
                              />
                            );
                          })}
                        </div>
                      ) : null}
                      <div
                        style={{ paddingTop: "0.5vh" }}
                        onClick={() => {
                          handleOpenDetailCard(card);
                        }}
                      >
                        {card.title}
                      </div>
                      {extra ? (
                        <div
                          style={{
                            position: "absolute",
                            top: "1.5vh",
                            right: "0.5vw",
                          }}
                        >
                          <EditOutlined
                            style={{
                              marginRight: "0.5rem",
                              cursor: "pointer",
                            }}
                            onClick={onEditCard}
                          />
                          <DeleteOutlined
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={onDeleteCard}
                          />
                        </div>
                      ) : null}
                      {/*  {Object.keys(card.exDate).length > 0 ? (<div><ClockCircleOutlined /></div>):null} */}
                    </div>
                  }
                  onMouseEnter={() => setExtra(true)}
                  onMouseLeave={() => setExtra(false)}
                ></Card>
              </div>
            </div>
          );
        }}
      </Draggable>
    </React.Fragment>
  );
}

export default CardTask;
