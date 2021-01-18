import React, { useEffect, useState } from "react";
import { DatePicker, TimePicker, Space, Card, Select, Button } from "antd";
import PropTypes from "prop-types";
import moment from "moment";

DeadlineForm.propTypes = {
  card: PropTypes.object,
  handleDeleteExDate: PropTypes.func,
  handleSaveDeadline: PropTypes.func,
};

const { Option } = Select;
const dateFormat = "YYYY-MM-DD";
const timeFormat = "HH:mm";

function PickerWithType({ value, type, onChange }) {
  if (type === "time")
    return <TimePicker onChange={onChange} format={timeFormat} value={value} />;
  if (type === "date")
    return <DatePicker onChange={onChange} format={dateFormat} value={value} />;
  return <DatePicker picker={type} onChange={onChange} />;
}

function DeadlineForm(props) {
  const { card, handleDeleteExDate, handleSaveDeadline } = props;
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const [timer, setTimer] = useState();
  const now = moment(new Date()).format();

  const handleTime = (value) => {
    setTime(moment(value._d).format("HH:mm:ss"));
  };

  const handleDate = (value) => {
    setDate(moment(value._d).format("YYYY-MM-DD"));
  };

  const handleTimer = (value) => {
    let valueTimer;
    if (value === "5minutes") {
      valueTimer = 5 * 60 * 1000;
    }
    if (value === "30minutes") {
      valueTimer = 30 * 60 * 1000;
    }
    if (value === "1hour") {
      valueTimer = 60 * 60 * 1000;
    }
    if (value === "12hours") {
      valueTimer = 12 * 60 * 60 * 1000;
    }
    if (value === "1day") {
      valueTimer = 24 * 60 * 60 * 1000;
    }
    if (value === "2days") {
      valueTimer = 2 * 24 * 60 * 60 * 1000;
    }
    if (value === "none") {
      valueTimer = 0;
    }
    setTimer(valueTimer);
  };

  const handleValueTimer = (timer) => {
    switch (timer) {
      case 5 * 60 * 1000:
        return "5minutes";
      case 30 * 60 * 1000:
        return "30minutes";
      case 60 * 60 * 1000:
        return "1hour";
      case 12 * 60 * 60 * 1000:
        return "12hours";
      case 24 * 60 * 60 * 1000:
        return "1day";
      case 2 * 24 * 60 * 60 * 1000:
        return "2days";
      default:
        return "none";
    }
  };

  useEffect(() => {
    if (card.deadline) {
      setDate(moment(card.deadline).format(dateFormat));
      setTime(moment(card.deadline).format(timeFormat));
    } else {
      setDate(moment(now).format(dateFormat));
      setTime(moment(now).format(timeFormat));
    }
    setTimer(card.timer || 0);
  }, [card.deadline, card.timer]);

  return (
    <Card
      size="small"
      title={<h4 style={{ textAlign: "center" }}>Sửa ngày hết hạn</h4>}
      bordered={false}
      style={{ padding: "0", boxShadow: "0 0 2px 2px rgba(0,0,0,0.2)" }}
      actions={[
        <Button
          type="primary"
          style={{ backgroundColor: "#5aac44", border: "none" }}
          onClick={() => {
            handleSaveDeadline(card, time, date, timer);
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
          Loại bỏ
        </Button>,
      ]}
    >
      <div>
        <Space>
          <div>
            <h4>Ngày</h4>
            {date ? (
              <PickerWithType
                type={"date"}
                onChange={handleDate}
                value={moment(date, dateFormat)}
              />
            ) : null}
          </div>
          <div>
            <h4>Thời gian</h4>
            {time ? (
              <PickerWithType
                type={"time"}
                onChange={handleTime}
                value={moment(time, timeFormat)}
              />
            ) : null}
          </div>
        </Space>
        <div style={{ marginTop: "2vh" }}>
          <h4>Thiết lập nhắc nhở</h4>
          {timer ? (
            <Select
              value={handleValueTimer(timer)}
              style={{ width: "100%" }}
              onChange={handleTimer}
            >
              <Option value="none">Không có</Option>
              <Option value="5minutes">5 phút trước</Option>
              <Option value="30minutes">30 phút trước</Option>
              <Option value="1hour">1 giờ trước</Option>
              <Option value="12hour">12 giờ trước</Option>
              <Option value="1day">1 ngày trước</Option>
              <Option value="2day">2 ngày trước</Option>
            </Select>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

export default DeadlineForm;
