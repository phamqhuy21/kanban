import React, { useEffect, useState } from "react";
import { Card, Select, Button, Form } from "antd";
import { findIndex } from "lodash";

const { Item } = Form;
const { Option } = Select;

function MoveCardForm(props) {
  const { lists, card, handleMoveCard } = props;
  const [formMove] = Form.useForm();
  let [stateList, setStateList] = useState();

  const handleChangeList = (listId) => {
    let listsClone = lists.filter((list) => list._id === listId);
    setStateList(listsClone[0]);
  };

  const renderPosition = () => {
    let result = [];
    let countPosition = stateList.cards.length + 1;
    for (let i = 0; i < countPosition; i++) {
      result.push(
        <Option key={i} value={i}>
          {i + 1}
        </Option>
      );
    }
    return result;
  };

  const onFinish = (value) => {
    console.log(value);
    handleMoveCard(value, lists, card);
  };

  useEffect(() => {
    lists.forEach((list) => {
      const filList = list.cards.filter((cardFilter) => {
        return cardFilter._id === card._id;
      });

      if (filList.length > 0) {
        setStateList(list);
      }
    });
  }, [card]);

  useEffect(() => {
    if (stateList) {
      let indexCard = findIndex(stateList.cards, (cardFind) => {
        return cardFind._id === card._id;
      });
      formMove.setFieldsValue({
        list: stateList._id,
        position:
          indexCard !== -1
            ? indexCard + 1
            : stateList.cards.length > 0
            ? stateList.cards.length
            : 0,
        keep: [],
      });
    }
  }, [stateList]);

  return (
    <Card
      bordered={false}
      size="small"
      title={<h3 style={{ textAlign: "center" }}>Chọn đích đến</h3>}
      headStyle={{ paddind: 0 }}
      style={{ boxShadow: "0 0 2px 2px rgba(0,0,0,0.2)" }}
    >
      <Form form={formMove} onFinish={onFinish}>
        {stateList ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <div style={{ marginRight: "10px" }}>
              <p>Danh sách</p>
              <Item name="list">
                <Select style={{ width: 120 }} onChange={handleChangeList}>
                  {lists.map((list, index) => {
                    return (
                      <Option key={index} value={list._id}>
                        {list.title}
                      </Option>
                    );
                  })}
                </Select>
              </Item>
            </div>
            <div>
              <p>Vị trí</p>
              <Item name="position">
                <Select style={{ width: 120 }}>{renderPosition()}</Select>
              </Item>
            </div>
          </div>
        ) : null}
        <Item style={{ marginBottom: 0 }}>
          <Button
            type="primary"
            style={{
              backgroundColor: "#4caf50",
              width: "100%",
              border: "none",
            }}
            htmlType="submit"
          >
            Di chuyển
          </Button>
        </Item>
      </Form>
    </Card>
  );
}

export default MoveCardForm;
