import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import Button from 'material-ui/Button'
import Chip from 'material-ui/Chip'
import Grid from 'material-ui/Grid'
import React, { Component } from 'react'
import Potato from '../../../Assets/images/Potato.png'

const styles = theme => ({
  root: {
    width: '90%',
    height: '75%',
    margin: '0 auto',
  },
  imageInfo: {
    width: 550,
    height: 250,
    margin: '0 auto',
  },
  textInfo: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: 370,
  },
  buttons: {
    margin: theme.spacing.unit,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
})
class RecipeInjector extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isadding) {
      return null
    }
    if (prevState.recipeName !== nextProps.data.recipeName) {
      return {
        nameOfRecipe: nextProps.data.recipeName,
        recipeDescription: nextProps.data.description,
        urlRecipe: nextProps.data.location,
        currentingredient: '',
        ingredientsList: nextProps.data.ingredients,
        ispicinvalid: false,
        isingredientpresent: false,
        opensnack: false,
      }
    }
    return null
  }
  state = {
    nameOfRecipe: '',
    recipeDescription: '',
    urlRecipe: '',
    currentingredient: '',
    ingredientsList: [],
    ispicinvalid: false,
    isingredientpresent: false,
    opensnack: false,
  }

  setRecipeName = e => this.setState({ nameOfRecipe: e.target.value })
  setDescription = e => this.setState({ recipeDescription: e.target.value })
  setLocation = e => this.setState({ urlRecipe: e.target.value })
  setCurrentIngredient = e =>
    this.setState({ currentingredient: e.target.value })
  closeSnack = () => this.setState({ opensnack: false })
  handleCancel = () => {
    const { isadding, cancelChanges } = this.props
    cancelChanges(isadding ? 'add' : 'edit')
  }
  addIngredient = () => {
    const { ingredientsList, currentingredient } = this.state
    const ingredientPresent = ingredientsList.find(i => i === currentingredient)
    if (ingredientPresent) {
      this.setState({ isingredientpresent: true, opensnack: true })
    } else {
      this.setState({
        ingredientsList: [...this.state.ingredientsList, currentingredient],
      })
    }
  }
  removeIngredient = value => {
    this.setState(prevState => {
      return {
        ingredientsList: prevState.ingredientsList.filter(x => x !== value),
      }
    })
  }
  checkImage = () => {
    return this.state.urlRecipe.match(/\.(jpeg|jpg|gif|png|JPG|JPEG)$/) != null
  }
  handleAddEdit = () => {
    if (!this.props.isadding) {
      if (!this.checkImage()) {
        this.setState({ ispicinvalid: true })
        return
      }
    }

    const { addRecipe, isadding, changerecipe, data, lastItem } = this.props
    const {
      nameOfRecipe,
      recipeDescription,
      urlRecipe,
      ingredientsList,
    } = this.state
    const item = {
      id: isadding ? lastItem : data.id,
      recipeName: nameOfRecipe,
      description: recipeDescription,
      location: urlRecipe,
      ingredients: ingredientsList,
    }
    if (isadding) {
      addRecipe(item)
    } else {
      changerecipe(item)
    }
  }
  render() {
    const { classes, isadding } = this.props
    const {
      nameOfRecipe,
      recipeDescription,
      urlRecipe,
      ingredientsList,
      currentingredient,
      ispicinvalid,
      opensnack,
      isingredientpresent,
    } = this.state
    return (
      <div className={classes.root}>
        <div className={classes.imageInfo}>
          <img
            src={urlRecipe === '' ? Potato : urlRecipe}
            alt={nameOfRecipe}
            className={classes.imageInfo}
          />
        </div>
        <Grid container spacing={8} justify="center" direction="row">
          <Grid item xs>
            <TextField
              label="Recipe Name"
              className={classes.textInfo}
              margin="dense"
              value={nameOfRecipe}
              onChange={this.setRecipeName}
            />
            <TextField
              label="Recipe description"
              className={classes.textInfo}
              margin="dense"
              value={recipeDescription}
              onChange={this.setDescription}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Picture of recipe"
              margin="dense"
              error={ispicinvalid}
              value={urlRecipe}
              helperText={ispicinvalid ? 'Not a valid pic' : ' '}
              fullWidth
              onChange={this.setLocation}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={16}
          justify="space-around"
          direction="row"
          alignItems="baseline">
          <Grid item xs>
            <TextField
              label="Ingredient name"
              margin="dense"
              error={isingredientpresent}
              helperText={
                isingredientpresent ? 'Ingredient already added' : ' '
              }
              className={classes.textInfo}
              onChange={this.setCurrentIngredient}
            />
          </Grid>
          <Grid item xs>
            <Button
              className={classes.buttons}
              variant="raised"
              color="primary"
              onClick={this.addIngredient}
              disabled={currentingredient.length === 0}>
              Add Ingredient
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={8}
          justify="space-around"
          wrap
          direction="row"
          alignItems="center"
          hidden={ingredientsList.length === 0}>
          <Grid item xs>
            {ingredientsList.map(item => {
              return (
                <Chip
                  key={`chip_ingredient_${item}`}
                  label={item}
                  onDelete={() => this.removeIngredient(item)}
                  className={classes.chip}
                />
              )
            })}
          </Grid>
        </Grid>
        <Grid
          container
          spacing={16}
          justify="space-around"
          direction="row"
          alignItems="center"
          alignContent="center"
          wrap>
          <Grid item xs={8}>
            <Button
              className={classes.buttons}
              variant="raised"
              color="primary"
              disabled={nameOfRecipe.length === 0}
              onClick={this.handleAddEdit}>
              {isadding ? 'Add' : 'Change'}
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              className={classes.buttons}
              variant="raised"
              color="primary"
              onClick={this.handleCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          open={opensnack}
          autoHideDuration={4000}
          onClose={this.closeSnack}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Already added that ingredient</span>}
        />
      </div>
    )
  }
}
RecipeInjector.propTypes = {
  classes: PropTypes.object.isRequired,
  isadding: PropTypes.bool.isRequired,
  lastItem: PropTypes.number,
  data: PropTypes.shape({
    id: PropTypes.number,
    recipeName: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
  }),
  addRecipe: PropTypes.func,
  changerecipe: PropTypes.func,
  cancelChanges: PropTypes.func,
}
export default withStyles(styles)(RecipeInjector)
