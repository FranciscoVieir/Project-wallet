export const ADD_USER = 'ADD_USER';
export const ADD_WALLET = 'ADD_WALLET';
export const GET_REQUEST_API = 'GET_REQUEST_API';
export const RESPONSE_API = 'RESPONSE_API';
export const GET_ERROR = 'GET_ERROR';

const URL = 'https://economia.awesomeapi.com.br/json/all';

export function addUserAction(payload) {
  return {
    type: ADD_USER,
    payload,
  };
}

export function responseAPi(payload) {
  return {
    type: RESPONSE_API,
    payload,
  };
}

export function requestApiWallet(payload) {
  return {
    type: GET_REQUEST_API,
    payload,
  };
}

export function getErrorApi(err) {
  return {
    type: GET_ERROR,
    err,
  };
}

// THUNK

export function fetchApi() {
  return async (dispatch) => {
    dispatch(requestApiWallet());
    try {
      const request = await fetch(URL);
      const result = await request.json();

      const code = Object.keys(result).filter((el) => el !== 'USDT');

      return dispatch(responseAPi(code));
    } catch (error) {
      dispatch(getErrorApi(error.message));
    }
  };
}

// export function addWalletAction(payload) {
//   return {
//     type: ADD_WALLET,
//     payload,
//   };
// }
