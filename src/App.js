import React from 'react';
import './App.css';
import Grid from "@material-ui/core/Grid";
import CellRow from './components/CellRow';

function App() {


    const arr = [];
    for (let i = 0; i < 100; i++) {
        arr.push(i);
    }

    const rows = [...Array(100 / 10).keys()]
        .map((idx) => {
            const rowCells = (idx * 10);
            const startIdx = rowCells;
            const endIdx = startIdx + 10;
            return <Grid container spacing={0} xs={1}>
                <CellRow cells={arr.slice(startIdx, endIdx)}/>
            </Grid>
        });

    return (
        <div className="App">
            <header className="App-header">
                {rows}
            </header>
        </div>
    );
}

export default App;
