import React from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";

AddMemberForm.propTypes = {};

const style = {
  formItemStyle: {
    marginBottom: 0,
  },
};

function AddMemberForm(props) {
  const { handleCloseForm, handleAddMember } = props;
  const [formMember] = Form.useForm();

  const onFinish = (value) => {
    handleAddMember(value.email);
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "10px",
        boxShadow: "0 0 2px 2px rgba(0,0,0,0.2)",
      }}
    >
      <Form form={formMember} onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Không được bỏ trống" }]}
        >
          <Input
            bordered={false}
            placeholder="Nhập email"
            style={{ borderBottom: "1px solid #bdbdbd" }}
          />
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Form.Item style={style.formItemStyle}>
            <Button danger onClick={handleCloseForm}>
              Hủy bỏ
            </Button>
          </Form.Item>
          <Form.Item style={style.formItemStyle}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                marginLeft: "5px",
                backgroundColor: "#4caf50",
                border: "none",
              }}
            >
              Thêm
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default AddMemberForm;
