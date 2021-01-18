import React, { useEffect, useState } from "react";
import { Form, Input, Card, Row, Col, Button } from "antd";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { findIndex, indexOf } from "lodash";

LabelForm.propTypes = {
  card: PropTypes.shape({
    label: PropTypes.arrayOf(PropTypes.string),
  }),
  selectLabel: PropTypes.func,
};

const COLOR = [
  "#43a047",
  "#03a9f4",
  "#f44336",
  "#ff9800",
  "#ffeb3b",
  "#ba68c8",
  "#d4e157",
];

function LabelForm(props) {
  const {
    card,
    selectLabel,
    labels,
    handleModeCreate,
    handleModeUpdate,
  } = props;
  const [stateLabel, setStateLabel] = useState();
  const [form] = Form.useForm();

  const handleSearch = () => {
    form.validateFields().then((value) => {
      if (value.search.length > 0) {
        var fil = labels.filter((label) => {
          return label.title && label.title.search(`${value.search}`) >= 0;
        });
        setStateLabel(fil);
      } else {
        setStateLabel(labels);
      }
    });
  };

  useEffect(() => {
    setStateLabel(labels);
  }, [labels]);

  return (
    <Card
      size="small"
      title={<div style={{ textAlign: "center" }}>Nhãn</div>}
      style={{ boxShadow: "0 0 2px 2px rgba(0,0,0,0.2)" }}
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
            {stateLabel ? (
              <div
                style={{
                  overflow: "auto",
                  maxHeight: "70vh",
                  paddingRight: "10px",
                }}
              >
                {stateLabel.map((label, index) => {
                  return (
                    <Row
                      style={{
                        marginBottom: "0.5vh",
                      }}
                      key={index}
                    >
                      <Col span={22}>
                        <Card
                          size="small"
                          extra={
                            findIndex(card.labels, (cardLabel) => {
                              return cardLabel._id === label._id;
                            }) !== -1 ? (
                              <CheckOutlined style={{ color: "#fff" }} />
                            ) : null
                          }
                          title={label.title}
                          headStyle={{ color: "#fff" }}
                          style={{
                            height: "35px",
                            borderRadius: "0.2rem",
                            backgroundColor: `${label.color}`,
                            cursor: "pointer",
                          }}
                          bodyStyle={{ padding: "0" }}
                          onClick={() => {
                            selectLabel(label, card);
                          }}
                        />
                      </Col>
                      <Col span={2}>
                        <EditOutlined
                          style={{ marginLeft: "0.5vw" }}
                          onClick={() => {
                            handleModeUpdate(label);
                          }}
                        />
                      </Col>
                    </Row>
                  );
                })}
              </div>
            ) : null}
          </div>
        </Form.Item>
        <Form.Item style={{ marginBottom: "1vh" }}>
          <Button style={{ width: "100%" }} onClick={handleModeCreate}>
            Tạo nhãn mới
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default LabelForm;
