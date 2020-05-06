import React from "react";
import Grid from "@material-ui/core/Grid";
import CellRow from "./CellRow";

const CellWorld = (props) => {

    const L = props.length;
    const W = props.width;

    const arr = [];
    for (let i = 0; i < L * W; i++) {
        arr.push(i);
    }

    const rows = [...Array(W).keys()]
        .map((idx) => {
            const startIdx = (idx * L);
            const endIdx = startIdx + L;
            return <Grid item xs={1} spacing={1}>
                <CellRow cells={arr.slice(startIdx, endIdx)}/>
            </Grid>
        });

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
