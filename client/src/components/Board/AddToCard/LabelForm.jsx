import React, { useState } from "react";
import { Form, Input, Card, Row, Col } from "antd";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

LabelForm.propTypes = {
  card: PropTypes.shape({
    label: PropTypes.arrayOf(PropTypes.string),
  }),
  selectLabel: PropTypes.func,
};

const COLOR = ["green", "red", "blue", "yellow", "orange", "violet", "gray"];

function LabelForm(props) {
  const { card, selectLabel } = props;
  const [label, setLabel] = useState(COLOR);
  const [form] = Form.useForm();

  const handleSearch = () => {
    form.validateFields().then((value) => {
      var fil = COLOR.filter((color) => {
        return color.search(`${value.search}`) >= 0;
      });
      setLabel(fil);
    });
  };

  return (
    <Card
      size="small"
      title={<div style={{ textAlign: "center" }}>Nhãn</div>}
      bordered={false}
      //   bodyStyle={{ padding: "0" }}
      //   headStyle={{ padding: "0" }}
    >
      <Form style={{ width: "17vw" }} form={form}>
        <Form.Item name="search" style={{ marginBottom: "1vh" }}>
          <Input
            placeholder="Tìm nhãn..."
            onChange={handleSearch}
            style={{ border: "3px solid rgba(100,100,100,0.2)" }}
          />
        </Form.Item>
        <Form.Item>
          <div>
            <p style={{ fontWeight: "500" }}>Nhãn</p>
            {label.map((color, index) => {
              return (
                <Row style={{ marginBottom: "0.5vh" }}>
                  <Col span={22}>
                    <Card
                      size="small"
                      key={index}
                      extra={
                        card.label.includes(color) ? (
                          <CheckOutlined style={{ color: "white" }} />
                        ) : null
                      }
                      style={{
                        borderRadius: "0.2rem",
                        backgroundColor: `${color}`,
                        cursor: "pointer",
                      }}
                      bodyStyle={{ padding: "0" }}
                      title="as"
                      headStyle={{ padding: "0 1vw" }}
                      onClick={() => {
                        selectLabel(color, card);
                      }}
                    />
                  </Col>
                  <Col span={2}>
                    <EditOutlined style={{ marginLeft: "0.5vw" }} />
                  </Col>
                </Row>
              );
            })}
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default LabelForm;
