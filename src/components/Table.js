import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteObj } from '../redux/actions';

class Table extends Component {
  render() {
    const { valueExpenses, dispatch } = this.props;
    // console.log(valueExpenses);

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>

        <tbody>
          {valueExpenses.map((el) => (
            <tr key={ el.id }>
              <td>{el.description}</td>
              <td>{el.tag}</td>
              <td>{el.method}</td>
              <td>{parseFloat(el.value).toFixed(2)}</td>
              <td>{el.exchangeRates[el.currency].name}</td>
              <td>{(el.value * el.exchangeRates[el.currency].ask).toFixed(2)}</td>
              <td>{parseFloat(el.exchangeRates[(el.currency)].ask).toFixed(2)}</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => dispatch(deleteObj(el.id)) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  // userEmail: state.user.email,
  valueExpenses: state.wallet.expenses,
});

Table.propTypes = {
  valueExpenses: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    exchangeRates: PropTypes.objectOf(PropTypes.shape({
      ask: PropTypes.string.isRequired,
      bid: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      codeIn: PropTypes.string,
      create_date: PropTypes.string.isRequired,
      high: PropTypes.string.isRequired,
      low: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      pctChange: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      varBid: PropTypes.string.isRequired,
    })),
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
