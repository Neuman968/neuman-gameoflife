import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Cell from "./Cell";

const getCellKey = (row, column) => row + '-' + column;

const rowColFromCelKey = (key) => key.split('-')
    .map((val) => parseInt(val));

const CellWorld = (props) => {

    const L = props.length;
    const W = props.width;

    const [state, setState] = useState({
        aliveCells: {},
        selectedIdx: getCellKey(0, 0),
        _cachedWidthKeys: [...Array(W).keys()],
        _cachedLengthKeys: [...Array(L).keys()],
    });

    const makeAlive = (row, column) => {
        // "1" should be truthy.
        let cop = {...state};
        const cellKey = getCellKey(row, column);
        cop.aliveCells[cellKey] = 1;
        cop.selectedIdx = cellKey;
        setState((_) => cop);
    };

    const updateSelected = (row, column) => {
        let cop = {...state};
        cop.selectedIdx = getCellKey(row, column);
        setState((_) => cop)
    }

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
                            selected={cellKey === state.selectedIdx}
                            isAlive={!!state.aliveCells[cellKey]}
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
