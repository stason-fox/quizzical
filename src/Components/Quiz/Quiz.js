import React, { useState, useEffect, useContext } from "react";
import { QuizContext } from "../../Helpers/Contexts";
import Confetti from "react-confetti";
import "./Quiz.css";

const Quiz = () => {
    const { setGameState } = useContext(QuizContext);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        fetch(
            "https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple"
        )
            .then((res) => res.json())
            .then((data) => {
                setQuestions(data.results);
            });
    }, []);

    const randomizeAnswers = (item) => {
        const temp = [...item.incorrect_answers];
        const randomPosition = Math.floor(Math.random() * (temp.length + 1));
        temp.splice(randomPosition, 0, item.correct_answer);
        return temp;
    };

    const handleClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;
        setCurrentQuestion(nextQuestion);
        nextQuestion < 10
            ? setCurrentQuestion(nextQuestion)
            : setShowScore(true);
    };

    return questions.length > 0 ? (
        <div className="Quiz">
            {showScore ? (
                <div className="score-section">
                    <Confetti />
                    <h1>You scored {score} out of 10!</h1>
                    <button onClick={() => setGameState("menu")}>
                        Play again
                    </button>
                </div>
            ) : (
                <div className="questions-container">
                    <div className="questions">
                        <h2
                            dangerouslySetInnerHTML={{
                                __html: questions[currentQuestion].question,
                            }}
                        />
                    </div>
                    <div className="answers-container">
                        <div className="answers">
                            {randomizeAnswers(questions[currentQuestion]).map(
                                (answer, index) => {
                                    return (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                handleClick(
                                                    answer ===
                                                        questions[
                                                            currentQuestion
                                                        ].correct_answer
                                                )
                                            }
                                            dangerouslySetInnerHTML={{
                                                __html: answer,
                                            }}
                                        />
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    ) : (
        <div className="loading-container">
            <h2>Loading...</h2>
        </div>
    );
};

export default Quiz;
