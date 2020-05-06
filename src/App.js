import React from 'react';
import './App.css';
import CellRow from './components/CellRow';
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";

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
            return <TableRow>
                <CellRow cells={arr.slice(startIdx, endIdx)}/>
            </TableRow>
        });

    return (
        <div className="App">
            <header className="App-header">
                <Table size="small">
                    {rows}
                </Table>
            </header>
        </div>
    );
}

export default App;
