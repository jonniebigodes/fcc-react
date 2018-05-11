import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Recipe from './Recipe'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
})

class Recipies extends Component {
  removeRecipeItem = value => {
    this.props.destroyRecipe(value)
  }
  editRecipeInfo = value => {
    this.props.editRecipeData(value)
  }
  render() {
    const { classes, data } = this.props
    return (
      <Grid container className={classes.root} spacing={16} justify="center">
        {data.map(item => {
          return (
            <Grid key={`gkey_${item.id}`} item>
              <Recipe
                key={`rec_${item.id}`}
                recipeInfo={item}
                removeRecipe={this.removeRecipeItem}
                editRecipe={this.editRecipeInfo}
              />
            </Grid>
          )
        })}
      </Grid>
    )
  }
}
Recipies.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      recipeName: PropTypes.string,
      description: PropTypes.string,
      location: PropTypes.string,
      ingredients: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  editRecipeData: PropTypes.func,
  destroyRecipe: PropTypes.func,
}
export default withStyles(styles)(Recipies)
