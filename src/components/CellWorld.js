import React from "react";
import Grid from "@material-ui/core/Grid";
import Cell from "./Cell";
import {getCellKey} from "./Simulation";

const CellWorld = (props) => {

    let x = 0;
    let y = 0;

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
                props.widthKeys.map((row) => {
                    let cellRow = props.lengthKeys.map((column) => {
                        const cellKey = getCellKey(row, column);
                        let cell = <Cell
                            running={props.running ? 1 : 0}
                            updateselected={props.updateselected}
                            isselected={cellKey === props.selectedIdx}
                            isalive={!!props.aliveCells[cellKey]}
                            key={cellKey}
                            cellKey={cellKey}
                            alivehandler={props.updatealive}
                            row={row}
                            column={column}
                            x={x}
                            y={y}
                            height={props.squareSize}
                            width={props.squareSize}
                        />
                        x += props.squareSize + 2;
                        return cell;
                    })
                    y += props.squareSize + 2;
                    x = 0;
                    return cellRow
                })
            }
        </svg>
    </Grid>
};

export default CellWorld;
