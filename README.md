👋 Hi there! 👋

## The Situation

See `./mockups/*.png` for rough descriptions of what it should look like.

> Don't bother getting your page exactly like our mockups -- just match the general layout. We're not interested in pixel perfect formatting.

### What You're Given

Your application code should live in the `src/` directory. We've set it up to work with React, though you're welcome to add other libraries if you need.

In the `src/quizzes.js` file, we've exported for you a set of `quizzes`, each of which contains the following data:

- `title`: A human-readable display text title for the quiz

- `questions` An ordered list of questions to be asked, each of which consists of:
  - `text`
  - `correctAnswer`
  - `incorrectAnswers`

### Feature Requirements

Your code will allow the user to take each of those `quizzes` in order.
\*You can delete all unnecessary code on index.js

1. Create a `MultipleChoiceQuiz` component that takes in a quiz as a prop, displays its title on top of the page, and displays a single question’s text and randomly ordered answers, starting with the first question.

2. When a question’s answer is clicked, it should show:

   - A ‘Next’ button at the bottom of the component
   - Either _'Correct!'_ or _'Incorrect...'_ above that button, with the correct answer outlined in green, and the incorrect answer, if any, -nice to have: outlined in red with a ~~strikethrough~~ over its text

3. After all questions have been answered, display a friendly summary screen that lists:
   - How many questions were in the quiz
   - How many of those questions were answered correctly
   - A random encouragement message _(use `getMessage` from `src/messages.js`)_.
   - Nice to have: A button to move to the next quiz (or the first quiz, if they just took the last)
