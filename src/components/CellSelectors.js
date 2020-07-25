import {getCellKey, rowColFromCelKey} from "./Simulation";

export const getSelectorFunc = (cellSelector) => {
    switch (cellSelector) {
        case 1:
        default:
            return singleSquareSelector
        case 2:
            return barSelector
    }
}

const singleSquareSelector = (selectedIdx) => [selectedIdx]

const barSelector = (selectedIdx) => {
    const [row, col] = rowColFromCelKey(selectedIdx)
    return [getCellKey(row, col - 1), selectedIdx, getCellKey(row, col + 1)]
}
