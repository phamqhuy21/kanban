import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import ListTasks from "../components/Board/List/ListTasks";
import {
  addCardRequest,
  deleteCardRequest,
  deleteListRequest,
  editCardRequest,
  editListRequest,
} from "../redux/actions/board";
import { deleteList, updateList } from "../api/lists";
import { useRouteMatch } from "react-router-dom";
import { message, Modal } from "antd";
import { getBoardDetailReq } from "../redux/actions/boards";
import {
  createCardTask,
  deleteCardTask,
  updateCardTask,
} from "../api/cardTask";
import { createAction } from "../api/action";

ListTasksContainer.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    task: PropTypes.arrayOf(PropTypes.object),
  }),
  index: PropTypes.number,
  innerRef: PropTypes.func,
  provided: PropTypes.object,
  snapshot: PropTypes.object,
};

function ListTasksContainer(props) {
  const { innerRef, list, provided, snapshot } = props;
  const [visiblePopover, setVisiblePopover] = useState(false);
  const [visibleFormEditList, setVisibleFormEdit] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const match = useRouteMatch();

  const dispatch = useDispatch();
  const { dragHandleProps } = provided;

  const openFormCard = () => {
    setOpenForm(true);
  };

  const handleAddCard = (value) => {
    let boardId = match.params.id;
    let listId = list._id;
    let dataReq = {
      boardId,
      listId,
      data: { title: value },
    };
    createCardTask(dataReq)
      .then((res) => {
        if (res.status === 200) {
          message.success(`Thêm thẻ nhiệm vụ ${value} thành công`);
          dispatch(addCardRequest(res.data.data, listId));
          createAction({
            boardId,
            data: {
              action: `thêm thẻ nhiệm vụ ${value}`,
            },
          }).then((res) => {
            if (res.status === 200) {
              dispatch(getBoardDetailReq(boardId));
            }
          });
        } else {
          message.error(`Thêm thẻ nhiệm vụ ${value} thất bại`);
        }
      })
      .catch((err) => {
        if (err.response) {
          message.error(err.response.data.message);
        } else message.error(`Thêm thẻ nhiệm vụ ${value} thất bại`);
      });
    setOpenForm(false);
  };

  const handleDeleteCard = (card) => {
    let cardId = card._id;
    let boardId = match.params.id;
    let listId = list._id;
    deleteCardTask(cardId, {
      boardId,
      listId,
    })
      .then((res) => {
        if (res.status === 200) {
          message.success(`Xóa thẻ nhiệm vụ ${card.title} thành công`);
          dispatch(getBoardDetailReq(boardId));
          createAction({
            boardId,
            data: {
              action: `xóa thẻ nhiệm vụ ${card.title}`,
            },
          }).then((res) => {
            if (res.status === 200) {
              dispatch(getBoardDetailReq(boardId));
            }
          });
          //   dispatch(deleteCardRequest(listId, cardId));
        } else {
          message.error(`Xóa thẻ nhiệm vụ ${card.title} thất bại`);
        }
      })
      .catch((err) => {
        if (err.response) {
          message.error(err.response.data.message);
        } else message.error(`Xóa thẻ nhiệm vụ ${card.title} thất bại`);
      });
  };

  const handleEditCard = (card, title) => {
    let boardId = match.params.id;
    let cardId = card._id;
    let dataReq = {
      boardId,
      cardId,
      data: {
        title,
      },
    };
    updateCardTask(dataReq)
      .then((res) => {
        if (res.status === 200) {
          message.success(`Cập nhật thẻ nhiệm vụ ${card.title} thành công`);
          createAction({
            boardId,
            data: {
              action: `cập nhật thẻ nhiệm vụ ${card.title}`,
            },
          }).then((res) => {
            if (res.status === 200) {
              dispatch(getBoardDetailReq(boardId));
            }
          });
          dispatch(getBoardDetailReq(boardId));
          //   dispatch(editCardRequest(list._id, cardId, { title }));
        } else {
          message.error(`Cập nhật thẻ nhiệm vụ ${card.title} thất bại`);
        }
      })
      .catch((err) => {
        if (err.response) {
          message.error(err.response.data.message);
        } else message.error(`Cập nhật thẻ nhiệm vụ ${card.title} thất bại`);
      });
  };

  const handleDeleteList = () => {
    setVisiblePopover(false);
    Modal.confirm({
      title: `Xóa danh sách ${list.title} khỏi bảng`,
      content: "Bạn có chắc chắn muốn xóa không ?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Không",
      onOk: async () => {
        let boardId = match.params.id;
        let listId = list._id;
        deleteList(boardId, listId)
          .then((res) => {
            if (res.status === 200) {
              message.success("Xóa danh sách thành công");
              dispatch(getBoardDetailReq(boardId));
            } else message.error("Xóa danh sách thất bại");
          })
          .catch((err) => {
            message.error("Xóa danh sách thất bại");
          });
      },
    });
  };

  const openFormEditList = () => {
    setVisibleFormEdit(true);
    setVisiblePopover(false);
  };

  const handleEditList = (listId, title) => {
    let boardId = match.params.id;
    let dataReq = {
      boardId,
      listId,
      data: {
        title,
      },
    };
    updateList(dataReq)
      .then((res) => {
        if (res.status === 200) {
          message.success("Cập nhật danh sách thành công");
          dispatch(editListRequest(listId, title));
          //   dispatch(getBoardDetailReq(boardId));
        } else message.error("Cập nhật danh sách thất bại");
      })
      .catch((err) => {
        message.error("Cập nhật danh sách thất bại");
      });
  };

  const handlePopoverVisibleChange = (visible) => {
    setVisiblePopover(visible);
  };

  return (
    <ListTasks
      innerRef={innerRef}
      provided={provided}
      snapshot={snapshot}
      list={list}
      dragHandleProps={dragHandleProps}
      visiblePopover={visiblePopover}
      handlePopoverVisibleChange={handlePopoverVisibleChange}
      handleDeleteList={handleDeleteList}
      openFormEditList={openFormEditList}
      handleDeleteCard={handleDeleteCard}
      handleEditCard={handleEditCard}
      handleAddCard={handleAddCard}
      openFormCard={openFormCard}
      handleEditList={handleEditList}
      setVisibleFormEdit={setVisibleFormEdit}
      visibleFormEditList={visibleFormEditList}
      openForm={openForm}
      setOpenForm={setOpenForm}
    />
  );
}

export default ListTasksContainer;
