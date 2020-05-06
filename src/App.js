import React from 'react';
import './App.css';
import CellWorld from "./components/CellWorld";

function App() {

    return (
        <div className="App">
            <header className="App-header">
                <CellWorld length={60} width={100}/>
            </header>
        </div>
    );
}

export default App;
