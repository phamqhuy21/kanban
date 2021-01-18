import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../components/Board/Board";
import { cloneDeep } from "lodash";
import { Draggable } from "react-beautiful-dnd";
import ListTasksContainer from "./ListTasksContainer";
import { createList, updatePositionCards } from "../api/lists";
import { useRouteMatch } from "react-router-dom";
import { message } from "antd";
import { getBoardDetailReq, updateBoardRequest } from "../redux/actions/boards";
import { updateBoard } from "../api/boards";
import { createAction } from "../api/action";

function BoardContainer(props) {
  const listTasksReducer = useSelector((state) => state.listTasksReducer);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const reorderSameList = (dataBoard, destination, source) => {
    let cloneDataBoard = cloneDeep(dataBoard);
    cloneDataBoard = cloneDataBoard.map((list) => {
      if (list._id === destination.droppableId) {
        let cards = reorder(list.cards, source.index, destination.index);
        return { ...list, cards };
      } else return list;
    });
    return cloneDataBoard;
  };

  const reorderDifferentList = (dataBoard, destination, source) => {
    let cloneDataBoard = cloneDeep(dataBoard);
    let arrSource = cloneDataBoard.filter(
      (listTask) => listTask._id === source.droppableId
    );
    let arrDestination = cloneDataBoard.filter(
      (listTask) => listTask._id === destination.droppableId
    );
    let arrGet = arrSource[0].cards.slice(source.index, source.index + 1);
    arrSource[0].cards.splice(source.index, 1);
    arrDestination[0].cards.splice(destination.index, 0, arrGet[0]);
    return {
      source: arrSource[0].cards,
      destination: arrDestination[0].cards,
      data: cloneDataBoard,
    };
  };

  const onDragEnd = (result, data) => {
    const { destination, source, reason, draggableId } = result;
    let boardId = match.params.id;
    if (!destination || reason === "CANCEL") {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    switch (destination.droppableId) {
      case "board": {
        const res = reorder(data, source.index, destination.index);
        let dataReq = res.map((list) => list._id);
        dispatch(updateBoardRequest(res));
        updateBoard(boardId, { lists: dataReq })
          .then((res) => {
            if (res.status === 200) {
              message.success("Cập nhật vị trí danh sách thành công");
              createAction({
                boardId,
                data: {
                  action: `cập nhật vị trí danh sách trong bảng`,
                },
              }).then((res) => {
                if (res.status === 200) {
                  dispatch(getBoardDetailReq(boardId));
                }
              });
            } else message.error("Cập nhật vị trí danh sách thất bại");
          })
          .catch((err) => {
            if (err.response) {
              message.error(err.response.data.message);
            } else message.error("Cập nhật vị trí danh sách thất bại");
          });
        break;
      }
      case source.droppableId: {
        let listOrder = listTasksReducer.filter((list) => {
          return list._id === source.droppableId;
        })[0];
        let res = reorderSameList(data, destination, source);
        let listId = destination.droppableId;
        let dataReq = {
          boardId,
          listId,
          data: {
            list: {
              cards: res
                .filter((list) => list._id === listId)[0]
                .cards.map((card) => card._id),
            },
          },
        };
        dispatch(updateBoardRequest(res));
        updatePositionCards(dataReq)
          .then((res) => {
            if (res.status === 200) {
              message.success("Cập nhật vị trí thẻ nhiệm vụ thành công");
              createAction({
                boardId,
                data: {
                  action: `cập nhật vị trí thẻ trong danh sách ${listOrder.title}`,
                },
              }).then((res) => {
                if (res.status === 200) {
                  dispatch(getBoardDetailReq(boardId));
                }
              });
            } else message.error("Cập nhật vị trí thẻ nhiệm vụ thất bại");
          })
          .catch((err) => {
            if (err.response) {
              message.error(err.response.data.message);
            } else message.error("Cập nhật vị trí thẻ nhiệm vụ thất bại");
          });
        break;
      }
      default: {
        let listOrderSource = listTasksReducer.filter((list) => {
          return list._id === source.droppableId;
        })[0];
        let cardOrder = listOrderSource.cards.filter((card) => {
          return card._id === draggableId;
        })[0];
        let listOrderDestination = listTasksReducer.filter((list) => {
          return list._id === destination.droppableId;
        })[0];
        let res = reorderDifferentList(data, destination, source);
        let listSourceId = source.droppableId;
        let listDestinationId = destination.droppableId;
        let dataReq = {
          boardId,
          listSourceId,
          listDestinationId,
          data: {
            listCardsSource: {
              cards: res.source.map((card) => card._id),
            },
            listCardsDestination: {
              cards: res.destination.map((card) => card._id),
            },
          },
        };
        dispatch(updateBoardRequest(res.data));
        updatePositionCards(dataReq)
          .then((res) => {
            if (res.status === 200) {
              message.success("Cập nhật vị trí thẻ nhiệm vụ thành công");
              createAction({
                boardId,
                data: {
                  action: `di chuyển thẻ ${cardOrder.title} từ danh sách ${listOrderSource.title} đến danh sách ${listOrderDestination.title}`,
                },
              }).then((res) => {
                if (res.status === 200) {
                  dispatch(getBoardDetailReq(boardId));
                }
              });
            } else message.error("Cập nhật vị trí thẻ nhiệm vụ thất bại");
          })
          .catch((err) => {
            if (err.response) {
              message.error(err.response.data.message);
            } else message.error("Cập nhật vị trí thẻ nhiệm vụ thất bại");
          });
        break;
      }
    }
  };

  const renderBoard = (lists) => {
    if (lists.length > 0) {
      return lists.map((list, index) => {
        if (list) {
          return (
            <Draggable key={list._id} draggableId={list._id} index={index}>
              {(provided, snapshot) => {
                return (
                  <ListTasksContainer
                    innerRef={provided.innerRef}
                    provided={provided}
                    snapshot={snapshot}
                    list={list}
                    index={index}
                  />
                );
              }}
            </Draggable>
          );
        } else return null;
      });
    }
  };

  const handleAddList = (title) => {
    let boardId = match.params.id;
    createList(boardId, { title: title })
      .then((res) => {
        if (res.status === 200) {
          message.success("Tạo danh sách thành công");
          dispatch(getBoardDetailReq(boardId));
          createAction({
            boardId,
            data: {
              action: `tạo mới danh sách ${title}`,
            },
          }).then((res) => {
            if (res.status === 200) {
              dispatch(getBoardDetailReq(boardId));
            }
          });
        } else message.error("Tạo danh sách thất bại");
      })
      .catch((err) => {
        if (err.response) {
          message.error(err.response.data.message);
        } else message.error("Tạo danh sách thất bại");
      });
  };

  return (
    <React.Fragment>
      <Board
        listTasksReducer={listTasksReducer}
        onDragEnd={onDragEnd}
        renderBoard={renderBoard}
        handleAddList={handleAddList}
      />
    </React.Fragment>
  );
}

export default BoardContainer;
