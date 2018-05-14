import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    cellNormal:{
        display:'inline-block',
        // margin:'10px 0 0 2%',
        height:'25px',
        width: '25px',
        border: '2px solid black',
        margin: theme.spacing.unit/4
    },
    normalNewCell:{
        extend:'cellNormal',
        backgroundColor:'#0091ea'
    },
    normalactiveNewCell:{
        extend:'cellNormal',
        backgroundColor:'#d50000'
    },
    normaldeadNewCell:{
        extend:'cellNormal',
        backgroundColor:'#424242'
    },
    cellMedium:{
        display:'inline-block',
        height:'25px',
        width:'25px',
        border:'1px solid black',
        margin:theme.spacing.unit/8
    },
    mediumNewCell:{
        extend:'cellMedium',
        backgroundColor:'#0091ea'
    },
    mediumActiveCell:{
        extend:'cellMedium',
        backgroundColor:'#d50000'
    },
    mediumDeadCell:{
        extend:'cellMedium',
        backgroundColor:'#424242'
    },
    cellLarge:{
        display:'inline-block',
        height:'20px',
        width:'20px',
        border:'1px solid black',
        margin:theme.spacing.unit/12
    },
    largeNewCell:{
        extend:'cellLarge',
        backgroundColor:'#0091ea'
    },
    largeActiveCell:{
        extend:'cellLarge',
        backgroundColor:'#d50000'
    },
    largeDeadCell:{
        extend:'cellLarge',
        backgroundColor:'#424242'
    }
})
const setDataCell=(value,boardSize)=>{
    if (value.newborn){
        return 'N';
    }
    if (value.status===1){
        return 'A';
    }
    if (value.status===0){
        return 'S';
    }
}

// const Golcell=({classes,data})=>(
//     <div className={classes.root}>
//         {/* {setDataCell(data)} */}
//     </div>
// );

const Golcell=({classes,data,boardSize})=>{
    return(
        <div className={classes.normaldeadNewCell}>{setDataCell(data)}</div>
    );
};
Golcell.propTypes={
    classes:PropTypes.object.isRequired,
    boardSize:PropTypes.number,
    data:PropTypes.shape({
        newBorn:PropTypes.bool,
        status:PropTypes.number
    })
};
export default withStyles(styles)(Golcell);