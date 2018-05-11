import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import GolCell from './GolCell';

const styles = theme => ({
    root: {
      display: 'flex',
      /* flex: 'calc(100%/20)', */
      alignContent:'center',
      alignItems:'center',
      flexDirection:'row',
      flexWrap:'wrap'
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
                return (<GolCell data={cell}/>)
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