import { useEffect, useState } from 'react';
import Head from 'next/head';
import db from '../db.json';
import Widget from '../src/components/WIdget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import GithubCorner from '../src/components/GitHubCorner';
import AlternativesForm from '../src/components/AlternativesForm';
import Button from '../src/components/Button';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de resultados
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {results.filter((x) => x).length}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, i) => (
            <li key={i.toString()}>
              #
              {i + 1}
              {' '}
              Resultado:
              {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}

        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setselectedAlternative] = useState(undefined);
  const [isSubmited, setisSubmited] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;
  return (
    <>
      <Head>
        <title>
          Quiz
        </title>
      </Head>
      <Widget>
        <Widget.Header>
          <h3>
            {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
          </h3>
        </Widget.Header>

        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src={question.image}
        />
        <Widget.Content>
          <h2>
            {question.title}
          </h2>
          <p>
            {question.description}
          </p>

          <AlternativesForm
            onSubmit={(e) => {
              e.preventDefault();
              setisSubmited(true);
              setTimeout(() => {
                addResult(isCorrect);
                onSubmit();
                setselectedAlternative(undefined);
                setisSubmited(false);
              }, 2000);
            }}
          >
            {question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId = `alternative__${alternativeIndex}`;
              const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
              const isSelected = selectedAlternative === alternativeIndex;
              return (
                <Widget.Topic
                  data-selected={isSelected}
                  data-status={isSubmited && alternativeStatus}
                  as="label"
                  htmlFor={alternativeId}
                  key={alternative}
                >
                  <input
                    style={{ display: 'none' }}
                    id={alternativeId}
                    name={questionId}
                    onChange={() => setselectedAlternative(alternativeIndex)}
                    type="radio"
                  />
                  {alternative}
                </Widget.Topic>
              );
            })}
            <Button type="submit" disabled={!hasAlternativeSelected}>
              Confirmar
            </Button>
            {isSubmited && (isCorrect ? <p>Você acertou!</p> : <p>Você errou !</p>)}

          </AlternativesForm>
        </Widget.Content>
        <GithubCorner projectUrl="https://github.com/GabrielLarocca/quizNext" />
      </Widget>
    </>
  );
}

const screenStates = {
  LOADING: 'LOADING',
  RESULT: 'RESULT',
  QUIZ: 'QUIZ',
};
export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [result, setresult] = useState([]);

  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(results) {
    setresult([
      ...result, results,
    ]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 200);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={result} />}
      </QuizContainer>
      <GithubCorner projectUrl="https://github.com/GabrielLarocca/quizNext" />
    </QuizBackground>
  );
}
