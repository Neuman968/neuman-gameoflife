import React from 'react';
import './App.css';
import CellWorld from "./components/CellWorld";

function App() {

    return (
        <div className="App">
            <header className="App-header">
                <CellWorld length={10} width={10}/>
            </header>
        </div>
    );
}

export default App;
