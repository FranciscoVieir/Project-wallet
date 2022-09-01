import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { fetchApiExpenses } from '../redux/actions';

class Header extends Component {
  sum = () => {
    const { valueExpenses } = this.props;
    const reduceExpense = valueExpenses.reduce((
      curr,
      { value, currency, exchangeRates },
    ) => {
      const { ask } = Object.values(exchangeRates).find(({ code }) => code === currency);
      // console.log(ask);
      const sum = curr + (value * ask);
      return sum;
    }, 0);
    return (reduceExpense).toFixed(2);
    // console.log(reduceExpense);
  };

  render() {
    const { userEmail } = this.props;
    // console.log(this.props);

    return (
      <header>
        <div>
          <span data-testid="email-field">{`Email: ${userEmail}`}</span>
          <br />
          <span>
            Despesa total:
          </span>
          <span data-testid="total-field">{ this.sum() }</span>
          <br />
          <span data-testid="header-currency-field">
            Moeda:
            {' '}
            BRL
          </span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
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
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  valueExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
