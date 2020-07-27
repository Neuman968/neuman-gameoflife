import React, {Component} from 'react';
import classes from './Cell.module.css'

class Cell extends Component {

    shouldComponentUpdate(prevProps, prevState, snapshot) {
       return prevProps.isalive !== this.props.isalive
        || (prevProps.isselected !== this.props.isselected)
        || (prevProps.running !== this.props.running)
    }

    render = () => {

        const alivehandler = () => {
            this.props.alivehandler()
        }

        const cellClasses = [classes.Cell];

        if (!this.props.running) {
            cellClasses.push(classes.EditableCell)
            if (this.props.isselected) {
                cellClasses.push(classes.CellSelected)
            }
        }

        cellClasses.push(this.props.isalive ? classes.CellAlive : classes.CellDead)

        // console.log('Cell Row: ' + this.props.row + ' Column: ' + this.props.column + ' Rendering')
        return <rect
            onMouseEnter={() => this.props.updateselected(this.props.row, this.props.column)}
            onClick={() => alivehandler()}
            className={cellClasses.join(' ')}
            height={this.props.height}
            width={this.props.width}
            x={this.props.x}
            y={this.props.y}
        />
    }
}

// const Cell = (this.props) => {
//
//     const alivehandler = () => {
//         this.props.alivehandler(this.props.row, this.props.column)
//     }
//
//     const cellClasses = [classes.Cell];
//
//     if (!this.props.running) {
//         cellClasses.push(classes.EditableCell)
//         if (this.props.isselected) {
//             cellClasses.push(classes.CellSelected)
//         }
//     }
//
//     cellClasses.push(this.props.isalive ? classes.CellAlive : classes.CellDead)
//
//     return <rect
//         onMouseEnter={() => this.props.updateselected(this.props.row, this.props.column)}
//         onClick={() => alivehandler()}
//         className={cellClasses.join(' ')}
//         height={this.props.height}
//         width={this.props.width}
//         x={this.props.x}
//         y={this.props.y}
//     />
// };

export default Cell;
