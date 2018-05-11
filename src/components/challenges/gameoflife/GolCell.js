import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    root:{
        display:'inline-block',
        margin:'10px 0 0 2%',
        flexGrow: 1,
        height:'40px',
        width: 'calc(100% * (1/19) - 30px - 2px)',
        border: '3px solid white'
    }
})
const setDataCell=value=>{
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
const Golcell=({classes,data})=>(
    <div className={classes.root}>
        {setDataCell(data)}
    </div>
);
Golcell.propTypes={
    classes:PropTypes.object.isRequired,
    data:PropTypes.shape({
        newBorn:PropTypes.bool,
        status:PropTypes.number
    })
};
export default withStyles(styles)(Golcell);