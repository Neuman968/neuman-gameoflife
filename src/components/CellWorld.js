import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Cell from "./Cell";

const getCellKey = (row, column) => row + '-' + column;

const rowColFromCelKey = (key) => key.split('-')
    .map((val) => parseInt(val));

const CellWorld = (props) => {

    const L = props.length;
    const W = props.width;

    const [state, setState] = useState({
        cellState: {
            selectedIdx: getCellKey(0, 0),
            aliveCells: {}
        },
        _cachedWidthKeys: [...Array(W).keys()],
        _cachedLengthKeys: [...Array(L).keys()],
    });

    const makeAlive = (row, column) => {
        // "1" should be truthy.
        let cop = {...state};
        const cellKey = getCellKey(row, column);
        cop.cellState.aliveCells[cellKey] = 1;
        cop.cellState.selectedIdx = cellKey;
        setState((_) => cop);
    };

    const updateSelected = (row, column) => {
        let cop = {...state};
        cop.cellState.selectedIdx = getCellKey(row, column);
        setState((_) => cop)
    }


    const handleKeyEvent = (e) => {
        console.log("Go event ")
        console.log(e);
        console.log("current state is")
        console.log(state)
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyEvent);
        return () => {
            window.removeEventListener('keydown', handleKeyEvent);
        }
    }, []);


    return <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
    >
        {
            state._cachedWidthKeys.map((row) => {

                return <div key={row}>{
                    state._cachedLengthKeys.map((column) => {
                        const cellKey = getCellKey(row, column);
                        return <Cell
                            selected={cellKey === state.cellState.selectedIdx}
                            isAlive={!!state.cellState.aliveCells[cellKey]}
                            key={cellKey}
                            aliveHandler={makeAlive}
                            cellVal={cellKey}
                            row={row}
                            column={column}
                        />
                    })
                }
                </div>
            })
        }
    </Grid>
};

export default React.memo(CellWorld);
