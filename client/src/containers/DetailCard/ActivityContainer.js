import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Activity from "../../components/Board/DetailCard/Activity";
import { useSelector } from "react-redux";
import { Button, Card, Col, Row } from "antd";
import { AlignLeftOutlined, PaperClipOutlined } from "@ant-design/icons";

ActivityContainer.propTypes = {};

const style = {
  cardStyle: { backgroundColor: "#f5f5f5" },
  headCardStyle: { padding: "0 1vw", border: "none" },
  buttonSaveStyle: {
    backgroundColor: "#5aac44",
    color: "#fff",
  },
  iconCloseStyle: {
    position: "absolute",
    top: "1vh",
    padding: "0 0.7rem",
    fontSize: "1.2rem",
    border: "none",
    cursor: "pointer",
  },
};

function ActivityContainer(props) {
  const cardTaskReducer = useSelector((state) => state.cardTaskReducer);
  const [show, setShow] = useState(true);
  const [countAction, setCountAction] = useState();

  const renderActivity = (countAction, actions) => {
    let result = [];
    for (let i = 0; i < countAction; i++) {
      result.push(<Activity action={actions[i]} key={i} />);
    }
    return result;
  };

  const handleShowMore = (countAction, actions) => {
    let count = countAction + 5;
    if (actions.length - countAction < 5) {
      count = actions.length;
    }

    setCountAction(count);
  };

  const handlehiddenAction = (countAction, actions) => {
    let count = countAction - 5;
    setCountAction(count);
  };

  useEffect(() => {
    setCountAction(
      cardTaskReducer.actions.length < 5 ? cardTaskReducer.actions.length : 5
    );
  }, [cardTaskReducer._id]);

  return (
    <div>
      <Card
        title={
          <Row>
            <Col span={1}>
              <AlignLeftOutlined style={{ color: "#757575" }} />
            </Col>
            <Col span={15}>
              <span style={{ color: "#757575" }}>Hoạt động</span>
            </Col>
            <Col
              span={8}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                style={{
                  backgroundColor: "rgba(0,0,0,0.1)",
                  border: "none",
                  marginLeft: "5px",
                }}
                onClick={() => {
                  setShow(!show);
                }}
              >
                {!show ? "Hiện chi tiết" : "Ẩn"}
              </Button>
            </Col>
          </Row>
        }
        style={style.cardStyle}
        headStyle={style.headCardStyle}
        bodyStyle={{ padding: "0 10px" }}
        bordered={false}
      >
        {show ? (
          <Row>
            <Col offset={1} span={23}>
              {cardTaskReducer?.actions.length > 0
                ? renderActivity(countAction, cardTaskReducer?.actions)
                : null}
              {countAction < cardTaskReducer?.actions.length ? (
                <div style={{ display: "flex" }}>
                  {cardTaskReducer?.actions.length > 0 ? (
                    <p
                      style={{
                        marginBottom: 0,
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                      onClick={() => {
                        handleShowMore(countAction, cardTaskReducer?.actions);
                      }}
                    >
                      Xem thêm
                    </p>
                  ) : null}
                  {countAction <= 5 ? null : (
                    <p
                      style={{
                        marginBottom: 0,
                        cursor: "pointer",
                        textDecoration: "underline",
                        marginLeft: "10px",
                      }}
                      onClick={() => {
                        handlehiddenAction(
                          countAction,
                          cardTaskReducer?.actions
                        );
                      }}
                    >
                      Ẩn bớt
                    </p>
                  )}
                </div>
              ) : null}
            </Col>
          </Row>
        ) : null}
      </Card>
    </div>
  );
}

export default ActivityContainer;
