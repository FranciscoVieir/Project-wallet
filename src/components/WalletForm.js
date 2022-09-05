import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApiExpenses, fetchApi } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleClick = () => {
    // event.preventDefault();

    const { dispatch } = this.props;

    this.setState((prevState) => ({ id: prevState.id + 1 }));

    dispatch(fetchApiExpenses(this.state));
    this.setState({ value: '', description: '' });
  };

  render() {
    const { currinciesApi } = this.props;
    const
      {
        id,
        value,
        description,
        currency,
        method,
        tag,
      } = this.state;

    return (
      <div>
        <h2>WalletForm</h2>

        <form action="">
          <label
            htmlFor="value"
          >
            Valor:
            <input
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              id={ id }
              data-testid="value-input"
            />
          </label>

          <label
            htmlFor="description"
          >
            Descrição:
            <input
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              id={ id }
              data-testid="description-input"
            />
          </label>

          <label
            htmlFor="currency"
          >
            Moeda:
            <select
              name="currency"
              id={ id }
              value={ currency }
              onChange={ this.handleChange }
              data-testid="currency-input"
            >
              {currinciesApi.map((curr, key) => (
                <option key={ key }>{ curr }</option>
              ))}
            </select>
          </label>

          <label
            htmlFor="method"
          >
            Método de Pagamento:
            <select
              name="method"
              id={ id }
              value={ method }
              onChange={ this.handleChange }
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label
            htmlFor="category"
          >
            Categoria
            <select
              name="tag"
              id={ id }
              value={ tag }
              onChange={ this.handleChange }
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currinciesApi: state.wallet.currencies,
  // expenses: state.wallet.payload,
  valueExpenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  currinciesApi: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
