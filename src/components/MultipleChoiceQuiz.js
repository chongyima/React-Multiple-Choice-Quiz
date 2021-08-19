import React, { Component } from 'react';
import Question from './Question';
import { getMessage } from '../messages';

class MultipleChoiceQuiz extends Component {
  state = {
    quizzesCompleted: 0,
    questionsCompleted: 0,
    questionsCorrect: 0,
    resultsPage: false,
    allComplete: false,
  };

  nextQuestion = (result) => {
    if (result) {
      this.setState({
        questionsCorrect: this.state.questionsCorrect + 1,
        questionsCompleted: this.state.questionsCompleted + 1,
      });
    } else {
      this.setState({
        questionsCompleted: this.state.questionsCompleted + 1,
      });
    }

    if (
      this.state.questionsCompleted ===
      this.props.quizzes[this.state.quizzesCompleted].questions.length - 1
    ) {
      this.setState({
        resultsPage: true,
        questionsCompleted: this.state.questionsCompleted,
      });
    }
  };

  nextQuiz = () => {
    if (this.state.quizzesCompleted + 1 === this.props.quizzes.length) {
      this.props.endGame();
    } else {
      this.setState({
        resultsPage: false,
        questionsCompleted: 0,
        questionsCorrect: 0,
        quizzesCompleted: this.state.quizzesCompleted + 1,
      });
    }
  };

  showProgress = () => {
    const progressBarArray = [];
    const incorrectAnswers =
      this.state.questionsCompleted - this.state.questionsCorrect;
    const barWidth =
      100 / this.props.quizzes[this.state.quizzesCompleted].questions.length;

    for (let i = 0; i < this.state.questionsCorrect; i++) {
      progressBarArray.push(
        <div style={{ width: `${barWidth}%` }} id="myBarCorrect">
          ✅
        </div>,
      );
    }

    for (let i = 0; i < incorrectAnswers; i++) {
      progressBarArray.push(
        <div style={{ width: `${barWidth}%` }} id="myBarIncorrect">
          🙁
        </div>,
      );
    }
    return progressBarArray;
  };

  render() {
    const { randomizeOrder, quizzes } = this.props;
    const {
      quizzesCompleted,
      questionsCompleted,
      questionsCorrect,
      resultsPage,
    } = this.state;

    const { title, questions } = quizzes[quizzesCompleted];
    const currentQuestion = questions[questionsCompleted];

    const responseChoices = randomizeOrder([
      ...currentQuestion.incorrectAnswers,
      currentQuestion.correctAnswer,
    ]);

    return (
      <div>
        <h1>{title}</h1>
        {resultsPage ? (
          <div>
            <h3>
              You got {questionsCorrect} out of {questionsCompleted + 1}{' '}
              questions right
            </h3>
            <h3>{getMessage()}</h3>
            <button onClick={this.nextQuiz} class="btn">
              Next Quiz?
            </button>
          </div>
        ) : (
          <div>
            <Question
              currentQuestion={currentQuestion}
              randomizeOrder={randomizeOrder}
              responseChoices={responseChoices}
              nextQuestion={this.nextQuestion}
            />
            <div id="myProgress">{this.showProgress()}</div>
          </div>
        )}
      </div>
    );
  }
}

export default MultipleChoiceQuiz;
