import React, { useState } from "react";
import { QuizContext } from "../../Helpers/Contexts";
import "./App.css";
import MainMenu from "../MainMenu/MainMenu";
import Quiz from "../Quiz/Quiz";

const App = () => {
    const [gameState, setGameState] = useState("menu");

    return (
        <div className="App">
            <QuizContext.Provider value={{ setGameState }}>
                {gameState === "menu" && <MainMenu />}
                {gameState === "quiz" && <Quiz />}
            </QuizContext.Provider>
        </div>
    );
};

export default App;
