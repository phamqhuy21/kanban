import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import CardTask from "../components/Board/Card/CardTask";
import FormEditCard from "../components/Board/Card/FormEditCard";
import { Modal } from "antd";
import DetailcardContainer from "./DetailcardContainer";

CardContainer.propTypes = {
  card: PropTypes.object,
  index: PropTypes.number,
  handleDeleteCard: PropTypes.func,
  handleEditCard: PropTypes.func,
};

function CardContainer(props) {
  const { card, index, handleDeleteCard, handleEditCard } = props;
  const [visibleFormEditCard, setVisibleFormEditCard] = useState(false);
  const [cardSelected, setCardSelected] = useState();
  const [visibleModalCard, setVisibleModalCard] = useState(false);

  const refCard = useRef(null);

  const onDeleteCard = () => {
    handleDeleteCard(card);
  };

  const onEditCard = () => setVisibleFormEditCard(true);

  const handleSave = (cardId, title) => {
    handleEditCard(cardId, title);
  };

  const handleOpenDetailCard = (card) => {
    setCardSelected({ ...card });
    setVisibleModalCard(true);
  };

  return (
    <React.Fragment>
      <CardTask
        refCard={refCard}
        card={card}
        index={index}
        handleSave={handleSave}
        onDeleteCard={onDeleteCard}
        onEditCard={onEditCard}
        handleOpenDetailCard={handleOpenDetailCard}
      />
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
            visible={visibleFormEditCard}
            handleSave={handleSave}
            setVisible={setVisibleFormEditCard}
          />
        </Modal>
      ) : null}
    </React.Fragment>
  );
}

export default CardContainer;
