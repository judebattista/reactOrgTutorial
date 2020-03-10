import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square(props) {
    return (
        <button className="square" backgroundColor={props.backgroundColor} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    buildMonth = (weeksPerMonth, daysPerWeek) => {
        let month = [];
        let weeks = [];
        for (let foo = 0; foo < weeksPerMonth; foo++) {
            let week = [];
            for (let bar = 0; bar < daysPerWeek; bar++) {
                let ndx = foo * daysPerWeek + bar;
                week.push(
                    <Square
                        key={ndx}
                        value={ndx + 1}
                        onClick={() => this.props.onClick(ndx)}
                        backgroundColor={this.props.squareColors[ndx]}
                    />
                );
            }
            weeks.push(<tr>{week}</tr>)
        }
        month.push(
            <table className="month">{weeks}</table>
        );
        return month;
    };

    render() {
        return (
            <div>
                <div className="board-row">
                {
                    this.buildMonth(4,7)
                }           
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squareColors: Array(28).map(() => {
                return "#DDDDDD";
            }),
        };
    }

    handleClick = (i) => {
        this.setState( (state) => {
            const squareColors = state.squareColors.map( (item, ndx) => {
                if (ndx === i) {
                    return "#FF000";
                } else {
                    return state.squareColors[ndx]
                }
            });
            return squareColors;
        });
        alert("Clicked" + i);
    };

    render() {

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        onClick={(i) => this.handleClick(i)}
                        squareColors={this.state.squareColors}
                    />
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

