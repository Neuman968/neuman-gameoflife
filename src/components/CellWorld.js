import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import CellRow from "./CellRow";
import classes from './CellWorld.module.css'

const CellWorld = (props) => {

    const L = props.length;
    const W = props.width;

    const [state, setState] = useState({
        aliveCells: {},
        selectedIdx: 0
    });

    const arr = [];
    for (let i = 0; i < L * W; i++) {
        arr.push(i);
    }

    const makeAlive = (idx) => {
        // "1" should be truthy.
        let cop = { ...state };
        cop.aliveCells[idx] = 1;
        cop.selectedIdx = idx;
        setState((_) => cop);
    };

    return <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
    >
        {
            [...Array(W).keys()]
                .map((idx) => {
                    const startIdx = (idx * L);
                    const endIdx = startIdx + L;
                    return <div key={startIdx} className={classes.CellRow}>
                        <CellRow
                            key={startIdx}
                            aliveCells={state.aliveCells}
                            aliveHandler={makeAlive}
                            cells={arr.slice(startIdx, endIdx)}/>
                    </div>
                })
        }
    </Grid>
};

export default CellWorld;
