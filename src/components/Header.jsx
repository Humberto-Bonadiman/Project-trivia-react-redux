import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

const GRAVATAR_URL = 'https://www.gravatar.com/avatar/';
const EMAIL_TO_HASH = (email) => md5(email).toString();

class Header extends Component {
  render() {
    const { name, gravatarEmail } = this.props;
    return (
      <header>
        <img
          src={ `${GRAVATAR_URL}${EMAIL_TO_HASH(gravatarEmail)}` }
          alt="imagem do gravatar"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">0</span>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.name,
  gravatarEmail: state.user.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
