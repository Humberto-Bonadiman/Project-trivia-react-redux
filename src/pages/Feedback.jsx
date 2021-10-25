import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();

    this.handleFeedback = this.handleFeedback.bind(this);
  }

  handleFeedback() {
    const TRHEE = 3;
    const rightAnswersAmount = parseInt(localStorage.getItem('rightAnswers'), 10);

    if (rightAnswersAmount < TRHEE) {
      return <p data-testid="feedback-text">Podia ser melhor...</p>;
    }
    return <p data-testid="feedback-text">Mandou bem!</p>;
  }

  render() {
    return (
      <h3 data-testid="feedback-text">
        <Header />
        { this.handleFeedback() }
      </h3>
    );
  }
}

export default Feedback;
