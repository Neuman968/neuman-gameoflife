import React from 'react';
import './App.css';
import CellWorld from "./components/CellWorld";

function App() {

    const _cachedWidthKeys = [...Array(60).keys()]
    const _cachedLengthKeys = [...Array(100).keys()]

    const squareSize = 5;

    return (
        <div className="App">
            <header className="App-header">
                <CellWorld
                    widthKeys={_cachedWidthKeys}
                    lengthKeys={_cachedLengthKeys}
                    squareSize={squareSize}
                />
            </header>
        </div>
    );
}

export default App;
