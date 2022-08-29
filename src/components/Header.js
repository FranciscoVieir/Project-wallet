import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail } = this.props;
    // console.log(this.props);
    // console.log(this.props);
    return (
      <div>
        <span data-testid="email-field">{`Email: ${userEmail}`}</span>
        <br />
        <span data-testid="total-field">Despesa total: 0</span>
        <br />
        <span data-testid="header-currency-field">Moeda: BRL</span>
      </div>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToProps)(Header);
