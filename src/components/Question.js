import React, { Component } from 'react';

class Question extends Component {
  state = {
    answerPicked: false,
    correct: false,
  };

  pickAnswer = (choice) => {
    if (choice === this.props.currentQuestion.correctAnswer) {
      this.setState({ answerPicked: choice, correct: true });
    } else {
      this.setState({ answerPicked: choice });
    }
  };

  styleChoices = (choice) => {
    if (this.state.answerPicked === choice) {
      return this.state.correct
        ? {
            'border-color': 'green',
            'border-style': 'solid',
            'pointer-events': 'none',
          }
        : {
            'border-color': 'red',
            'border-style': 'solid',
            'pointer-events': 'none',
            'text-decoration': 'line-through',
          };
    } else if (
      !this.state.correct &&
      choice === this.props.currentQuestion.correctAnswer
    ) {
      return {
        'border-color': 'green',
        'border-style': 'solid',
        'pointer-events': 'none',
      };
    } else {
      return { 'pointer-events': 'none' };
    }
  };

  nextQuestion = () => {
    this.setState({ answerPicked: false, correct: false });
    this.props.nextQuestion(this.state.correct);
  };

  render() {
    const { currentQuestion, responseChoices } = this.props;
    const { text } = currentQuestion;
    const alphabet = ['A', 'B', 'C', 'D'];

    const responseLis = responseChoices.map((choice, index) => {
      return (
        <li
          style={this.state.answerPicked ? this.styleChoices(choice) : null}
          onClick={() => this.pickAnswer(choice)}
        >
          {alphabet[index]}. {choice}
        </li>
      );
    });
    return (
      <div>
        <span>{text}</span>
        <ol>{responseLis}</ol>
        {this.state.answerPicked && (
          <div>
            {this.state.correct ? (
              <p style={{ color: 'green' }}>Correct!</p>
            ) : (
              <p style={{ color: 'red' }}>Incorrect...</p>
            )}
            <button onClick={this.nextQuestion} class="btn">
              Next
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Question;
