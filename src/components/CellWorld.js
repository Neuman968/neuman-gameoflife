import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Cell from "./Cell";

const CellWorld = (props) => {

    const L = props.length;
    const W = props.width;

    const [state, setState] = useState({
        aliveCells: {},
        selectedIdx: 0,
        _cachedWidthKeys: [...Array(W).keys()],
        _cachedLengthKeys: [...Array(L).keys()],
    });

    const arr = [];
    for (let i = 0; i < L * W; i++) {
        arr.push(i);
    }

    const makeAlive = (idx) => {
        // "1" should be truthy.
        let cop = {...state};
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
            state._cachedWidthKeys.map((idx) => {

                return <div key={idx}>{
                    state._cachedLengthKeys.map((lidx) => {
                        const cellVal = (idx * L) + lidx;
                        return <Cell
                            selected={cellVal === state.selectedIdx}
                            key={cellVal}
                            aliveCells={state.aliveCells}
                            aliveHandler={makeAlive}
                            cellVal={cellVal}
                        />
                    })
                }
                </div>
            })
        }
    </Grid>
};

// const startIdx = (idx * L);
// const endIdx = startIdx + L;
// return <div key={startIdx} className={classes.CellRow}>

// {/*/!*<CellRow*!/*/}
// {/*/!*    key={startIdx}*!/*/}
// {/*/!*    aliveCells={state.aliveCells}*!/*/}
// {/*/!*    aliveHandler={makeAlive}*!/*/}
// {/*/!*    cells={arr.slice(startIdx, endIdx)}/>*!/*/}
// {/*    // </div>*/}

export default CellWorld;
