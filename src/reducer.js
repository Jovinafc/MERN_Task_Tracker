export const initialState = {
  user: null,
  isAuthenticated: null,
  modal: false,
  modal_message: '',
  modal_prompt: '',
  modal_type: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.user));
      return {
        ...state,
        user: JSON.parse(localStorage.getItem('user')),
        isAuthenticated: true,
      };
    case 'LOGOUT': {
      localStorage.removeItem('user');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case 'LOAD_USER': {
      return {
        ...state,
        user: JSON.parse(localStorage.getItem('user')),
        isAuthenticated: true,
      };
    }
    case 'MODAL_DISPLAY': {
      return {
        ...state,
        modal: true,
        modal_message: action.message,
        modal_type: action.modal_type,
      };
    }
    case 'MODAL_CLOSE': {
      return {
        ...state,
        modal: false,
        modal_prompt: action.response,
      };
    }
    case 'SPINNER_DISPLAY': {
      return {
        ...state,
        modal: true,
      };
    }
    case 'STOP_SPINNER': {
      return {
        ...state,
        modal: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
