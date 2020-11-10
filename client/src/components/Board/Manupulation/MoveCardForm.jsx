import React, { useState } from "react";
import { Card, Select, Button, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { moveCardRequest } from "../../../redux/actions/board";

const { Item } = Form;
const { Option } = Select;

function MoveCardForm(props) {
  const { card } = props;
  const [idList, setIdList] = useState();
  const board = useSelector((state) => state.board);
  const dispatch = useDispatch();
  var now;
  var indexList;
  var indexCard;

  board.forEach((e, index) => {
    const fil = e.task.filter((item) => {
      return item.id === card.id;
    });
    e.task.forEach((el, indx) => {
      if (el.id === card.id) {
        indexCard = indx;
      }
    });
    if (fil.length > 0) {
      now = e;
      indexList = index;
    }
  });

  function handleChange(value) {
    board.forEach((e) => {
      if (e.status === value) {
        setIdList(e.id);
      }
    });
  }

  const handleMoveCard = () => {
    if (typeof idList === "undefined") {
      dispatch(moveCardRequest(indexList, indexCard, card, now.id));
    } else dispatch(moveCardRequest(indexList, indexCard, card, idList));
  };

  return (
    <Card bordered={false} size="small" title={<h4>Chọn đích đến</h4>}>
      <Form>
        <Item>
          <div>
            <p>Danh sách</p>
            <Select
              defaultValue={now.status}
              style={{ width: 120 }}
              onChange={handleChange}
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
          <Button type="primary" onClick={handleMoveCard}>
            Di chuyển
          </Button>
        </Item>
      </Form>
    </Card>
  );
}

export default MoveCardForm;
