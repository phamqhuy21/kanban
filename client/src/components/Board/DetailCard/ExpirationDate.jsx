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
    padding: "1vh 0.5vw",
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
  const timer =
    moment(card.deadline).valueOf() - new Date().valueOf() || undefined;

  return (
    <div style={style.coverExpirationDateStyle}>
      <h5 style={{ color: "#757575", marginBottom: 0 }}>NGÀY HẾT HẠN</h5>
      <div style={{ display: "flex" }}>
        {/* <Checkbox onChange={handleCheckSuccess}> */}
        <div
          style={style.btnCheckSuccsessStyle}
          onClick={() => {
            console.log("click");
          }}
        >
          <span>{moment(card.deadline).format("MMMM Do YYYY, h:mm:ss a")}</span>
          {timer ? (
            <React.Fragment>
              {timer < card.timer && timer > 0 ? (
                <span
                  style={{
                    ...style.labelStatusStyle,
                    backgroundColor: "#ffa726",
                  }}
                >
                  GẦN ĐẾN HẠN
                </span>
              ) : timer <= 0 ? (
                <span
                  style={{
                    ...style.labelStatusStyle,
                    backgroundColor: "#ef5350",
                  }}
                >
                  QUÁ HẠN
                </span>
              ) : null}
            </React.Fragment>
          ) : null}
        </div>
        {/* </Checkbox> */}
      </div>
    </div>
  );
}

export default ExpirationDate;
