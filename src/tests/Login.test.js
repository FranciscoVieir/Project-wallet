import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
// import Login from '../pages/Login';
import App from '../App';

const EMAILTESTE = 'tryber@teste.com';

describe('Teste se a página é renderizada na aba "/" e as informações', () => {
  test('Verifica se o history redireciona para a página correta', () => {
    renderWithRouterAndRedux(<App />);
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });

  test('Verifica se o texto "Login" e "Email" estão presente na tela', () => {
    renderWithRouterAndRedux(<App />);
    const textLogin = screen.getByText(/Login/i);
    expect(textLogin).toBeInTheDocument();

    const textEmail = screen.getByText(/Email/i);
    expect(textEmail).toBeInTheDocument();
  });

  test('Verifica se a pagina de login contém os input de "email"/"senha" e "botão"', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/Digite o seu email/i);
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByPlaceholderText(/Digite sua senha/i);
    expect(inputPassword).toBeInTheDocument();

    const entreButton = screen.getByText(/Entrar/i);
    expect(entreButton).toBeInTheDocument();
  });

  describe('Verifica se o botão se mantêm desativado', () => {
    test('Verifica se o botão está desabilitado ao entrar na pagina', () => {
      renderWithRouterAndRedux(<App />, '/');

      const buttonDisable = screen.getByText(/Entrar/i);
      expect(buttonDisable).toBeDisabled();
    });

    test('Verifica se o botão continua desativado, caso seja colocado informações incompletas nos inputs de "email" e "senha"', () => {
      renderWithRouterAndRedux(<App />);

      const inputEmail = screen.getByPlaceholderText(/Digite o seu email/i);
      const inputPassword = screen.getByPlaceholderText(/Digite sua senha/i);
      // expect(inputEmail).toBeInTheDocument();
      const buttonDisable = screen.getByText(/Entrar/i);

      userEvent.type(inputEmail, 'teste');
      userEvent.type(inputPassword, '1223');

      expect(buttonDisable).toBeDisabled();
    });

    test('Verifica se ao fazer o login, a página é redirecionada para a aba "/carteira"', () => {
      const { history } = renderWithRouterAndRedux(<App />);

      const inputEmail = screen.getByPlaceholderText(/Digite o seu email/i);
      const inputPassword = screen.getByPlaceholderText(/Digite sua senha/i);
      // expect(inputEmail).toBeInTheDocument();
      const button = screen.getByText(/Entrar/i);

      userEvent.type(inputEmail, EMAILTESTE);
      userEvent.type(inputPassword, '666666');

      userEvent.click(button);

      expect(history.location.pathname).toBe('/carteira');

      const valueName = screen.getByText(/adicionar despesa/i);

      expect(valueName).toBeInTheDocument();
    });
  });

  test('Verifique se as informações são salvas no estado global', () => {
    const { store } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/Digite o seu email/i);
    const inputPassword = screen.getByPlaceholderText(/Digite sua senha/i);
    // expect(inputEmail).toBeInTheDocument();
    const button = screen.getByText(/Entrar/i);

    userEvent.type(inputEmail, EMAILTESTE);
    userEvent.type(inputPassword, '666666');

    userEvent.click(button);

    expect(store.getState().user.email).toBe('tryber@teste.com');
  });
});
