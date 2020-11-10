import React, { useState } from "react";
import { DatePicker, TimePicker, Space, Card, Select, Button } from "antd";
import PropTypes from "prop-types";

ExpirationDateForm.propTypes = {
  card: PropTypes.object,
  handleDeleteExDate: PropTypes.func,
  handleSaveExDate: PropTypes.func,
};

function PickerWithType({ type, onChange }) {
  if (type === "time") return <TimePicker onChange={onChange} />;
  if (type === "date") return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
}

const { Option } = Select;

function ExpirationDateForm(props) {
  const { card, handleDeleteExDate, handleSaveExDate } = props;
  const [time, setTime] = useState(0);
  const [date, setDate] = useState(0);
  const [timer, setTimer] = useState(0);

  const handleTime = (value) => {
    const hour = value._d.getHours();
    const minute = value._d.getMinutes();
    const second = value._d.getSeconds();
    var time = 1000 * (60 * 60 * hour + 60 * minute + second);
    setTime(time);
  };

  const handleDate = (value) => {
    const hour = value._d.getHours();
    const minute = value._d.getMinutes();
    const second = value._d.getSeconds();
    var time = 1000 * (60 * 60 * hour + 60 * minute + second);
    var date = value._d.valueOf() - time;
    setDate(date);
  };

  const handleTimer = (value) => {
    if (value === "5minutes") {
      let time = 5 * 60 * 1000;
      setTimer(time);
    }
    if (value === "30minutes") {
      let time = 30 * 60 * 1000;
      setTimer(time);
    }
    if (value === "1hour") {
      let time = 60 * 60 * 1000;
      setTimer(time);
    }
    if (value === "1day") {
      let time = 24 * 60 * 60 * 1000;
      setTimer(time);
    }
  };

  return (
    <Card
      size="small"
      title={<h4>Sửa ngày hết hạn</h4>}
      bordered={false}
      style={{ padding: "0" }}
      actions={[
        <Button
          type="primary"
          style={{ backgroundColor: "#5aac44" }}
          onClick={() => {
            handleSaveExDate(card, time, date, timer);
          }}
        >
          Lưu
        </Button>,
        <Button
          type="primary"
          danger
          onClick={() => {
            handleDeleteExDate(card);
          }}
        >
          Hủy bỏ
        </Button>,
      ]}
    >
      <div>
        <Space>
          <div>
            <h4>Ngày</h4>
            <PickerWithType type={"date"} onChange={handleDate} />
          </div>
          <div>
            <h4>Thời gian</h4>
            <PickerWithType type={"time"} onChange={handleTime} />
          </div>
        </Space>
        <div style={{ marginTop: "2vh" }}>
          <h4>Thiết lập nhắc nhở</h4>
          <Select
            defaultValue="none"
            style={{ width: "100%" }}
            onChange={handleTimer}
          >
            <Option value="none">Không có</Option>
            <Option value="5minutes">5 phút trước</Option>
            <Option value="30minutes">30 phút trước</Option>
            <Option value="1hour">1 giờ trước</Option>
            <Option value="1day">1 ngày trước</Option>
          </Select>
        </div>
      </div>
    </Card>
  );
}

export default ExpirationDateForm;
