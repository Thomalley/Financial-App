/* eslint no-param-reassign: ["error", { "props": false }] */
import produce from 'immer';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SILENT_LOGIN,
  UPDATE_PROFILE,
} from '../actions/accountActions';

const initialState = {
  user: null,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        user: null,
      };
    }

    case LOGIN_SUCCESS: {
      const { userData } = action.payload;
      return produce(state, (draft) => {
        draft.user = userData;
      });
    }

    case LOGIN_FAILURE: {
      return produce(state, () => {
      });
    }

    case LOGOUT: {
      return produce(state, (draft) => {
        draft.user = null;
      });
    }

    case SILENT_LOGIN: {
      const { userData } = action.payload;
      return produce(state, (draft) => {
        draft.user = userData;
      });
    }

    case UPDATE_PROFILE: {
      const { user } = action.payload;

      return produce(state, (draft) => {
        draft.user = user;
      });
    }

    default: {
      return state;
    }
  }
};

export default accountReducer;
