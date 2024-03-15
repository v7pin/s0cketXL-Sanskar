import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowQuiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [quizId, setQuizId] = useState('');
  const [searching, setSearching] = useState(false);
  const [answers, setAnswers] = useState({}); // To keep track of user's answers

  useEffect(() => {
    const fetchQuizData = async () => {
      if (!quizId) return;
      setSearching(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/quizzes/${quizId}`);
        setQuizData(response.data);
        // Reset answers when new quiz data is fetched
        setAnswers(response.data.questions.reduce((acc, question) => ({
          ...acc,
          [question._id]: '',
        }), {}));
        setSearching(false);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        setSearching(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  const handleInputChange = (event) => {
    setQuizId(event.target.value);
  };

  const handleOptionChange = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submission = {
        userId: "userIdHere", // Replace with actual userId, possibly from context or props
        answers: Object.entries(answers).map(([questionId, answerGiven]) => ({
          questionId,
          answerGiven,
        })),
      };
      const response = await axios.post(`http://localhost:3000/api/submit/${quizId}`, submission);
      alert("Quiz submitted successfully!");
      console.log(response.data); // Handle or display the response as needed
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert("Failed to submit the quiz.");
    }
  };

  if (searching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{quizData?.title || 'Quiz Title'}</h2>
      <p className="mb-4">{quizData?.description || 'Quiz Description'}</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={quizId}
            onChange={handleInputChange}
            placeholder="Enter Quiz ID"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <button type="button" onClick={() => setQuizId('')} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
            Clear
          </button>
        </div>
        {quizData && quizData.questions.map((question, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-bold mb-2">Question {index + 1}</h3>
            <p>{question.questionText}</p>
            <ul className="list-disc pl-6 mt-2">
              {question.answerOptions.map((option, optionIndex) => (
                <li key={optionIndex} className="mb-2">
                  <input
                    type="radio"
                    id={`option_${index}_${optionIndex}`}
                    name={`question_${index}`}
                    value={option._id} // use _id for value
                    onChange={() => handleOptionChange(question._id, option._id)}
                    checked={answers[question._id] === option._id}
                  />
                  <label htmlFor={`option_${index}_${optionIndex}`} className="ml-2">
                    {option.answerText}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default ShowQuiz;
