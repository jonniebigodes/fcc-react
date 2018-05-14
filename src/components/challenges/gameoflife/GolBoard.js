import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import GolCell from './GolCell';

const styles = theme => ({
    root: {
      display:'grid',
      gridTemplateColumns:'repeat(20,1fr)',
      gridTemplateRows:'repeat(20,1fr)'
    },
    buttons: {
      margin: theme.spacing.unit,
    },
})
class GolBoard extends Component{
    render(){
        const {board,classes}= this.props;
        const gameBoard=board.map(item=>{
            return item.map(cell=>{
                return (<GolCell data={cell} key={cell.cell} boardSize={item.length}/>)
            })
        })
        return(
            <div className={classes.root}>
                {
                    gameBoard
                }
            </div>
        );
    }
}
GolBoard.propTypes={
    classes:PropTypes.object.isRequired,
    board:PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                status:PropTypes.number,
                newborn:PropTypes.bool
            })
        )
    )
};
export default withStyles(styles)(GolBoard);