import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MultipleChoiceQuiz from './components/MultipleChoiceQuiz.js';
import { quizzes } from './quizzes';
import './styles.css';

class App extends Component {
  state = {
    allQuizzesDone: false,
  };
  randomizeOrder = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  endGame = () => {
    this.setState({ allQuizzesDone: true });
  };

  startOver = () => {
    this.setState({ allQuizzesDone: false });
  };

  render() {
    let quizArray = this.randomizeOrder(quizzes);
    quizArray = quizArray.map((quiz) => {
      this.randomizeOrder(quiz.questions);
      return quiz;
    });
    return (
      <div className="app">
        {this.state.allQuizzesDone ? (
          <div>
            <h1>No Quizzes Remaining!</h1>
            <button onClick={this.startOver} class="btn">
              Start Over?
            </button>
          </div>
        ) : (
          <MultipleChoiceQuiz
            quizzes={quizArray}
            randomizeOrder={this.randomizeOrder}
            endGame={this.endGame}
          />
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
