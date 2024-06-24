import React, { useState, useEffect } from 'react';
import { QUESTIONS } from '../questions';

const LOCAL_STORAGE_KEY = 'averageRatings';

const QuestionsComponent = () => {
  const [answers, setAnswers] = useState({});
  const [currentAverage, setCurrentAverage] = useState(0);
  const [allRunAverage, setAllRunAverage] = useState(0);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prevAnswers => {
      const newAnswers = {
        ...prevAnswers,
        [questionId]: answer
      };
      calculateCurrentAverage(newAnswers);
      return newAnswers;
    });
  };

  const calculateCurrentAverage = (answers) => {
    const totalQuestions = Object.keys(QUESTIONS).length;
    const yesCount = Object.values(answers).filter(answer => answer === 'Yes').length;
    const percentage = totalQuestions ? (100 * yesCount / totalQuestions) : 0;
    setCurrentAverage(percentage);
  };

  useEffect(() => {
    const storedAverages = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    if (storedAverages.length > 0) {
      const total = storedAverages.reduce((acc, avg) => acc + avg, 0);
      const averageOfAllRuns = total / storedAverages.length;
      setAllRunAverage(averageOfAllRuns);
    }
  }, []);

  useEffect(() => {
    if (currentAverage > 0) {
      const storedAverages = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
      storedAverages.push(currentAverage);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedAverages));
      const total = storedAverages.reduce((acc, avg) => acc + avg, 0);
      const averageOfAllRuns = total / storedAverages.length;
      setAllRunAverage(averageOfAllRuns);
    }
  }, [currentAverage]);

  return (
    <div>
      {Object.entries(QUESTIONS).map(([id, question]) => (
        <div key={id} style={{ marginBottom: '1rem' }}>
          <p>{question}</p>
          <label>
            <input
              type="radio"
              name={`question-${id}`}
              value="Yes"
              checked={answers[id] === 'Yes'}
              onChange={() => handleAnswerChange(id, 'Yes')}
            />
            Yes
          </label>
          <label style={{ marginLeft: '1rem' }}>
            <input
              type="radio"
              name={`question-${id}`}
              value="No"
              checked={answers[id] === 'No'}
              onChange={() => handleAnswerChange(id, 'No')}
            />
            No
          </label>
        </div>
      ))}
      <p>Current Run Average: {currentAverage.toFixed(2)}%</p>
      <p>Average of All Runs: {allRunAverage.toFixed(2)}%</p>
    </div>
  );
};

export default QuestionsComponent;
