import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Row, Col, Form } from "antd";
import { useDispatch } from "react-redux";
import { AlignLeftOutlined } from "@ant-design/icons";
import Description from "../../components/Board/DetailCard/Description";

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
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSave = () => {
    form.validateFields().then((value) => {
      //   dispatch(addDescriptionRequest(card.id, value.description));
    });
    setOpenForm(false);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      description: card.description,
    });
  }, [card.description, form]);

  return (
    <Card
      title={
        <Row>
          <Col span={2}>
            <AlignLeftOutlined />
          </Col>
          <Col span={22}>
            <span>Mô tả</span>
          </Col>
        </Row>
      }
      style={style.cardStyle}
      headStyle={style.headCardStyle}
      bordered={false}
    >
      <Row>
        <Col offset={2} span={22}>
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
              {card.description === ""
                ? "Thêm mô tả chi tiết hơn ..."
                : card.description}
            </div>
          )}
        </Col>
      </Row>
    </Card>
  );
}

export default DescriptionContainer;
