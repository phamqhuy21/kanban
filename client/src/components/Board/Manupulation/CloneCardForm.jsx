import React, { useState, useEffect } from "react";
import { Card, Input, Checkbox, Select, Button, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { cloneCardRequest } from "../../../redux/actions/board";

const { Option } = Select;
const { Item } = Form;

function CloneCardForm(props) {
  const { card } = props;
  const [idList, setIdList] = useState();
  const [checkedValues, setCheckedValues] = useState();
  const [formClone] = Form.useForm();
  const board = useSelector((state) => state.board);
  const dispatch = useDispatch();
  var now;

  board.forEach((e) => {
    const fil = e.task.filter((item) => {
      return item.id === card.id;
    });

    if (fil.length > 0) {
      now = e;
    }
  });

  function handleChecked(checkedValues) {
    setCheckedValues(checkedValues);
  }

  const handleSelected = (value) => {
    board.forEach((e) => {
      if (e.status === value) {
        setIdList(e.id);
      }
    });
  };

  const handleCloneCard = () => {
    var newCard = { ...card };
    formClone.validateFields().then((value) => {
      newCard.content = value.title;
    });
    if (checkedValues) {
      checkedValues.forEach((e) => {
        if (e === "label") {
          newCard.label = [];
        }
        if (e === "member") {
          newCard.member = [];
        }
        if (e === "comment") {
          newCard.comment = [];
        }
        if (e === "file") {
          newCard.file = [];
        }
      });
    }
    if (typeof idList === "undefined") {
      dispatch(cloneCardRequest(newCard, now.id));
    } else dispatch(cloneCardRequest(newCard, idList));
  };

  useEffect(() => {
    formClone.setFieldsValue({
      title: card.content,
    });
  });

  console.log("huhu");

  return (
    <Card bordered={false} size="small" title={<h3>Sao chép thẻ</h3>}>
      <Form form={formClone}>
        <Item name="title">
          <div>
            <h4>Tiêu đề</h4>
            <Input.TextArea rows={3} defaultValue={card.content} />
          </div>
        </Item>
        <Item>
          <div>
            <h4>Giữ</h4>
            <Checkbox.Group style={{ width: "100%" }} onChange={handleChecked}>
              <div>
                <Checkbox value="label">Nhãn</Checkbox>
              </div>
              <div>
                <Checkbox value="member">Thành viên</Checkbox>
              </div>
              <div>
                <Checkbox value="file">Tập tin đính kèm</Checkbox>
              </div>
              <div>
                <Checkbox value="comment">Bình luận</Checkbox>
              </div>
            </Checkbox.Group>
          </div>
        </Item>
        <Item>
          <div>
            <h4>Sao chép tới</h4>
            <p>Danh sách</p>
            <Select
              defaultValue={now.status}
              style={{ width: 120 }}
              onChange={handleSelected}
            >
              {board.map((list, index) => {
                return (
                  <Option key={index} value={list.status}>
                    {list.status}
                  </Option>
                );
              })}
            </Select>
          </div>
        </Item>
        <Item>
          <Button type="primary" onClick={handleCloneCard}>
            Tạo thẻ
          </Button>
        </Item>
      </Form>
    </Card>
  );
}

export default CloneCardForm;
