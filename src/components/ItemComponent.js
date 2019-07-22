import React, { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nextDirection: "arrowright",
            keyPressed : false,
            isDiamond : false
        }
        this.openValue = this.openValue.bind(this);
    }

   
    openValue(i, j) {
        let tempDiamondPosition = this.props.diamondPosition;
        let check = (8 * i) + j;
        if (tempDiamondPosition.includes(check)) {
            //removing that diamond from array\
            
            this.setState({
                isDiamond : true,
                keyPressed : true
            });
            this.props.removeDiamond(check);
        } else {
            let minR = 8;
            let minC = 8;
            let nearestNeighbour;

            //finding which diamond is closest by comparing current click to position of diamond left
            tempDiamondPosition.forEach(diamond => {
                let diamondRow = diamond / 8;
                let diamondCol = diamond % 8;

                if (((Math.abs(diamondRow - i) + Math.abs(diamondCol - j)) / 2) < ((minC + minR) / 2)) {
                    minR = Math.abs(diamondRow - i);
                    minC = Math.abs(diamondCol - j);
                    nearestNeighbour = diamond;
                }
            });

            //after finding closest diamond , check what direction to make
            let nearestNeighbourRow = nearestNeighbour / 8;
            let nearestNeighbourCol = nearestNeighbour % 8;
            let direction = "";
            if ((Math.abs(nearestNeighbourRow - i) < Math.abs(nearestNeighbourCol - j)) || nearestNeighbourRow === i) {
                if (nearestNeighbourCol - j < 0){
                    direction= "arrowleft" ;
                }  
                else{
                    direction= "arrowright" ;
                }
                    
            } else {
                if (nearestNeighbourRow - i > 0){
                    direction= "arrowup" ;
                } 
                else{
                     direction= "arrowdown" ;
                }
                    
            }
            this.setState({
                nextDirection: direction,
                keyPressed : true
            });

        }
        
    }
    
    render() {
        let question = "/question.png";
        let arrow = "/arrow.png";
        let diamond = "/diamond.png";

        let row = this.props.row;
        let col = this.props.col;

        // let image = '';
        if(!this.state.keyPressed){
            return (
                <img className="" src={question} height="30" width="30" onClick={() => this.openValue(row, col)} />
            );
        }
        else if (this.state.isDiamond) {
            return (
                <img className="" src={diamond} height="30" width="30" onClick={() => this.openValue(row, col)} />
                );
        }
        else {
            // if (this.state.nextDirection === "up") {
            //     image = <img src={arrow} className="arrowup" alt="arrowU" height="30" width="30" onClick={() => this.openValue(row, col)} />
            // }
            // else if (this.state.nextDirection === "down") {
            //     image = <img src={arrow} className="arrowdown" alt="arrowD" height="30" width="30" onClick={() => this.openValue(row, col)} />
            // }
            // else if (this.state.nextDirection === "left") {
            //     image = <img src={arrow} className="arrowleft" alt="arrowL" height="30" width="30" onClick={() => this.openValue(row, col)} />
            // }
            // else {
            //     image = <img src={arrow} className="" alt="arrowR" height="30" width="30" onClick={() => this.openValue(row, col)} />
            // }
            return (    
                <img src={arrow} className={this.state.nextDirection} alt="arrow" height="30" width="30" onClick={() => this.openValue(row, col)} />
            );
        }
        
    };
}



export default Item;