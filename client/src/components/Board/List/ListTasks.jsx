import React from "react";
import PropTypes from "prop-types";
import { List, Card, Popover } from "antd";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Droppable } from "react-beautiful-dnd";
import FormAddCard from "../Card/FormAddCard";
import FormEditList from "./FormEditList";
import CardContainer from "../../../containers/CardContainer";

ListTasks.propTypes = {
  provided: PropTypes.shape({
    draggableProps: PropTypes.shape({
      style: PropTypes.object,
    }),
  }),
  innerRef: PropTypes.func,
  snapshot: PropTypes.shape({
    isDragging: PropTypes.bool,
  }),
  list: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    task: PropTypes.object,
  }),
  dragHandleProps: PropTypes.object,
  visiblePopover: PropTypes.bool,
  handlePopoverVisibleChange: PropTypes.func,
  handleDeleteList: PropTypes.func,
  openFormEditList: PropTypes.func,
  handleDeleteCard: PropTypes.func,
  handleEditCard: PropTypes.func,
  handleAddCard: PropTypes.func,
  openFormCard: PropTypes.func,
  index: PropTypes.number,
  handleEditList: PropTypes.func,
  setVisibleFormEdit: PropTypes.func,
  visibleFormEditList: PropTypes.bool,
  openForm: PropTypes.bool,
  setOpenForm: PropTypes.func,
};

const style = {
  listStyle: {
    backgroundColor: "#eeeeee",
    borderRadius: "0.2rem",
    padding: "0 0.5vw",
  },
};

const getStyle = (isDragging, style) => ({
  ...style,
  flex: "0 0 auto",
  width: "300px",
  margin: "5px",

  backgroundColor: "none",
  fontWeight: "bold",
  fontFamily:
    "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif",
});

function ListTasks(props) {
  const {
    provided,
    innerRef,
    snapshot,
    list,
    dragHandleProps,
    visiblePopover,
    handlePopoverVisibleChange,
    handleDeleteList,
    openFormEditList,
    handleDeleteCard,
    handleEditCard,
    handleAddCard,
    openFormCard,
    handleEditList,
    setVisibleFormEdit,
    visibleFormEditList,
    openForm,
    setOpenForm,
  } = props;

  return (
    <div
      {...provided.draggableProps}
      ref={innerRef}
      style={getStyle(snapshot.isDragging, provided.draggableProps.style)}
    >
      <div>
        <List
          style={style.listStyle}
          header={
            <List.Item
              {...dragHandleProps}
              style={{ padding: "0 0.5vw", margin: "0", color: "#616161" }}
              title={list.title}
              extra={
                <Popover
                  title="Thao tác"
                  trigger="click"
                  visible={visiblePopover}
                  onVisibleChange={handlePopoverVisibleChange}
                  content={
                    <div>
                      <p className="delete-list" onClick={handleDeleteList}>
                        Xóa danh sách
                      </p>
                      <p className="edit-list" onClick={openFormEditList}>
                        Chỉnh sửa danh sách
                      </p>
                    </div>
                  }
                >
                  <EllipsisOutlined />
                </Popover>
              }
            >
              {list.title}
            </List.Item>
          }
          footer={
            <React.Fragment>
              {openForm ? (
                <FormAddCard
                  setOpenForm={setOpenForm}
                  list={list}
                  handleAddCard={handleAddCard}
                />
              ) : null}
              <Card
                style={{ backgroundColor: "transparent", opacity: "0.5" }}
                title={
                  <div onClick={openFormCard} style={{ cursor: "pointer" }}>
                    <PlusOutlined />
                    <span> Thêm thẻ khác</span>
                  </div>
                }
                bodyStyle={{
                  padding: "0",
                }}
                size="small"
              />
            </React.Fragment>
          }
        >
          <Droppable droppableId={`${list._id}`}>
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  type={`QUOTE`}
                  direction="vertical"
                  className="list-kanban"
                >
                  {list.cards.map((card, index) => {
                    return (
                      <List.Item style={{ padding: "0" }} key={index}>
                        <CardContainer
                          card={card}
                          index={index}
                          handleDeleteCard={handleDeleteCard}
                          handleEditCard={handleEditCard}
                        />
                      </List.Item>
                    );
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </List>
        <FormEditList
          list={list}
          handleSave={handleEditList}
          setVisible={setVisibleFormEdit}
          visible={visibleFormEditList}
        />
      </div>
    </div>
  );
}

export default ListTasks;
