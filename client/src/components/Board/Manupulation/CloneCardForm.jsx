import React, { useState, useEffect } from "react";
import { Card, Input, Checkbox, Select, Button, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import "./CloneCardForm.css";
import { cloneDeep, findIndex } from "lodash";

const { Option } = Select;
const { Item } = Form;

function CloneCardForm(props) {
  const { card, lists, handleCloneCard } = props;
  const [formClone] = Form.useForm();
  let [stateList, setStateList] = useState();

  const handleFinish = (value) => {
    let cloneCard = cloneDeep(card);
    let { description, keep, list, position } = value;
    let oldList;
    let dataCloneCard = {
      title: cloneCard.title,
      background:
        cloneCard.background.length === 0 ? "" : cloneCard.background._id,
    };
    lists.forEach((list) => {
      const filList = list.cards.filter((cardFilter) => {
        return cardFilter._id === card._id;
      });

      if (filList.length > 0) {
        oldList = list;
      }
    });
    if (cloneCard.deadline) {
      dataCloneCard.deadline = cloneCard.deadline;
    }
    if (description.length > 0) {
      dataCloneCard.description = description;
    }
    if (keep) {
      if (keep.includes("labels")) {
        dataCloneCard.labels = cloneCard.labels.map((label) => {
          return label._id;
        });
      }
      if (keep.includes("files")) {
        dataCloneCard.files = cloneCard.files.map((file) => {
          return file._id;
        });
      }
      if (keep.includes("members")) {
        dataCloneCard.members = cloneCard.members.map((member) => {
          return member._id;
        });
      }
    }
    handleCloneCard(list, position, dataCloneCard, oldList);
  };
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
      formClone.setFieldsValue({
        description: card.description,
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
      className="duplicate-card"
      bordered={false}
      size="small"
      title={<h3 style={{ textAlign: "center" }}>Sao chép thẻ</h3>}
      style={{ minWidth: "20vw", boxShadow: "0 0 2px 2px rgba(0,0,0,0.2)" }}
      bodyStyle={{ paddingBottom: 0 }}
    >
      <Form form={formClone} onFinish={handleFinish}>
        <div>
          <h4>Tiêu đề</h4>
          <Item name="description">
            <Input.TextArea rows={3} defaultValue={card.content} />
          </Item>
        </div>
        {card.labels.length > 0 ||
        card.members.length > 0 ||
        card.files.length > 0 ? (
          <div>
            <h4>Giữ</h4>
            <Item name="keep">
              <Checkbox.Group style={{ width: "100%" }}>
                {card.labels && card.labels.length > 0 ? (
                  <div>
                    <Checkbox value="labels">Nhãn</Checkbox>
                  </div>
                ) : null}
                {card.members && card.members.length > 0 ? (
                  <div>
                    <Checkbox value="members">Thành viên</Checkbox>
                  </div>
                ) : null}
                {card.files && card.files.length > 0 ? (
                  <div>
                    <Checkbox value="files">Tập tin đính kèm</Checkbox>
                  </div>
                ) : null}
              </Checkbox.Group>
            </Item>
          </div>
        ) : null}
        <h4>Sao chép tới</h4>
        {stateList ? (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
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
        <Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#4caf50",
              width: "100%",
              border: "none",
            }}
          >
            Sao chép thẻ
          </Button>
        </Item>
      </Form>
    </Card>
  );
}

export default CloneCardForm;
