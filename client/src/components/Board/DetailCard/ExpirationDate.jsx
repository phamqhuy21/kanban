import React from "react";
import PropTypes from "prop-types";
import { Checkbox, Button } from "antd";
import moment from "moment";

ExpirationDate.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string,
    exDate: PropTypes.object,
  }),
  handleCheckSuccess: PropTypes.func,
};

const style = {
  coverExpirationDateStyle: { marginLeft: "2vw" },
  btnCheckSuccsessStyle: {
    backgroundColor: "#eeeeee",
    color: "#212121",
    border: "none",
  },
  labelStatusStyle: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    marginLeft: "0.5vw",
    padding: "0.5vh 0.5vw",
  },
};

function ExpirationDate(props) {
  const { card, handleCheckSuccess } = props;
  const timer = card.exDate.date - new Date().valueOf();

  return (
    <div style={style.coverExpirationDateStyle}>
      <h4>NGÀY HẾT HẠN</h4>
      <div style={{ display: "flex" }}>
        <Checkbox onChange={handleCheckSuccess}>
          <Button
            type="primary"
            style={style.btnCheckSuccsessStyle}
            onClick={() => {
              console.log("click");
            }}
          >
            <span>
              {moment(card.exDate.date).format("MMMM Do YYYY, h:mm:ss a")}
            </span>
            {card.exDate.successed ? (
              <span style={style.labelStatusStyle}>HOÀN TẤT</span>
            ) : timer < card.exDate.timer && timer > 0 ? (
              <span
                style={{
                  ...style.labelStatusStyle,
                  backgroundColor: "	#ffcc00",
                }}
              >
                GẦN ĐẾN HẠN
              </span>
            ) : timer <= 0 ? (
              <span
                style={{
                  ...style.labelStatusStyle,
                  backgroundColor: "#f44336",
                }}
              >
                Quá hạn
              </span>
            ) : null}
          </Button>
        </Checkbox>
      </div>
    </div>
  );
}

export default ExpirationDate;
