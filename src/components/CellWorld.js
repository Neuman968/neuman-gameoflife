import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import CellRow from "./CellRow";
import classes from './CellWorld.module.css'

const CellWorld = (props) => {

    const L = props.length;
    const W = props.width;

    const [state, setState] = useState({
        selectedIdx: 0,
        aliveCells: {},
    });

    const arr = [];
    for (let i = 0; i < L * W; i++) {
        arr.push(i);
    }

    const makeAlive = (idx) => {
        // "1" should be truthy.
        let cop = {...state};
        cop.aliveCells[idx] = idx;
        cop.selectedIdx = idx;
        setState((_) => cop);
        console.log("Alive states are...")
        console.log(cop.aliveCells);
    };

    // const updateSelected = (idx) => {
    //     let cop = {...state};
    //     cop.selectedIdx = idx;
    //     setState((_) => cop);
    // }

    const handleKeyDownSelection = (e) => {
        // console.log(e);
        if (e.key === "ArrowDown") {
            // updateSelected(state.selectedIdx + 1);
        }

        if (e.key === "ArrowUp") {

        }

        if (e.key === "ArrowLeft") {

        }

        if (e.key === "ArrowRight") {

        }
    }

    // useEffect(() => {
    //     window.addEventListener("keydown", handleKeyDownSelection);
    // })

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
                            selectedIdx={state.selectedIdx}
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
