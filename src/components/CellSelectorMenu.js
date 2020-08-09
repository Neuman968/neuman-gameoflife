import React from 'react'
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {acornSelector, barSelector, dotSelector, gliderSelector} from "./CellSelectors";
import SvgIcon from "@material-ui/core/SvgIcon";
import SvgSinglePoint from "../assets/icon/SvgSinglePoint";
import SvgBar from "../assets/icon/SvgBar";
import SvgGlider from "../assets/icon/SvgGlider";

const CellSelectorMenu = (props) => (
    <Select
        value={props.cellselector}
        onChange={(event) => props.updatecellselector(event.target.value)}
        {...props}
    >
        <MenuItem value={dotSelector}>Single Point<SvgIcon component={SvgSinglePoint}/></MenuItem>
        <MenuItem value={barSelector}>Bar<SvgIcon component={SvgBar}/></MenuItem>
        <MenuItem value={gliderSelector}>Glider <SvgIcon component={SvgGlider}/></MenuItem>
        {/*<MenuItem value={gliderGunSelector}>Glider Gun</MenuItem>*/}
        {/*<MenuItem value={toadSelector}>Toad</MenuItem>*/}
        {/*<MenuItem value={lightWeightSpaceshipSelector}>Light Weight Spaceship</MenuItem>*/}
        <MenuItem value={acornSelector}>Acorn</MenuItem>
        {/*<MenuItem value={fPentominoSelector}>F-Pentomino</MenuItem>*/}
    </Select>
)

export default CellSelectorMenu
