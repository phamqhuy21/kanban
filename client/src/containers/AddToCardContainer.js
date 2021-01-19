import React from "react";
import PropTypes from "prop-types";
import AddToCard from "../components/Board/AddToCard/AddToCard";
import { addFileRequest, deleteGroundRequest } from "../redux/actions/board";
import { useDispatch, useSelector } from "react-redux";

AddToCardContainer.propTypes = {};

function AddToCardContainer(props) {
  const cardTaskReducer = useSelector((state) => state.cardTaskReducer);

  return <AddToCard card={cardTaskReducer} />;
}

export default AddToCardContainer;
