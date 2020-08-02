import {mapToCellKey, rowColFromCelKey} from "./Simulation";

export const dotSelector = (selectedIdx) => [selectedIdx]

export const barSelector = (selectedIdx) => {
    const [row, col] = rowColFromCelKey(selectedIdx)
    return mapToCellKey([[row, col - 1], [row, col], [row, col + 1]])
}

export const gliderSelector = (selectedIdx) => {
    const [row, col] = rowColFromCelKey(selectedIdx)
    return mapToCellKey([[row - 1, col - 1], [row + 1, col - 1], [row, col + 1], [row + 1, col], [row, col]])
}

export const toadSelector = (selectedIdx) => {
    const [row, col] = rowColFromCelKey(selectedIdx)
    return mapToCellKey([[row, col], [row, col + 1], [row, col + 2],
        [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]])
}

export const lightWeightSpaceshipSelector = (selectedIdx) => {
    const [row, col] = rowColFromCelKey(selectedIdx)
    return mapToCellKey([[row, col], [row, col + 3], [row + 1, col - 1], [row + 2, col - 1], [row + 3, col - 1],
        [row + 3, col], [row + 3, col + 1], [row + 3, col + 2], [row + 2, col + 4]])
}

export const acornSelector = (selectedIdx) => {
    const [row, col] = rowColFromCelKey(selectedIdx)
    return mapToCellKey([[row, col], [row + 2, col], [row + 2, col - 1], [row + 1, col + 2], [row + 2, col + 3],
        [row + 2, col + 4], [row + 2, col + 5]])
}

export const fPentominoSelector = (selectedIdx) => {
    const [row, col] = rowColFromCelKey(selectedIdx)
    return mapToCellKey([[row, col], [row, col + 1], [row + 1, col], [row + 1, col - 1], [row + 3, col]])
}

export const gliderGunSelector = (selectedIdx) => {
    const [row, col] = rowColFromCelKey(selectedIdx)
    return mapToCellKey([
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
}

