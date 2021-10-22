import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';

const DEZ = 10;
const TRES = 3;
class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      loading: false,
      change: false,
      timer: 30,
      disabled: false,
    };
    this.fetchTrivia = this.fetchTrivia.bind(this);
    this.content = this.content.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchTrivia();
    const magicNumber = 1000;
    setInterval(() => this.setCronometer(), magicNumber);
    const value = 0;
    localStorage.setItem('pontos', value);
  }

  setCronometer() {
    const { timer } = this.state;
    if (timer > 0) {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }
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

  handleClick(event) {
    const { questions: { results }, timer } = this.state;
    this.setState({
      change: true,
      disabled: true,
    });
    const getItemPontos = localStorage.getItem('pontos');
    if (event.target.id === 'right') {
      if (results[0].difficulty === 'easy') {
        const value = parseInt(getItemPontos, 10) + DEZ + (timer * 1);
        localStorage.setItem('pontos', value);
      } if (results[0].difficulty === 'medium') {
        const value = parseInt(getItemPontos, 10) + DEZ + (timer * 2);
        localStorage.setItem('pontos', value);
      } if (results[0].difficulty === 'hard') {
        const value = parseInt(getItemPontos, 10) + DEZ + (timer * TRES);
        localStorage.setItem('pontos', value);
      }
    }
  }

  content() {
    const { questions: { results }, change, timer, disabled } = this.state;
    const number = 0;
    console.log(results);
    if (results !== undefined) {
      const rightQuestion = ([
        <button
          className={ change && 'green' }
          onClick={ this.handleClick }
          type="button"
          data-testid="correct-answer"
          key="right-question"
          id="right"
          disabled={ timer <= 0 || disabled }
        >
          { results[number].correct_answer }
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
          disabled={ timer <= 0 || disabled }
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
    const { loading, timer } = this.state;
    const getItemPoints = localStorage.getItem('pontos');
    return (
      <section>
        {loading ? <Loading /> : this.content()}
        <p>{timer}</p>
        <p>{getItemPoints}</p>
      </section>
    );
  }
}

export default Trivia;
