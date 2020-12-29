import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../components/Board/Board";
import { updateDataRequest } from "../redux/actions/board";
import { cloneDeep } from "lodash";
import { Draggable } from "react-beautiful-dnd";
import ListContainer from "./ListContainer";
import { createList } from "../api/lists";
import { useRouteMatch } from "react-router-dom";
import { message } from "antd";
import { getBoardDetailReq } from "../redux/actions/boards";

function BoardContainer(props) {
  const detailBoardReducer = useSelector((state) => state.detailBoardReducer);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const reorderSameList = (dataBoard, destination, source) => {
    let arr = dataBoard.filter((item) => item.id === destination.droppableId);
    const task = reorder(arr[0].task, source.index, destination.index);
    const res = { ...arr[0], task };
    var kanbann = cloneDeep(dataBoard);
    dataBoard.forEach((e, index) => {
      if (e.id === res.id) {
        kanbann[index] = res;
      }
    });
    return kanbann;
  };

  const reorderDifferentList = (dataBoard, destination, source) => {
    let arrSource = dataBoard.filter((item) => item.id === source.droppableId);
    let arrDestination = dataBoard.filter(
      (item) => item.id === destination.droppableId
    );
    let arrGet = arrSource[0].task.slice(source.index, source.index + 1);
    arrSource[0].task.splice(source.index, 1);
    arrDestination[0].task.splice(destination.index, 0, arrGet[0]);
  };

  const onDragEnd = (result, data) => {
    const { destination, source, reason } = result;
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
        dispatch(updateDataRequest(res));
        break;
      }
      case source.droppableId: {
        let dataBoard = reorderSameList(data, destination, source);
        dispatch(updateDataRequest(dataBoard));
        break;
      }
      default: {
        reorderDifferentList(data, destination, source);
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
                  <ListContainer
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
    createList(match.params.id, { title: title })
      .then((res) => {
        if (res.status === 200) {
          message.success("Tạo danh sách thành công");
          dispatch(getBoardDetailReq(match.params.id));
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
        detailBoardReducer={detailBoardReducer}
        onDragEnd={onDragEnd}
        renderBoard={renderBoard}
        handleAddList={handleAddList}
      />
    </React.Fragment>
  );
}

export default BoardContainer;
