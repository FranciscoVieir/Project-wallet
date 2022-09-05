// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_COMPLETE_API,
  GET_ERROR, GET_REQUEST_API, RESPONSE_API,
  DELETE } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

function WalletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_REQUEST_API: return {
    ...state,
  };
  case RESPONSE_API: return {
    ...state,
    currencies: action.payload,
  };
  case GET_ERROR: return {
    ...state,
    error: action.err,
  };
  case GET_COMPLETE_API: return {
    ...state,
    // currencies: action.payload,
    // expenses: action.payload,
    expenses: [
      ...state.expenses,
      action.payload,
    ],
  };
  case DELETE: return {
    ...state,
    expenses: state.expenses.filter((el) => el.id !== Number(action.payload)),
  };

  default: return state;
  }
}

export default WalletReducer;
