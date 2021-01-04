import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { filter, findIndex } from "lodash";

Label.propTypes = {
  card: PropTypes.shape({
    label: PropTypes.array,
  }),
};

const style = {
  coverLabelStyle: { display: "flex" },
  colorLabelStyle: {
    minWidth: "2vw",
    minHeight: "3vh",
    marginRight: "0.5vw",
    padding: "5px",
    borderRadius: "0.2rem",
    color: "#fff",
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
      <h5 style={{ color: "#757575" }}>NHÃN</h5>
      <div style={style.coverLabelStyle}>
        {card.labels.map((label, index) => {
          return (
            <React.Fragment key={index}>
              <div
                style={{
                  ...style.colorLabelStyle,
                  backgroundColor: `${label.color}`,
                }}
              >
                <p style={{ marginBottom: 0 }}>{label.title}</p>
              </div>
            </React.Fragment>
          );
        })}
        {/* <Button type="primary" style={style.coverMarkedLabelStyle}>
          <PlusOutlined style={style.markedLabelStyle} />
        </Button> */}
      </div>
    </div>
  );
}

export default Label;
