import React from "react";
import { Button, Dropdown, Popover } from "antd";
import {
  ArrowRightOutlined,
  CopyOutlined,
  SaveOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import MoveCardForm from "./MoveCardForm";
import CloneCardForm from "./CloneCardForm";
import { useSelector, useDispatch } from "react-redux";
import {
  saveCardRequest,
  unSaveCardRequest,
} from "../../../redux/actions/board";
import { useEffect } from "react";
import CloneCardContainer from "../../../containers/Manipulation/CloneCardContainer";
import MoveCardContainer from "../../../containers/Manipulation/MoveCardContainer";

const styleButton = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "90%",
  marginBottom: "1vh",
};

function Manipulation(props) {
  const { card } = props;
  //   const board = useSelector((state) => state.board);
  //   const dispatch = useDispatch();
  //   var indexList;
  //   var indexCard;
  //   const handleSave = () => {
  //     const newCard = { ...card };
  //     newCard.saved = true;
  //     dispatch(saveCardRequest(indexList, indexCard, newCard));
  //   };

  //   const handleUnSave = () => {
  //     const newCard = { ...card };
  //     newCard.saved = false;
  //     dispatch(unSaveCardRequest(indexList, indexCard, newCard));
  //   };

  //   useEffect(() => {
  //     board.forEach((e, index) => {
  //       const fil = e.task.filter((item) => {
  //         return item.id === card.id;
  //       });
  //       e.task.forEach((el, indx) => {
  //         if (el.id === card.id) {
  //           indexCard = indx;
  //         }
  //       });
  //       if (fil.length > 0) {
  //         indexList = index;
  //       }
  //     });
  //   }, []);

  return (
    <div>
      <h3>Thao tác</h3>
      <div>
        <Dropdown
          overlay={<MoveCardContainer />}
          trigger="click"
          placement="topRight"
        >
          <Button style={styleButton}>
            <ArrowRightOutlined />
            Di chuyển
          </Button>
        </Dropdown>
        <Dropdown
          overlay={<CloneCardContainer />}
          placement="topRight"
          trigger="click"
          style={{ padding: 0 }}
        >
          <Button style={styleButton}>
            <CopyOutlined />
            Sao chép
          </Button>
        </Dropdown>
        {/* {card.saved === true ? (
          <div>
            <Button style={styleButton} onClick={handleUnSave}>
              <UndoOutlined />
              Gửi tới bảng
            </Button>
          </div>
        ) : (
          <Button style={styleButton} onClick={handleSave}>
            <SaveOutlined />
            Lưu trữ
          </Button>
        )} */}
      </div>
    </div>
  );
}

export default Manipulation;
