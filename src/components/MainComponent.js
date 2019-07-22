import React, { Component } from 'react';
import Item from './ItemComponent';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: Array(8).fill().map(() => Array(8).fill(0)),
            diamondPosition: [],
            // nextDirection: "arrowright",
            // keyPressed : false,
            // isDiamond : false
        }

        this.renderRow = this.renderRow.bind(this);
        this.renderRowElements = this.renderRowElements.bind(this);
        this.removeDiamond = this.removeDiamond.bind(this);
    }

    componentDidMount() {
        this.generateRandom();
    }
    generateRandom() {
        let diamCoordinate = [];
        let max = 63;
        let min = 0;
        while (diamCoordinate.length !== 8) {
            const rand = Math.floor(Math.random() * (max - min + 1) + min);
            if (!diamCoordinate.includes(rand)) {
                diamCoordinate.push(rand);
            }
        }
        console.log(diamCoordinate);
        this.setState({
            diamondPosition: diamCoordinate
        });

    }
        removeDiamond(diamond){
        let tempDiamondPosition = this.state.diamondPosition;
        const index = tempDiamondPosition.indexOf(diamond);
        tempDiamondPosition.splice(index, 1);
        this.setState({
            diamondPosition : tempDiamondPosition
        });
        console.log(this.state.diamondPosition);
    }
    renderRowElements(row) {
        let rowElements = []


        for (let j = 0; j < 8; j++) {
            

            rowElements.push(
                <Item row={row}
                    col = {j}
                    diamondPosition = {this.state.diamondPosition}
                    removeDiamond = {(diamond)=>this.removeDiamond(diamond)}
                />,
            );
        }
        return rowElements;
    }
    renderRow() {
        let row = [];
        for (let i = 0; i < 8; i++) {
            row.push(
                <div key={i} className="col-12">
                    {this.renderRowElements(i)}
                </div>,
            );
        }
        return row;

    }
    render() {

        return (
            <div className="container">
                <div className="row">
                    {this.renderRow()}
                </div>

            </div>
        );
    };
}



export default Main;