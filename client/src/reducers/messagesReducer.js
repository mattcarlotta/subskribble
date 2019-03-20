import * as types from 'types';

const initialBasicPanelProps = {
  items: [],
  itemcount: 0,
};

const MessagesReducer = (state = initialBasicPanelProps, { payload, type }) => {
  switch (type) {
    case types.SET_MESSAGES:
      return { ...state, items: payload };
    case types.SET_INITIAL_MESSAGES:
      return { ...state, items: payload.messages };
    case types.SET_INITIAL_MESSAGECOUNTS:
      return { ...state, itemcount: payload };
    default:
      return state;
  }
};

export default MessagesReducer;
