import React, { Component } from 'react';

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

  handleClick() {
    //  todo
  }

  render() {
    const { state: { email, name }, handleChange } = this;

    const validateButton = email !== '' && name !== '';

    return (
      <form>
        <input
          type="text"
          name="name"
          data-testid="input-player-name"
          value={ name }
          onChange={ handleChange }
        />
        <input
          type="email"
          name="email"
          data-testid="input-gravatar-email"
          value={ email }
          onChange={ handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !validateButton }
        >
          Jogar

        </button>
      </form>
    );
  }
}

export default Login;
