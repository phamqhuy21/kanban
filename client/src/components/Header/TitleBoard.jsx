import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Input } from "antd";

TitleBoard.propTypes = {};

function TitleBoard(props) {
  const { title, closeForm } = props;
  const [value, setValue] = useState("");
  const wrapperRef = useRef(null);

  function handleClickOutside(event) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      closeForm(value);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, value]);

  useEffect(() => {
    setValue(title);
  }, [title]);

  return (
    <div ref={wrapperRef}>
      <Input
        value={value}
        onPressEnter={() => {
          closeForm(value);
        }}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}

export default TitleBoard;
