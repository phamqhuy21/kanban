import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { Card, Modal, Image } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import FormEditCard from "./FormEditCard";
import DetailcardContainer from "../../../containers/DetailcardContainer";

Card.propTypes = {
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

function Cards(props) {
  const { card, index, handleSave, onDeleteCard } = props;
  const [extra, setExtra] = useState(false);
  const [visibleFormEditCard, setVisibleFormEditCard] = useState(false);
  const [cardSelected, setCardSelected] = useState(null);
  const [visibleModalCard, setVisibleModalCard] = useState(false);
  const refCard = useRef(null);

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
      <Draggable key={card.id} draggableId={String(card.id)} index={index}>
        {(provided, snapshot) => {
          return (
            <div
              style={
                card.saved === true ? { display: "none" } : { width: "100%" }
              }
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
                      {card.groundImage.length > 0 ? (
                        <div
                          style={{
                            backgroundColor: "#bdbdbd",
                            textAlign: "center",
                          }}
                        >
                          <Image
                            /* width={100}
                            height={200} */
                            src={card.groundImage}
                          />
                        </div>
                      ) : null}
                      {card.label.length > 0 ? (
                        <div style={{ display: "flex" }}>
                          {card.label.map((item, index) => {
                            return (
                              <div
                                key={index}
                                style={{
                                  width: "18%",
                                  height: "1vh",
                                  marginRight: "0.2vw",
                                  backgroundColor: item,
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
                          setCardSelected({ ...card });
                          setVisibleModalCard(true);
                        }}
                      >
                        {card.content}
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
                            onClick={() => setVisibleFormEditCard(true)}
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
      {cardSelected ? (
        <DetailcardContainer
          card={cardSelected}
          visible={visibleModalCard}
          setVisible={setVisibleModalCard}
        />
      ) : null}
      {refCard.current ? (
        <Modal
          closable={false}
          visible={visibleFormEditCard}
          footer={false}
          width={refCard.current.getBoundingClientRect().width}
          bodyStyle={{ padding: "0" }}
          style={{
            position: "absolute",
            top: refCard.current.getBoundingClientRect().top,
            left: refCard.current.getBoundingClientRect().left,
          }}
          onCancel={() => setVisibleFormEditCard(false)}
        >
          <FormEditCard
            card={card}
            index={index}
            handleSave={handleSave}
            setVisible={setVisibleFormEditCard}
          />
        </Modal>
      ) : null}
    </React.Fragment>
  );
}

export default Cards;
