import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUserAction } from '../redux/actions';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      buttonIsDisable: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.inputValidation);
  };

  inputValidation = () => {
    const { email, password } = this.state;
    const MIN_LENGTH = 6;
    const verifyInputEmail = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    ).test(email);
    const verifyInputPassword = password.length >= MIN_LENGTH;
    const isDisable = verifyInputEmail && verifyInputPassword;
    this.setState({ buttonIsDisable: !isDisable });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { dispatch, history } = this.props;
    const { email } = this.state;

    dispatch(addUserAction(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, buttonIsDisable } = this.state;

    return (
      <div>
        Login
        <form
          onSubmit={ this.handleSubmit }
        >
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              id="email"
              value={ email }
              placeholder="Digite o seu e-mail"
              data-testid="email-input"
              onChange={ this.handleChange }

            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              name="password"
              value={ password }
              id="password"
              placeholder="Digite sua senha"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            disabled={ buttonIsDisable }
          >
            Entrar
          </button>

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // userEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

// const mapDispatchToProps = (state) => {
//   console.log(state);
// };

// export default Login;

// const mapStateToProps = (state) => ({
//   userEmail: state.userReducer.email,
// });

export default connect()(Login);
