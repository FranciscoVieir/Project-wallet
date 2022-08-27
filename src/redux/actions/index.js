export const ADD_USER = 'ADD_USER';
export const ADD_WALLET = 'ADD_WALLET';

export function addUserAction(payload) {
  return {
    type: ADD_USER,
    payload,
  };
}

export function addWalletAction(payload) {
  return {
    type: ADD_WALLET,
    payload,
  };
}
