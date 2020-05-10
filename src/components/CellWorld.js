import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import CellRow from "./CellRow";
import classes from './CellWorld.module.css'

const CellWorld = (props) => {

    const L = props.length;
    const W = props.width;

    const [aliveCells, setAliveCells] = useState({});

    const arr = [];
    for (let i = 0; i < L * W; i++) {
        arr.push(i);
    }

    const makeAlive = (idx) => {
        // "1" should be truthy.
        let cop = aliveCells
        console.log("Marking " + idx + " as live");
        cop[idx] = 1;
        setAliveCells((_) => cop);
        console.log(aliveCells);
    };


    const rows = [...Array(W).keys()]
        .map((idx) => {
            console.log("Logging alive cells");
            console.log(aliveCells);
            const startIdx = (idx * L);
            const endIdx = startIdx + L;
            return <div key={startIdx} className={classes.CellRow}>
                <CellRow
                    key={startIdx}
                    aliveCells={aliveCells}
                    aliveHandler={makeAlive}
                    cells={arr.slice(startIdx, endIdx)}/>
            </div>
        });
    console.log("Returning from render cycle...");
    return <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
    >
        {rows}
    </Grid>
};

export default CellWorld;
