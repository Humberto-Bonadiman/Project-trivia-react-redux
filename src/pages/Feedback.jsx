import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();

    this.handleFeedback = this.handleFeedback.bind(this);
  }

  handleFeedback() {
    const TRHEE = 3;
    const totalScore = JSON.parse(localStorage.getItem('state'));
    const rightAnswersAmount = totalScore.player.assertions;

    if (rightAnswersAmount < TRHEE) {
      return (
        <>
          <h3
            data-testid="feedback-text"
          >
            Podia ser melhor...
          </h3>
          <h3
            data-testid="feedback-total-score"
          >
            { totalScore.player.score }
          </h3>
          <h3
            data-testid="feedback-total-question"
          >
            { rightAnswersAmount }
          </h3>
        </>
      );
    }

    return (
      <>
        <h3
          data-testid="feedback-text"
        >
          Mandou bem!
        </h3>
        <h3
          data-testid="feedback-total-score"
        >
          { totalScore.player.score }
        </h3>
        <h3
          data-testid="feedback-total-question"
        >
          { rightAnswersAmount }
        </h3>
      </>
    );
  }

  render() {
    const { history } = this.props;

    return (
      <h3 data-testid="feedback-text">
        <Header />
        { this.handleFeedback() }
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar novamente
        </button>
      </h3>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Feedback;
