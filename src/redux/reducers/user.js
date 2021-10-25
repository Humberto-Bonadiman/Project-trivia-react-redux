import {
  NAME,
  EMAIL,
} from '../actions/index';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NAME:
    return {
      ...state,
      name: action.payload,
    };
  case EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  default:
    return state;
  }
};

export default user;
