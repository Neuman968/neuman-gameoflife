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

/**
 * Applies a 90 degree rotation numRotations times.
 * @param numRotations
 * @param selectedIdx
 * @param cellKeyArr
 * @returns {*}
 */
export const rotateTimes = (numRotations, selectedIdx, cellKeyArr) => {
    let arr = cellKeyArr
    for (let i =0; i < numRotations; i++) {
        arr = rotate(selectedIdx, arr)
    }
    return arr
}

/**
 * Take a cellKeyArray, ie ['0-0', '0-1'..] and applies a 90 degree clockwise
 * rotation returning an array of transformed cell key coordinates.
 * @param cellKeyArr
 */
export const rotate = (selectedIdx, cellKeyArr) => {
    const [ selectedRow, selectedColum ] = rowColFromCelKey(selectedIdx)
    return mapToCellKey(cellKeyArr.map((cellKey) => {
        const [row, col] = rowColFromCelKey(cellKey)
        // apply translation to origin
        const [rowP, colP] = pointRotate(row - selectedRow, col - selectedColum)
        // Return untranslated points after rotation is applied.
        return [rowP + selectedRow, colP + selectedColum]
    }))
}

export const pointRotate = (row, column) => [ column, row ]

/**
 * Utility function for converting [[row, col]...] to ['row-col'] cell key
 * notation.
 * @param cellArrs
 * @returns {*}
 */
const mapToCellKey = cellArrs => cellArrs.map((arr) => {
    const [cellRow, cellCol] = arr
    return getCellKey(cellRow, cellCol)
})
