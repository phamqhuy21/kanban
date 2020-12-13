import React from "react";
import PropTypes from "prop-types";
import LabelForm from "../../components/Board/AddToCard/LabelForm";

ManageLabel.propTypes = {};

function ManageLabel(props) {
  const { card, selectLabel } = props;
  return <LabelForm card={card} selectLabel={selectLabel} />;
}

export default ManageLabel;
