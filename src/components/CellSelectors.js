import {getCellKey, rowColFromCelKey} from "./Simulation";

export const dotSelector = (selectedIdx) => [selectedIdx]

export const barSelector = (selectedIdx) => {
    const [row, col] = rowColFromCelKey(selectedIdx)
    return mapToCellKey([[row, col - 1], [row, col], [row, col + 1]])
}

export const gliderSelector = (selectedIdx) => {
    const [row, col] = rowColFromCelKey(selectedIdx)
    return mapToCellKey([[row - 1, col - 1], [row + 1, col - 1], [row, col + 1], [row + 1, col], [row, col]])
}

const mapToCellKey = cellArrs => cellArrs.map((arr) => {
    const [cellRow, cellCol] = arr
    return getCellKey(cellRow, cellCol)
})
