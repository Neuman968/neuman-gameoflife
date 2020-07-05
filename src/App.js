import React from 'react';
import './App.css';
import CellWorld from "./components/CellWorld";
import Simulation from "./components/Simulation";

function App() {

    return (
        <div className="App">
            <header className="App-header">
                <Simulation/>
                {/*<CellWorld*/}
                {/*    widthKeys={_cachedWidthKeys}*/}
                {/*    lengthKeys={_cachedLengthKeys}*/}
                {/*    squareSize={squareSize}*/}
                {/*/>*/}
            </header>
        </div>
    );
}

export default App;
