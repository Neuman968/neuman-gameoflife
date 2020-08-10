import React from 'react'
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
    acorn,
    bar, brain,
    copperHead, dart,
    dotSelector, gliderGun,
    glider,
    heavyweightSpaceship,
    lightweightEmulator,
    lightweightSpaceship,
    middleweightSpaceship,
    pulsar,
    rPentomino,
    v25P3H1V01
} from "./CellSelectors";
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
        <MenuItem value={bar}>Bar<SvgIcon component={SvgBar}/></MenuItem>
        <MenuItem value={glider}>Glider <SvgIcon component={SvgGlider}/></MenuItem>
        <MenuItem value={gliderGun}>Glider Gun</MenuItem>
        {/*<MenuItem value={gliderGunSelector}>Glider Gun</MenuItem>*/}
        {/*<MenuItem value={toadSelector}>Toad</MenuItem>*/}
        {/*<MenuItem value={lightWeightSpaceshipSelector}>Light Weight Spaceship</MenuItem>*/}
        <MenuItem value={acorn}>Acorn</MenuItem>
        <MenuItem value={pulsar}>Pulsar</MenuItem>
        <MenuItem value={lightweightSpaceship}>Lightweight Spaceship</MenuItem>
        <MenuItem value={middleweightSpaceship}>Middleweight Spaceship</MenuItem>
        <MenuItem value={heavyweightSpaceship}>Heavyweight Spaceship</MenuItem>
        <MenuItem value={lightweightEmulator}>Lightweight Emulator</MenuItem>
        <MenuItem value={copperHead}>Copperhead</MenuItem>
        <MenuItem value={rPentomino}>R-pentomino</MenuItem>
        <MenuItem value={v25P3H1V01}>Centipede</MenuItem>
        <MenuItem value={brain}>Brain</MenuItem>
        <MenuItem value={dart}>Dart</MenuItem>
        {/*<MenuItem value={fPentominoSelector}>F-Pentomino</MenuItem>*/}
    </Select>
)

export default CellSelectorMenu
