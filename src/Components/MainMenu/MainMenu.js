import React, { useContext } from "react";
import { QuizContext } from "../../Helpers/Contexts";
import "./MainMenu.css";

const MainMenu = () => {
    const { setGameState } = useContext(QuizContext);

    return (
        <div className="Main">
            <h1>Quizzical</h1>
            <p>Quiz Trivia Game</p>
            <button onClick={() => setGameState("quiz")}>Start quiz</button>
        </div>
    );
};

export default MainMenu;
