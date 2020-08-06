import {mapToCellKey, rowColFromCelKey} from "./Simulation";

export const dotSelector = (selectedIdx) => [selectedIdx]

export const barSelector = (selectedIdx) => selectorFunc(selectedIdx, (row, col) =>
    mapToCellKey([[row, col - 1], [row, col], [row, col + 1]])
)

export const barSelector2 = [
    "#",
    "#",
    "#"
]

export const diagonalSelector = [
    "*  ",
    " # ",
    "  #",
]

export const gliderSelector2 = [
    "#  ",
    " ##",
    "## ",
]

export const acornSelector2 = [
    " *     ",
    "   #    ",
    "##  ###",
]

export const getSelectedGrid = (selectedIdx, selectorArr) => {
    let selectedRow = 0
    let selectedIdxOf = 0
    const [row, column] = rowColFromCelKey(selectedIdx)
    selectorArr.forEach((val, idx) => {
        if (val.includes("*")) {
            selectedRow = idx
            selectedIdxOf = val.indexOf("*")
        }
    })

    return mapToCellKey(selectorArr.flatMap((val, idx) => {
        const selectedRows = [];
        for (let i = 0; i < val.length; i++) {
            const str = val[i]
            if (str === "#" || str === "*") {
                selectedRows.push([row + idx - selectedRow, column + i - selectedIdxOf])
            }
        }
        return selectedRows
    }))
}

export const gliderSelector = (selectedIdx) => selectorFunc(selectedIdx, (row, col) =>
    mapToCellKey([[row - 1, col - 1], [row + 1, col - 1], [row, col + 1], [row + 1, col], [row, col]])
)

export const toadSelector = (selectedIdx) => selectorFunc(selectedIdx, (row, col) =>
    mapToCellKey([[row, col], [row, col + 1], [row, col + 2],
        [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]])
)

export const lightWeightSpaceshipSelector = (selectedIdx) => selectorFunc(selectedIdx, (row, col) =>
    mapToCellKey([[row, col], [row, col + 3], [row + 1, col - 1], [row + 2, col - 1], [row + 3, col - 1],
        [row + 3, col], [row + 3, col + 1], [row + 3, col + 2], [row + 2, col + 4]])
)

export const acornSelector = (selectedIdx) => selectorFunc(selectedIdx, (row, col) =>
    mapToCellKey([[row, col], [row + 2, col], [row + 2, col - 1], [row + 1, col + 2], [row + 2, col + 3],
        [row + 2, col + 4], [row + 2, col + 5]])
)

export const fPentominoSelector = (selectedIdx) => selectorFunc(selectedIdx, (row, col) =>
    mapToCellKey([[row, col], [row, col + 1], [row + 1, col], [row + 1, col - 1], [row + 3, col]]))

export const gliderGunSelector = (selectedIdx) => selectorFunc(selectedIdx, (row, col) =>
    mapToCellKey([
        [row, col], [row, col + 1], [row + 1, col], [row + 1, col + 1],
        [row, col + 10], [row + 1, col + 10], [row + 2, col + 10],
        [row + 3, col + 11], [row + 4, col + 12], [row + 4, col + 13],
        [row + 3, col + 15], [row + 2, col + 16], [row + 1, col + 16], [row + 1, col + 17], [row, col + 16],
        [row + 1, col + 14], [row - 1, col + 15], [row - 2, col + 13], [row - 2, col + 12], [row - 1, col + 11],
        [row, col + 20], [row - 1, col + 20], [row - 2, col + 20], [row, col + 21], [row - 1, col + 21], [row - 2, col + 21],
        [row - 3, col + 22], [row - 3, col + 24], [row - 4, col + 24],
        [row + 1, col + 22], [row + 1, col + 24], [row + 2, col + 24],
        [row - 1, col + 34], [row - 2, col + 34], [row - 1, col + 35], [row - 2, col + 35]
    ])
)

const selectorFunc = (selectedIdx, selectorFunc) => {
    const [row, col] = rowColFromCelKey(selectedIdx)
    return selectorFunc(row, col)
}
