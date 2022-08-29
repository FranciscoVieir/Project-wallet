import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  render() {
    const { currinciesApi } = this.props;
    console.log(currinciesApi);
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
              name=""
              id="value"
              data-testid="value-input"
            />
          </label>

          <label
            htmlFor="description"
          >
            Descrição:
            <input
              type="text"
              name=""
              id="description"
              data-testid="description-input"
            />
          </label>

          <label
            htmlFor="currency"
          >
            Moeda:
            <select
              name=""
              id="currency"
              data-testid="currency-input"
            >
              {currinciesApi.map((currency, key) => (
                <option key={ key }>{ currency }</option>
              ))}
            </select>
          </label>

          <label
            htmlFor="method"
          >
            Método de Pagamento:
            <select
              name=""
              id="method"
              data-testid="method-input"
            >
              <option value="cash">Dinheiro</option>
              <option value="credit-card">Cartão de crédito</option>
              <option value="debit-card">Cartão de débito</option>
            </select>
          </label>

          <label
            htmlFor="category"
          >
            Categoria
            <select
              name=""
              id="category"
              data-testid="tag-input"
            >
              <option value="alimentação">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saúde">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currinciesApi: state.wallet.currencies,
});

WalletForm.propTypes = {
  currinciesApi: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
