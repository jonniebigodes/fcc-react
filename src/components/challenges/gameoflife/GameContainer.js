import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import GolBoard from './GolBoard';

const styles = theme => ({
  root: {
    display: 'flex',
      /* flex: 'calc(100%/20)', */
      alignContent:'center',
      alignItems:'center',
      flexDirection:'column',
  },
  buttons: {
    margin: theme.spacing.unit,
  },
})
class GameContainer extends Component {
  // #region component methods
  state={
    board:[],
    rows:20,
    cols:20,
    isRunning:false,
    gameSpeed:2000,
    generation:0
  };
  
  componentDidMount(){
    this.createBoard(20,20);
  }
  componentWillUnmount(){
    if (this.timerID){
      clearInterval(this.timerID);
    }
  }
  // #endregion
  
  // #region speed
  setFastSpeed = () =>this.setState({gameSpeed:1500});
  setMediumSpeed = () =>this.setState({gameSpeed:3000});
  setSlowSpeed= ()=>this.setState({gameSpeed:8000});
  // #endregion

  // #region board size
  setSmallBoard = ()=>{
    this.setState({ rows: 20,cols:20 });
    this.createBoard(20,20);
  }
  setMediumBoard = () =>{
    this.setState({rows:30,cols:40})
    this.createBoard(30,40);
  }
  setBigBoard = () =>{
    this.setState({rows:70,cols:50});
    this.createBoard(70,50);
  }
  // #endregion
  // #region game actions
  randomSeedNumber=()=> Math.floor(Math.random()*(10000000-1+1)+1)
  createBoard(rows,cols){

    const newBoard=[];
    for (let x=0;x<rows;x+=1){
      newBoard[x]=[];
      for (let i=0;i<cols;i+=1){
        const tmpRandom= Math.random();
        newBoard[x][i]={status:tmpRandom>.85?1:0,newborn:false,cell:`${x}${i}`}
      }
    }
    this.setState({board:newBoard});
  }
 
  
  pauseGame=()=>{
    this.setState({isRunning:false});
    clearInterval(this.timerID);
  }

  resetHandler=()=>{
    const {isRunning,rows,cols}= this.state;
    if (isRunning){
      this.setState({isRunning:false});
      clearInterval(this.timerID);
    }
    this.createBoard(rows,cols);
  }
  startGame=()=>{
    
    this.setState({isRunning:true});
    this.timerID= setInterval(()=>this.updateBoard(),this.state.gameSpeed);
  }

  
  updateBoard(){
    const oldBoard=[...this.state.board];
    const newboard=oldBoard.map((item,i)=>{
      return item.map((cell,x)=>{
        const numberOfNeighbours= this.calcNeighbours(i,x);
        if (cell.status===1){
          if(numberOfNeighbours<2){
            return {
              status:0,
              newborn:false
            };
          }
          else if(numberOfNeighbours>3){
            return {status:0,newborn:false};
          }
          return {status:1,newborn:false};
        }
        if(cell.status===0){
          if(numberOfNeighbours===3){
            return {status:1,newborn:true}
          }
          return {status:0,newborn:false}
        }
      });
    });
    this.setState((prevState)=>({
      generation:prevState.generation+1,
      board:newboard
    }));
  }
  calcNeighbours=(x,y)=>{
    const {rows,cols,board}= this.state;
    const topGrid = x-1 < 0 ? (rows - 1) : x-1;
    const bottomGrid = (x+1 ===rows) ? 0 : x+1;
    const borderLeftColumn = y-1 < 0 ? (cols - 1) : y-1;
    const borderRightColumn = (y+1 === cols) ? 0 : y+1;

    let result=0;
    result+= board[topGrid][borderLeftColumn].status;
    result+= board[topGrid][y].status;
    result+= board[topGrid][borderRightColumn].status;
    result+= board[x][borderLeftColumn].status;
    result+= board[x][borderRightColumn].status;
    result+= board[bottomGrid][borderLeftColumn].status;
    result+= board[bottomGrid][y].status;
    result+= board[bottomGrid][borderRightColumn].status;
    return result;
  }
  // #endregion
  // #region render
  render() {
    const {board}= this.state;

    return (
      <div className={this.props.classes.root}>
        <Typography variant="title" gutterBottom>
            Super Duper Game of life
        </Typography>
        <Grid container spacing={16} justify="center"direction="row">
          <Grid item xs>
            <GolBoard board={board}/>
          </Grid>
        </Grid>
        <Grid container spacing={40} justify="center"direction="row">
          <Grid item xs>
            <Button variant="raised" onClick={this.setSlowSpeed}
              color="primary" disabled={this.state.isRunning}>
              Slow
            </Button>
          </Grid>
          <Grid item xs>
            <Button variant="raised" onClick={this.setMediumSpeed}
              color="primary" disabled={this.state.isRunning}>
              Medium
            </Button>
          </Grid>
          <Grid item xs>
            <Button variant="raised" onClick={this.setFastSpeed}
              color="primary" disabled={this.state.isRunning}>
              Fast
            </Button>
          </Grid>
          <Grid item xs>
            <Button variant="raised" 
              color="primary" onClick={this.setSmallBoard} disabled={this.state.isRunning}>
              20x20
            </Button>
          </Grid>
          <Grid item xs>
            <Button variant="raised" 
              color="primary" onClick={this.setMediumBoard} disabled={this.state.isRunning}>
              30x40
            </Button>
          </Grid>
          <Grid item xs>
            <Button variant="raised"
              color="primary" onClick={this.setBigBoard} disabled={this.state.isRunning}>
              70x50
            </Button>
          </Grid>
          <Grid item xs>
            <Button variant="raised" onClick={this.startGame}
              color="primary" disabled={this.state.isRunning}>
              Run
            </Button>
          </Grid>
          <Grid item xs>
            <Button variant="raised" onClick={this.resetHandler}
              color="primary" disabled={this.state.isRunning}>
              Reset
            </Button>
          </Grid>
          <Grid item xs>
            <Button variant="raised" onClick={this.pauseGame}
              color="primary" disabled={!this.state.isRunning}>
              Pause
            </Button>
          </Grid>
          <Grid item xs>
            <Button variant="raised"
              color="primary" disabled={this.state.isRunning}>
              Clear
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }

  // #endregion
}
GameContainer.propTypes={
  classes:PropTypes.object.isRequired
};
export default withStyles(styles)(GameContainer)
