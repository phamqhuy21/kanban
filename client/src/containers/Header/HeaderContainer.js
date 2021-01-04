import React from "react";
import PropTypes from "prop-types";
import Headers from "../../components/Header/Headers";
import { useSelector } from "react-redux";

HeaderContainer.propTypes = {};

function HeaderContainer(props) {
  const detailBoardReducer = useSelector((state) => state.detailBoardReducer);

  return <Headers board={detailBoardReducer} />;
}

export default HeaderContainer;
