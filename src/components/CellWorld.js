import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Cell from "./Cell";

const getCellKey = (row, column) => row + '-' + column;

const rowColFromCelKey = (key) => key.split('-')
    .map((val) => parseInt(val));

const CellWorld = (props) => {

    const [state, setState] = useState({
        cellState: {
            selectedIdx: getCellKey(0, 0),
            aliveCells: {}
        },
    });

    const updateAlive = (row, column) => {
        // "1" should be truthy.
        let cop = {...state};
        const cellKey = getCellKey(row, column);
        if (state.cellState.aliveCells[cellKey]) {
            delete cop.cellState.aliveCells[cellKey];
        } else {
            cop.cellState.aliveCells[cellKey] = 1;
        }
        cop.cellState.selectedIdx = cellKey;
        setState((_) => cop);
    };

    const updateSelected = (row, column) => {
        let cop = {...state};
        cop.cellState.selectedIdx = getCellKey(row, column);
        setState((_) => cop)
    }


    const handleKeyEvent = (e) => {
        let [row, column] = rowColFromCelKey(state.cellState.selectedIdx)
        switch (e.key) {
            case 'ArrowDown':
                updateSelected(row, column + 1);
                break;
            case 'ArrowUp':
                updateSelected(row, column - 1)
                break;
            case 'ArrowRight':
                updateSelected(row + 1, column)
                break;
            case 'ArrowLeft':
                updateSelected(row - 1, column)
                break;
            case  " ":
            case 'Enter':
                updateAlive(row, column);
                break;
        }
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
            props.widthKeys.map((row) => {

                return <div key={row}>{
                    props.lengthKeys.map((column) => {
                        const cellKey = getCellKey(row, column);
                        return <Cell
                            selected={cellKey === state.cellState.selectedIdx}
                            isAlive={!!state.cellState.aliveCells[cellKey]}
                            key={cellKey}
                            aliveHandler={updateAlive}
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
