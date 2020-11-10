import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../components/Board/Board";
import { addListRequest, updateDataRequest } from "../redux/actions/board";
import {
  addDeleteStatusRequest,
  addLoseStatusRequest,
  addMoveStatusRequest,
  addWinStatusRequest,
} from "../redux/actions/statusCard";
import { cloneDeep } from "lodash";
import { Draggable } from "react-beautiful-dnd";
import ListContainer from "./ListContainer";

function BoardContainer(props) {
  const data = useSelector((state) => state.board);
  const dispatch = useDispatch();

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

  const handleStatusCard = (source, addStatusRequest) => {
    let dataBoard = cloneDeep(data);
    let arrSource = dataBoard.filter((item) => item.id === source.droppableId);
    let cardStatus = arrSource[0].task.splice(source.index, source.index + 1);
    dispatch(addStatusRequest(cardStatus[0]));
    dispatch(updateDataRequest(dataBoard));
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
    document.getElementById("statusCard").style.visibility = "hidden";
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
      case "win": {
        handleStatusCard(source, addWinStatusRequest);
        break;
      }
      case "lose": {
        handleStatusCard(source, addLoseStatusRequest);
        break;
      }
      case "move_to": {
        handleStatusCard(source, addMoveStatusRequest);
        break;
      }
      case "delete": {
        handleStatusCard(source, addDeleteStatusRequest);
        break;
      }
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

  const onDragStart = () => {
    document.getElementById("statusCard").style.visibility = "visible";
  };

  const renderBoard = (dataBoard) => {
    if (dataBoard) {
      return dataBoard.map((item, index) => {
        if (item) {
          return (
            <Draggable
              key={item.id}
              draggableId={String(item.id)}
              index={index}
            >
              {(provided, snapshot) => {
                return (
                  <ListContainer
                    innerRef={provided.innerRef}
                    provided={provided}
                    snapshot={snapshot}
                    list={item}
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

  const handleAddList = (status) => {
    dispatch(addListRequest(status));
  };

  return (
    <React.Fragment>
      <Board
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        renderBoard={renderBoard}
        handleAddList={handleAddList}
      />
    </React.Fragment>
  );
}

export default BoardContainer;
