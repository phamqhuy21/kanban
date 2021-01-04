import React, { useEffect } from "react";
import { Input, Button, Form } from "antd";
import Modal from "antd/lib/modal/Modal";

function FormEditList(props) {
  const [form] = Form.useForm();
  const { list, handleSave, setVisible, visible } = props;

  const handleClick = () => {
    form.validateFields().then((value) => {
      handleSave(list._id, value.title);
    });
    setVisible(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      title: list.title,
    });
  }, [list]);

  return (
    <Modal
      closable={false}
      visible={visible}
      forceRender={true}
      footer={false}
      bodyStyle={{ padding: "0" }}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Form
        form={form}
        name="basic"
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleClick();
          }
        }}
      >
        <Form.Item
          style={{ marginBottom: "0.7rem" }}
          name="title"
          rules={[
            {
              required: true,
              message: "Tiêu đề danh sách không được bỏ trống",
            },
          ]}
        >
          <Input style={{ border: "none" }} bordered={false} />
        </Form.Item>
        <Form.Item style={{ marginBottom: "1vw" }}>
          <Button
            style={{
              backgroundColor: "#5aac44",
              color: "#fafafa",
              borderRadius: "0.2rem",
            }}
            onClick={handleClick}
          >
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default FormEditList;
