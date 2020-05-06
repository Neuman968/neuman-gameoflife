import React from 'react';
import './App.css';
import CellRow from './components/CellRow';
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";

const L = 10;

const W = 10;

function App() {

    const arr = [];
    for (let i = 0; i < L * W; i++) {
        arr.push(i);
    }

    const rows = [...Array(W).keys()]
        .map((idx) => {
            const rowCells = (idx * L);
            const startIdx = rowCells;
            const endIdx = startIdx + L;
            return <Grid item xs={1} spacing={1}>
                <CellRow cells={arr.slice(startIdx, endIdx)}/>
            </Grid>
        });

    return (
        <div className="App">
            <header className="App-header">
                <Grid
                    container
                    spacing={0}
                    alignItems="center"
                    justify="center"
                >
                    {rows}
                </Grid>
            </header>
        </div>
    );
}

export default App;
