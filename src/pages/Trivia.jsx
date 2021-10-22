import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      loading: false,
    };
    this.fetchTrivia = this.fetchTrivia.bind(this);
    this.content = this.content.bind(this);
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

  content() {
    const { questions: { results } } = this.state;
    if (results !== undefined) {
      console.log(results);
      return (
        <section>
          <Header />
          <p data-testid="question-category">
            Category:
            { results[0].category }
          </p>
          <p data-testid="question-text">
            Results:
            { results[0].question }
          </p>
          <button data-testid="correct-answer" type="button">
            { results[0].correct_answer }
          </button>
          { results[0].incorrect_answers.map((answer, index) => (
            <button
              key={ index }
              data-testid={ `wrong-answer-${index}` }
              type="button"
            >
              { answer }

            </button>
          )) }
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
