import React from "react";
import PropTypes from "prop-types";
import "./Scrollbar.css";

Scrollbar.propTypes = {
  styleScrollbar: PropTypes.object,
};

function Scrollbar(props) {
  const { styleScrollbar, children } = props;
  return (
    <div className="global-scrollbar" style={{ ...styleScrollbar }}>
      {children}
    </div>
  );
}

export default Scrollbar;
