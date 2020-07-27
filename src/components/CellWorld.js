import React from "react";
import Grid from "@material-ui/core/Grid";
import Cell from "./Cell";
import {getCellKey} from "./Simulation";

const CellWorld = (props) => {

    let x = 0;
    let y = 0;

    const cellArray = [];
    for (let w = 0; w < props.colWidth; w++) {
        for (let c = 0; c < props.colHeight; c++) {
            const cellKey = getCellKey(w, c);
            let cell = <Cell
                running={props.running ? 1 : 0}
                updateselected={props.updateselected}
                isselected={props.selectedcells.includes(cellKey)}
                isalive={!!props.aliveCells[cellKey]}
                key={cellKey}
                cellKey={cellKey}
                alivehandler={props.updatealive}
                row={w}
                column={c}
                x={x}
                y={y}
                height={props.squareSize}
                width={props.squareSize}
                selector={props.selector}
            />
            x += props.squareSize + 2;
            cellArray.push(cell);
        }
        y += props.squareSize + 2;
        x = 0;
    }

    return <Grid
        container
        spacing={0}
        width={props.gridwidth}
        height={props.gridheight}
        alignItems="center"
        justify="center"
        style={{
            paddingTop: '2%'
        }}
    >
        <svg
            height={props.gridwidth}
            width={props.gridheight}>
            {
                cellArray
            }
        </svg>
    </Grid>
};

export default CellWorld;
