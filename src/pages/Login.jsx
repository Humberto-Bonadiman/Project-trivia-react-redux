import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendName, sendEmail } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick() {
    const {
      dispatchUserName,
      dispatchUserEmail,
      history,
    } = this.props;
    const { name, email } = this.state;

    const URL = 'https://opentdb.com/api_token.php?command=request';
    const request = await fetch(URL);
    const response = await request.json();
    localStorage.setItem('token', response.token);

    dispatchUserName(name);
    dispatchUserEmail(email);
    history.push('/trivia');
  }

  render() {
    const { state: { email, name }, handleChange, handleClick } = this;
    const { history } = this.props;

    const validateButton = email !== '' && name !== '';

    return (
      <form>
        <input
          type="text"
          name="name"
          data-testid="input-player-name"
          value={ name }
          onChange={ handleChange }
          placeholder="nome do jogador"
        />
        <input
          type="email"
          name="email"
          data-testid="input-gravatar-email"
          value={ email }
          onChange={ handleChange }
          placeholder="e-mail gravatar do jogador"
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !validateButton }
          onClick={ handleClick }
        >
          Jogar

        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => { history.push('/configuration'); } }
        >
          Configurações
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatchUserName: PropTypes.func.isRequired,
  dispatchUserEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

// criado mapDispatchToProps + mapStateToProps e conectado no export default
const mapDispatchToProps = (dispatch) => ({
  dispatchUserName: (value) => dispatch(sendName(value)),
  dispatchUserEmail: (value) => dispatch(sendEmail(value)),
});

/* const mapStateToProps = (state) => ({
  user: state.userReducer.user,
}); */

export default connect(null, mapDispatchToProps)(Login);
