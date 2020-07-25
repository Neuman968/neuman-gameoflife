import {getCellKey, rowColFromCelKey} from "./Simulation";

export const getSelectorFunc = (cellSelector) => {
    switch (cellSelector) {
        case 1:
        default:
            return singleSquareSelector
        case 2:
            return barSelector
        case 3:
            return gliderSelector
    }
}

const singleSquareSelector = (selectedIdx) => [selectedIdx]

const barSelector = (selectedIdx) => {
    const [row, col] = rowColFromCelKey(selectedIdx)
    return mapToCellKey([[row, col - 1], [row, col], [row, col + 1]])
}

const gliderSelector = (selectedIdx) => {
    const [row, col] = rowColFromCelKey(selectedIdx)
    return mapToCellKey([[row - 1, col - 1], [row + 1, col - 1], [row, col + 1], [row + 1, col], [row, col]])
}

const mapToCellKey = cellArrs => cellArrs.map((arr) => {
    const [cellRow, cellCol] = arr
    return getCellKey(cellRow, cellCol)
})
