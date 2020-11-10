import React from "react";
import PropTypes from "prop-types";
import Cards from "../components/Board/Card/Card";

CardContainer.propTypes = {
  card: PropTypes.object,
  index: PropTypes.number,
  handleDeleteCard: PropTypes.func,
  handleEditCard: PropTypes.func,
};

function CardContainer(props) {
  const { card, index, handleDeleteCard, handleEditCard } = props;

  const onDeleteCard = () => {
    handleDeleteCard(index);
  };

  const handleSave = (indexCart, cart) => {
    handleEditCard(indexCart, cart);
  };
  return (
    <Cards
      card={card}
      index={index}
      handleSave={handleSave}
      onDeleteCard={onDeleteCard}
    />
  );
}

export default CardContainer;
