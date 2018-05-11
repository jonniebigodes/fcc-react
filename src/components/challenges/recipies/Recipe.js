import DeleteIcon from '@material-ui/icons/Delete'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { withStyles } from 'material-ui/styles'
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from 'material-ui/Card'
import Collapse from 'material-ui/transitions/Collapse'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import ModeEdit from '@material-ui/icons/ModeEdit'
import PotatoRec from '../../../Assets/images/Potato.png'

const styles = theme => ({
  recipe: {
    maxWidth: 300,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
})
class Recipe extends Component {
  state = {
    expanded: false,
  }
  expandHandler = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  deleteRecipe = () => {
    const { recipeInfo, removeRecipe } = this.props
    removeRecipe(recipeInfo.id)
  }
  changeRecipe = () => {
    const { recipeInfo, editRecipe } = this.props
    editRecipe(recipeInfo)
  }
  render() {
    const { classes, recipeInfo } = this.props
    return (
      <Card className={classes.recipe}>
        <CardHeader title={recipeInfo.recipeName} />
        <CardMedia
          className={classes.media}
          image={recipeInfo.location === '' ? PotatoRec : recipeInfo.location}
          title={recipeInfo.recipeName}
        />
        <CardContent>
          <Typography component="p">{recipeInfo.description}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Edit Recipe" onClick={this.changeRecipe}>
            <ModeEdit />
          </IconButton>
          <IconButton aria-label="Delete" onClick={this.deleteRecipe}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.expandHandler}
            aria-expanded={this.state.expanded}
            aria-label="Show more">
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph variant="body2">
              Ingredients:
            </Typography>
            <Typography paragraph variant="body2">
              <ul>
                {recipeInfo.ingredients.map(item => {
                  return <li key={`ing_${item}`}>{item}</li>
                })}
              </ul>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}
Recipe.propTypes = {
  classes: PropTypes.object.isRequired,
  recipeInfo: PropTypes.shape({
    id: PropTypes.number,
    recipeName: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
  }),
  removeRecipe: PropTypes.func,
  editRecipe: PropTypes.func,
}
export default withStyles(styles)(Recipe)
