import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      loading: false,
      change: false,
    };
    this.fetchTrivia = this.fetchTrivia.bind(this);
    this.content = this.content.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchTrivia();
  }

  async fetchTrivia() {
    this.setState({ loading: true });
    const tokenLocalStorage = localStorage.getItem('token');
    const URL = `https://opentdb.com/api.php?amount=5&token=${tokenLocalStorage}`;
    const request = await fetch(URL);
    const response = await request.json();
    this.setState({
      questions: response,
      loading: false,
    });
  }

  handleClick() {
    this.setState({
      change: true,
    });
  }

  content() {
    const { questions: { results }, change } = this.state;
    if (results !== undefined) {
      const rightQuestion = ([
        <button
          className={ change && 'green' }
          onClick={ this.handleClick }
          type="button"
          data-testid="correct-answer"
          key="right-question"
          id="right"
        >
          { results[0].correct_answer }
        </button>,
      ]);
      const wrongQuestion = results[0].incorrect_answers.map((answer, index) => (
        <button
          className={ change && 'red' }
          onClick={ this.handleClick }
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ index }
          id="wrong"
        >
          { answer }
        </button>
      ));
      const allQuestions = [...rightQuestion, ...wrongQuestion];
      const pointFive = 0.5;
      return (
        <section>
          <Header />
          <p data-testid="question-category">
            { results[0].category }
          </p>
          <p data-testid="question-text">
            { results[0].question }
          </p>
          {allQuestions.sort(() => pointFive - Math.random())}
        </section>
      );
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <section>
        {loading ? <Loading /> : this.content()}
      </section>
    );
  }
}

export default Trivia;
