import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
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
      number: 0,
      rightAnswers: 0,
    };

    this.fetchTrivia = this.fetchTrivia.bind(this);
    this.content = this.content.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addBtnNextQuestion = this.addBtnNextQuestion.bind(this);
    this.onBtnNextQuestion = this.onBtnNextQuestion.bind(this);
  }

  componentDidMount() {
    this.fetchTrivia();

    const { name, email } = this.props;
    const magicNumber = 1000;

    const scoreObj = {
      player: {
        name,
        gravatarEmail: email,
        assertions: 0,
        score: 0,
      },
    };

    localStorage.setItem('state', JSON.stringify(scoreObj));
    setInterval(() => this.setCronometer(), magicNumber);
  }

  onBtnNextQuestion() {
    const { number, rightAnswers } = this.state;
    const { history } = this.props;

    const localState = JSON.parse(localStorage.getItem('state'));

    const obj = {
      player: {
        ...localState.player,
        assertions: 0,
      },
    };

    const THREE = 3;

    this.setState((prevState) => ({
      number: prevState.number + 1,
      change: false,
      timer: 30,
      disabled: false,
    }));

    obj.player.assertions = rightAnswers;

    if (number > THREE) {
      localStorage.setItem('state', JSON.stringify(obj));
      history.push('/feedback');
    }
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
    const URL = `https://opentdb.com/api.php?amount=6&token=${tokenLocalStorage}`;
    const request = await fetch(URL);
    const response = await request.json();
    this.setState({
      questions: response,
      loading: false,
    });
  }

  handleClick(event) {
    const { questions: { results }, timer, number } = this.state;
    const localState = JSON.parse(localStorage.getItem('state'));

    const obj = {
      player: {
        ...localState.player,
        score: 0,
      },
    };

    this.setState({
      change: true,
      disabled: true,
    });

    if (event.target.id === 'right') {
      if (results[number].difficulty === 'easy') {
        obj.player.score = parseInt(localState.player.score, 10) + DEZ + (timer * 1);
        localStorage.setItem('state', JSON.stringify(obj));
      } if (results[number].difficulty === 'medium') {
        obj.player.score = parseInt(localState.player.score, 10) + DEZ + (timer * 2);
        localStorage.setItem('state', JSON.stringify(obj));
      } if (results[number].difficulty === 'hard') {
        obj.player.score = parseInt(localState.player.score, 10) + DEZ + (timer * TRES);
        localStorage.setItem('state', JSON.stringify(obj));
      }

      this.setState((prevState) => ({ rightAnswers: prevState.rightAnswers + 1 }));
    }
  }

  addBtnNextQuestion() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.onBtnNextQuestion }
      >
        Próxima
      </button>
    );
  }

  encodeUtf8(string) {
    // função do Lucas Rodrigues Turma 08
    const stringUTF = unescape(encodeURIComponent(string));
    return stringUTF.replace(/&quot;|&#039;/gi, '\'');
  }

  content() {
    const { questions: { results }, change, timer, disabled, number } = this.state;

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
      const wrongQuestion = results[number].incorrect_answers.map((answer, index) => (
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
            { results[number].category }
          </p>
          <p data-testid="question-text">
            { this.encodeUtf8(results[number].question) }
          </p>
          {allQuestions.sort(() => pointFive - Math.random())}
        </section>
      );
    }
  }

  render() {
    const { loading, timer, disabled } = this.state;

    return (
      <section>
        {loading ? <Loading /> : this.content()}
        <p>{timer}</p>
        { disabled ? this.addBtnNextQuestion() : null }
      </section>
    );
  }
}

Trivia.propTypes = {
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.gravatarEmail,
});

export default connect(mapStateToProps)(Trivia);
