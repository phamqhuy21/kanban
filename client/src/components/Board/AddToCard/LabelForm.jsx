import React, { useState } from "react";
import { Form, Input, Card } from "antd";
import { CheckOutlined } from "@ant-design/icons";
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
      title={<div>Nhãn</div>}
      bordered={false}
      bodyStyle={{ padding: "0" }}
      headStyle={{ padding: "0" }}
    >
      <Form style={{ width: "20vw" }} form={form}>
        <Form.Item name="search">
          <Input placeholder="Tìm nhãn..." onChange={handleSearch} />
        </Form.Item>
        <Form.Item>
          <div>
            <h3>Nhãn</h3>
            {label.map((color, index) => {
              return (
                <Card
                  size="small"
                  key={index}
                  extra={
                    card.label.includes(color) ? (
                      <CheckOutlined style={{ color: "white" }} />
                    ) : null
                  }
                  style={{
                    width: "90%",
                    height: "5vh",
                    borderRadius: "0.2rem",
                    margin: "1vh",
                    backgroundColor: `${color}`,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    selectLabel(color, card);
                  }}
                />
              );
            })}
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default LabelForm;
