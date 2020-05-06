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
            return <tr>
                <CellRow cells={arr.slice(startIdx, endIdx)}/>
            </tr>
        });

    return (
        <div className="App">
            <header className="App-header">
                <table
                    cellSpacing={0}
                    cellPadding={0}
                    style={{
                        border: '1px solid black;',
                        borderSpacing: '0',
                        borderCollapse: 'collapse'
                    }}
                >
                    {rows}
                </table>
            </header>
        </div>
    );
}

export default App;
