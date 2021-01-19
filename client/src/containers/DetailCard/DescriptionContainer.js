import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Row, Col, Form, message } from "antd";
import { useDispatch } from "react-redux";
import { AlignLeftOutlined } from "@ant-design/icons";
import Description from "../../components/Board/DetailCard/Description";
import { updateCardTask } from "../../api/cardTask";
import { useRouteMatch } from "react-router-dom";
import { getBoardDetailReq } from "../../redux/actions/boards";
import { addDescriptionRequest } from "../../redux/actions/board";
import { getDataCardReq } from "../../redux/actions/cardTask";
import { createAction } from "../../api/action";

DescriptionContainer.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
  }),
};

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

function DescriptionContainer(props) {
  const { card } = props;
  const [openForm, setOpenForm] = useState(false);
  const [description, setDescription] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const handleSave = () => {
    form.validateFields().then((value) => {
      let boardId = match.params.id;
      let cardId = card._id;
      let dataReq = {
        boardId,
        cardId,
        data: value,
      };
      updateCardTask(dataReq)
        .then((res) => {
          if (res.status === 200) {
            message.success(
              `${
                card.description.length > 0 ? "Cập nhật" : "Thêm"
              } mô tả cho thẻ thành công`
            );
            createAction({
              boardId,
              cardId,
              data: {
                action: `${
                  card.description.length > 0 ? "cập nhật" : "thêm"
                } mô tả`,
              },
            }).then((res) => {
              if (res.status === 200) {
                dispatch(getBoardDetailReq(boardId));
              }
            });
            dispatch(getBoardDetailReq(boardId));
            dispatch(getDataCardReq(boardId, cardId));
            dispatch(addDescriptionRequest(cardId, value.description));
          } else
            message.error(
              `${
                card.description.length > 0 ? "Cập nhật" : "Thêm"
              } mô tả cho thẻ thất bại`
            );
        })
        .catch((err) => {
          message.error(
            `${
              card.description.length > 0 ? "Cập nhật" : "Thêm"
            } mô tả cho thẻ thất bại`
          );
        });
    });
    setOpenForm(false);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  useEffect(() => {
    setDescription(card.description);
    form.setFieldsValue({
      description: card.description,
    });
  }, [card.description, form]);

  return (
    <Card
      title={
        <Row>
          <Col span={1}>
            <AlignLeftOutlined style={{ color: "#757575" }} />
          </Col>
          <Col span={23}>
            <span style={{ color: "#757575" }}>Mô tả</span>
          </Col>
        </Row>
      }
      style={style.cardStyle}
      headStyle={style.headCardStyle}
      bodyStyle={{ padding: "0 10px" }}
      bordered={false}
    >
      <Row>
        <Col offset={1} span={23}>
          {openForm ? (
            <Form form={form}>
              <Description
                handleSave={handleSave}
                handleCloseForm={handleCloseForm}
              />
            </Form>
          ) : (
            <div
              className="add-description"
              onClick={() => {
                setOpenForm(true);
              }}
            >
              {description === "" ? "Thêm mô tả chi tiết hơn ..." : description}
            </div>
          )}
        </Col>
      </Row>
    </Card>
  );
}

export default DescriptionContainer;
