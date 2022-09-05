import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
// import Login from '../pages/Login';
import mockData from './helpers/mockData';
// import initialState from './helpers/InitialState';
import App from '../App';

global.fecth = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(mockData),
}));

describe('Verifica se o componente wallet é renderizado ', () => {
  // const state = initialState;

  test('Testando se os inputs e o botão aparecem na tela  aparece na tela', async () => {
    // beforeEach(() => {
    //   renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    // });
    // expect(history.location.pathname).toBe('/carteira');
    // renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const valueInput = screen.getByTestId(/value-input/i);
    expect(valueInput).toBeInTheDocument();

    const descriptionInput = screen.getAllByTestId(/description-input/);
    expect(descriptionInput).toBeDefined();

    const currencyInput = screen.getAllByTestId(/currency-input/i);
    expect(currencyInput).toBeDefined();

    const methodInput = screen.getByTestId(/method-input/i);
    expect(methodInput).toBeInTheDocument();

    const tagInput = screen.getByTestId(/tag-input/i);
    expect(tagInput).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(button).toBeInTheDocument();
  });

  test('Verifica se o header contèm o email do usuário logado', () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const emailOfLogin = screen.getByTestId(/email-field/i);
    expect(emailOfLogin).toContainHTML(store.getState().user.email);
  });

  test('Verifica se o header contêm um campo para "valor total"', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const countTotal = screen.getByTestId(/total-field/i);

    expect(countTotal).toBeDefined();
  });

  test('Verifica se o campo da moeda aparece na tela após ser renderizado', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const currency = screen.getByTestId(/header-currency-field/i);

    expect(currency).toBeInTheDocument();
    expect(currency).toContainHTML('BRL');
  });

  test('', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const currency = await screen.findByRole('combobox', { name: /currency/i });
    expect(currency).toBeInTheDocument();
  });
});
