import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input, message } from "antd";
import { updateUser } from "../../api/user";
import { useDispatch } from "react-redux";
import { getUserReq } from "../../redux/actions/user";

InforUser.propTypes = {};

function InforUser(props) {
  const { user } = props;
  const dispatch = useDispatch();
  const [formUser] = Form.useForm();

  const onFinish = (value) => {
    let data = value;
    updateUser(data)
      .then((res) => {
        if (res.status === 200) {
          message.success("Cập nhật thông tin người dùng thành công");
          dispatch(getUserReq());
        } else message.error("Cập nhật thông tin người dùng thất bại");
      })
      .catch((err) => {
        message.error("Cập nhật thông tin người dùng thất bại");
      });
  };

  useEffect(() => {
    formUser.setFieldsValue({
      fullname: user.fullname,
      username: user.username,
      email: user.email,
    });
  }, [user]);

  return (
    <div>
      <Form
        form={formUser}
        layout="vertical"
        style={{ width: "60%", paddingTop: "20px", paddingLeft: "40px" }}
        onFinish={onFinish}
      >
        <Form.Item
          style={{ marginBottom: "10px" }}
          label={<p style={{ fontWeight: "bold" }}>Tên người dùng</p>}
          name="fullname"
          rules={[
            {
              required: true,
              message: "Không được bỏ trống!",
            },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label={<p style={{ fontWeight: "bold" }}>Tên đăng nhập</p>}
          name="username"
          rules={[
            {
              required: true,
              message: "Không được bỏ trống!",
            },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label={<p style={{ fontWeight: "bold" }}>Địa chỉ email</p>}
          name="email"
          rules={[
            {
              required: true,
              message: "Không được bỏ trống!",
            },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item>
          <Button
            style={{
              width: "100%",
              backgroundColor: "#4caf50",
              border: "none",
              marginTop: "30px",
            }}
            type="primary"
            htmlType="submit"
          >
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default InforUser;
