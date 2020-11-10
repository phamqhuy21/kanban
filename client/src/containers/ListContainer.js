import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Lists from "../components/Board/List/List";
import {
  addCartRequest,
  deleteCartRequest,
  deleteListRequest,
  editCartRequest,
  editListRequest,
} from "../redux/actions/board";

ListContainer.propTypes = {
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

function ListContainer(props) {
  const { innerRef, list, provided, snapshot, index } = props;
  const [visiblePopover, setVisiblePopover] = useState(false);
  const [visibleFormEditList, setVisibleFormEdit] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const dispatch = useDispatch();
  const { dragHandleProps } = provided;

  const openFormCard = () => {
    setOpenForm(true);
  };

  const handleAddCard = (value) => {
    dispatch(addCartRequest(value, list.id));
    setOpenForm(false);
  };

  const handleDeleteCard = (indexCart) => {
    dispatch(deleteCartRequest(index, indexCart));
  };

  const handleEditCard = (indexCart, cart) => {
    dispatch(
      editCartRequest(index, indexCart, {
        id: `${list.key}${list.task.length + 1}`,
        content: cart,
        description: "",
        comment: [],
        label: [],
        exDate: {},
        member: [],
        groundImage: "",
        file: [],
        saved: false,
        action: [],
      })
    );
  };

  const handleDeleteList = () => {
    dispatch(deleteListRequest(index));
  };

  const openFormEditList = () => {
    setVisibleFormEdit(true);
    setVisiblePopover(false);
  };

  const handleEditList = (index, status) => {
    dispatch(editListRequest(index, status));
  };

  const handlePopoverVisibleChange = (visible) => {
    setVisiblePopover(visible);
  };

  return (
    <Lists
      innerRef={innerRef}
      provided={provided}
      snapshot={snapshot}
      list={list}
      index={index}
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

export default ListContainer;
