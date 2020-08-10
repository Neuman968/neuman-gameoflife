import {rowColFromCelKey} from "./Simulation";

export const dotSelector = [ "*" ]

export const bar = [
    "#",
    "#",
    "#"
]

export const diagonal = [
    "*  ",
    " # ",
    "  #",
]

export const glider = [
    "#  ",
    " ##",
    "## ",
]

export const gliderGun = [
    "                        #           ",
    "                      # #           ",
    "            ##      ##            ##",
    "           #   #    ##            ##",
    "*#        #     #   ##              ",
    "##        #   # ##    # #           ",
    "          #     #       #           ",
    "           #   #                    ",
    "            ##                      ",
]

export const acorn = [
    " *     ",
    "   #    ",
    "##  ###",
]

export const beeHive = [
    "",
]

export const pulsar = [
    "  *##   ###  ",
    "             ",
    "#    # #    #",
    "#    # #    #",
    "#    # #    #",
    "  ###   ###  ",
    "             ",
    "  ###   ###  ",
    "#    # #    #",
    "#    # #    #",
    "#    # #    #",
    "             ",
    "  ###   ###  ",
]

export const rPentomino = [
    " *#",
    "## ",
    " # ",
]

export const lightweightSpaceship = [
    " *  #",
    "#    ",
    "#   #",
    "#### ",
]

export const middleweightSpaceship = [
    "   *  ",
    " #   #",
    "#     ",
    "#    #",
    "##### ",
]

export const heavyweightSpaceship = [
    "   *#  ",
    " #    #",
    "#      ",
    "#     #",
    "###### ",
]

export const lightweightEmulator = [
    "  *# #  # ##  ",
    "  #        #  ",
    "   ##    ##   ",
    "###  ####  ###",
    "#  #      #  #",
    " ##        ## ",
]

export const copperHead = [
    " *#  ## ",
    "   ##   ",
    "   ##   ",
    "# #  # #",
    "#      #",
    "        ",
    "#      #",
    " ##  ## ",
    "  ####  ",
    "        ",
    "   ##   ",
    "   ##   ",
]

export const v25P3H1V01 = [
    "       *# #     ",
    "    ## # ## ### ",
    " ####  ##      #",
    "#    #   #   ## ",
    " ##             ",
]

export const brain = [
    " *##         ### ",
    "# # ##     ## # #",
    "# # #       # # #",
    " # ## ## ## ## # ",
    "     # # # #     ",
    "   # # # # # #   ",
    "  ## # # # # ##  ",
    "  ###  # #  ###  ",
    "  ##  #   #  ##  ",
    " #    ## ##    # ",
    " #             # ",
]

export const dart = [
    "       *       ",
    "      # #      ",
    "     #   #     ",
    "      ###      ",
    "               ",
    "    ##   ##    ",
    "  #   # #   #  ",
    " ##   # #   ## ",
    "#     # #     #",
    " # ## # # ## # "
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
