import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

Label.propTypes = {
  card: PropTypes.shape({
    label: PropTypes.array,
  }),
};

const style = {
  coverLabelStyle: { display: "flex" },
  colorLabelStyle: {
    width: "2vw",
    height: "4vh",
    marginRight: "0.5vw",
    borderRadius: "0.2rem",
  },
  coverMarkedLabelStyle: {
    width: "2vw",
    height: "4vh",
    backgroundColor: "#f5f5f5",
    color: "#424242",
    border: "none",
  },
  markedLabelStyle: { position: "absolute", top: "1vh", right: "0.5vw" },
};

function Label(props) {
  const { card } = props;
  return (
    <div>
      <h4>NHÃN</h4>
      <div style={style.coverLabelStyle}>
        {card.label.map((color, index) => {
          return (
            <div
              key={index}
              style={{ ...style.colorLabelStyle, backgroundColor: `${color}` }}
            />
          );
        })}
        <Button type="primary" style={style.coverMarkedLabelStyle}>
          <PlusOutlined style={style.markedLabelStyle} />
        </Button>
      </div>
    </div>
  );
}

export default Label;
