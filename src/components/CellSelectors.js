import {rowColFromCelKey} from "./Simulation";

export const dotSelector = [ "*" ]

export const barSelector = [
    "#",
    "#",
    "#"
]

export const diagonalSelector = [
    "*  ",
    " # ",
    "  #",
]

export const gliderSelector = [
    "#  ",
    " ##",
    "## ",
]

export const acornSelector = [
    " *     ",
    "   #    ",
    "##  ###",
]

export const getSelectedGrid = (selectedIdx, selectorArr) => {
    let selectedRow = 0
    let selectedIdxOf = 0
    const [row, column] = rowColFromCelKey(selectedIdx)

    for (let i = 0; i < selectorArr.length; i++) {
        if (selectorArr[i].includes('*')) {
            selectedRow = i
            selectedIdxOf = selectorArr[i].indexOf('*')
            break
        }
    }

    const returnArr = [];
    selectorArr.forEach((val, idx) => {
        for (let i = 0; i < val.length; i++) {
            const str = val[i]
            if (str === "#" || str === "*") {
                returnArr.push([row + idx - selectedRow, column + i - selectedIdxOf])
            }
        }

    })
    return returnArr
}
