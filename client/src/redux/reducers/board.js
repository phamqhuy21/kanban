import * as boardConstant from "../../const/board";
import { cloneDeep } from "lodash";

let listID = 3;
let cardID = 4;

var initialState = [
  {
    id: `list-${0}`,
    status: "Hoàn tất",
    task: [
      {
        id: `card-${0}`,
        content: "Tìm hiểu ReactJS cơ bản",
        description: "",
        comment: [],
        label: [],
        exDate: {},
        member: [],
        groundImage: "",
        file: [],
        saved: false,
        action: [],
      },
      {
        id: `card-${1}`,
        content: "Tìm hiểu ReactJS Nâng cao",
        description: "",
        comment: [],
        label: [],
        exDate: {},
        member: [],
        groundImage: "",
        file: [],
        saved: false,
        action: [],
      },
    ],
  },
  {
    id: `list-${1}`,
    status: "Đang làm",
    task: [
      {
        id: `card-${2}`,
        content: "Tìm hiểu antd",
        description: "",
        comment: [],
        label: [],
        exDate: {},
        member: [],
        groundImage: "",
        file: [],
        saved: false,
        action: [],
      },
    ],
  },
  {
    id: `list-${2}`,
    status: "Những việc cần làm",
    task: [
      {
        id: `card-${3}`,
        content: "Xây dựng website Trello",
        description: "",
        comment: [],
        label: [],
        exDate: {},
        member: [],
        groundImage: "",
        file: [],
        saved: false,
        action: [],
      },
    ],
  },
];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case boardConstant.UPDATE_DATA_SUCCESS: {
      const { data } = action.payload;
      return [...data];
    }
    case boardConstant.ADD_LIST_SUCCESS: {
      const { status } = action.payload;
      const newList = {
        id: `list-${listID}`,
        status: status,
        task: [],
      };
      listID += 1;
      return [...state, newList];
    }
    case boardConstant.DELETE_LIST_SUCCESS: {
      const { board } = action.payload;
      return [...board];
    }
    case boardConstant.EDIT_LIST_SUCCESS: {
      const { board } = action.payload;
      return [...board];
    }
    case boardConstant.ADD_CARD_SUCCESS: {
      const { content, id } = action.payload;
      const newTask = {
        id: `card-${cardID}`,
        content: content,
        description: "",
        comment: [],
        label: [],
        exDate: {},
        member: [],
        groundImage: "",
        file: [],
        saved: false,
        action: [],
      };

      cardID += 1;

      const newState = state.map((list) => {
        if (list.id === id) {
          return {
            ...list,
            task: [...list.task, newTask],
          };
        } else {
          return list;
        }
      });

      return newState;
    }
    case boardConstant.DELETE_CARD_SUCCESS: {
      const { board } = action.payload;
      return [...board];
    }
    case boardConstant.EDIT_CARD_SUCCESS: {
      const { board } = action.payload;
      return [...board];
    }
    case boardConstant.ADD_DESCRIPTION_SUCCESS: {
      const { board } = action.payload;
      return [...board];
    }
    case boardConstant.ADD_COMMENT_SUCCESS: {
      const { board } = action.payload;
      return [...board];
    }
    case boardConstant.EDIT_COMMENT_SUCCESS: {
      const { board } = action.payload;
      return [...board];
    }
    case boardConstant.DELETE_COMMENT_SUCCESS: {
      const { board } = action.payload;
      return [...board];
    }
    case boardConstant.ADD_MEMBER_SUCCESS: {
      const { board } = action.payload;
      return [...board];
    }
    case boardConstant.DELETE_MEMBER_SUCCESS: {
      const { board } = action.payload;
      return [...board];
    }
    case boardConstant.ADD_LABEL_SUCCESS: {
      const { board } = action.payload;
      return [...board];
    }
    case boardConstant.DELETE_LABEL_SUCCESS: {
      const { board } = action.payload;
      return [...board];
    }
    case boardConstant.ADD_EXDATE_SUCCESS: {
      const { board } = action.payload;
      return [...board];
    }
    case boardConstant.DELETE_EXDATE_SUCCESS: {
      const { board } = action.payload;
      return [...board];
    }
    case boardConstant.END_EXDATE_SUCCESS: {
      const { board } = action.payload;
      return [...board];
    }
    case boardConstant.ADD_FILE_SUCCESS: {
      const { board } = action.payload;
      return [...board];
    }
    case boardConstant.ADD_GROUND_SUCCESS: {
      const { board } = action.payload;
      return [...board];
    }
    case boardConstant.DELETE_GROUND_SUCCESS: {
      const { board } = action.payload;
      return [...board];
    }
    case boardConstant.MOVE_CARD_SUCCESS: {
      const { board } = action.payload;
      return [...board];
    }
    case boardConstant.CLONE_CARD_SUCCESS: {
      const { content, idList } = action.payload;
      const newTask = cloneDeep(content);
      newTask.id = `card-${cardID}`;

      cardID += 1;

      const newState = state.map((list) => {
        if (list.id === idList) {
          return {
            ...list,
            task: [...list.task, newTask],
          };
        } else {
          return list;
        }
      });

      return newState;
    }
    case boardConstant.SAVE_CARD_SUCCESS: {
      const { board } = action.payload;
      return [...board];
    }
    case boardConstant.UNSAVE_CARD_SUCCESS: {
      const { board } = action.payload;
      return [...board];
    }
    case boardConstant.COLLECT_ACTION_CARD_SUCCESS: {
      /*   const moment()
                          .subtract(
                            (new Date().valueOf() - item.time) / 60000,
                            "minutes"
                          )
                          .fromNow() */
      const { actions, idCard } = action.payload;
      const newState = [...state];
      newState.forEach((element) => {
        element.task.forEach((e) => {
          if (e.id === idCard) {
            e.action.push(actions);
          }
        });
      });
      return newState;
    }
    default:
      return [...state];
  }
};

export default reducer;
