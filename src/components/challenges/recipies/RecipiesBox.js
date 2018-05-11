import Button from 'material-ui/Button'
import AddIcon from '@material-ui/icons/Add'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import CamperPreloader from '../../preloader/CamperPreloader'
import Recipies from './Recipies'
import RecipeInjector from './RecipeInjector'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  button: {
    margin: theme.spacing.unit,
  },
})
class RecipiesBox extends Component {
  state = {
    isloading: true,
    isAdding: false,
    isEdit: false,
    recipieslist: [],
    editingRecipe: {},
  }

  // #region component_methods
  componentDidMount() {
    setTimeout(()=>this.injectData,1000);
  }
  componentWillUnmount() {
    localStorage.setItem(
      '_jonniebigodes_recipes',
      JSON.stringify(this.state.recipieslist),
    )
  }
  // #endregion
  setAddMode = () => this.setState({ isAdding: true })
  endPreload = () => this.setState({ isloading: false })
  cancelEditAdd = value => {
    if (value === 'edit') {
      this.setState({ isEdit: false, editingRecipe: {} })
    } else {
      this.setState({ isAdding: false })
    }
  }
  handleEdit = value => {
    const recipeData = [...this.state.recipieslist]
    const updatedData = recipeData.map(item => {
      if (item.id === value.id) {
        return {
          id: value.id,
          recipeName: value.recipeName,
          description: value.description,
          location: value.location,
          ingredients: value.ingredients,
        }
      }
      return item
    })
    this.setState({
      recipieslist: updatedData,
      isEdit: false,
      editingRecipe: {},
    })
  }
  handleAddRecipe = value => {
    this.setState({
      recipieslist: [...this.state.recipieslist, value],
      isAdding: false,
    })
  }
  handleRemoveRecipe = value => {
    this.setState(prevState => {
      return {
        recipieslist: prevState.recipieslist.filter(x => x.id !== value),
      }
    })
  }
  changeEdit = value => this.setState({ isEdit: true, editingRecipe: value })


  injectData(){
    const recipesData = localStorage.getItem('_jonniebigodes_recipes')
    if(recipesData){
        this.setState({ recipieslist: JSON.parse(recipesData) })
    }
    else{
      this.setState({
        recipieslist: [
            {
              id: 0,
              recipeName: 'Mac and Cheese',
              description: 'Yummy mac and cheese',
              location:
                'http://img.sndimg.com/food/image/upload/h_496,w_661,c_fit/v1/img/recipes/60/35/0/NhfqIVCeRpaQDNIGl03S_mac%20and%20cheese.JPG',
              ingredients: ['chicken', 'cream', 'pasta', 'cheese'],
            },
            {
              id: 1,
              recipeName: 'Chicken alfredo',
              description: 'mean chicken right there',
              location: '',
              ingredients: [
                'elbow macaroni',
                'milk',
                'sour cream',
                'salt',
                'pepper',
                'Cheddar cheese',
                'Parmesan cheese',
              ],
            },
            {
              id: 2,
              recipeName: 'Spaghetti',
              description: 'just like yo momma made it',
              location: '',
              ingredients: [
                'italian sausage',
                'onions',
                'garlic cloves',
                'tomatoes',
                'tomato paste',
                'tomato sauce',
              ],
            },
            {
              id: 3,
              recipeName: 'Cheese Potato & Smoked sausage casserole',
              description: 'some goodie goodie confort food',
              location:
                'http://cleverhousewife.com/wp-content/uploads/2011/01/Cheese-Potatoes-Sausage.jpg',
              ingredients: [
                'potatoes',
                'butter',
                'milk',
                'salt',
                'peper',
                'velveeta cheese',
                'cheddar cheese',
                'smoked sausage',
                'paprika',
              ],
            },
            {
              id: 4,
              recipeName: 'Chicken tikka masala',
              description: 'just had a homer simpson moment',
              location:
                'http://img.sndimg.com/food/image/upload/h_496,w_661,c_fit/v1/img/recipes/25/58/7/NxufAx8GTP2G3zUhgxyc_THE%20FOOD%20GAYS%20-%20CHICKEN%20TIKA.jpg',
              ingredients: [
                'yogurt',
                'lemon juice',
                'ground cumin',
                'red pepper',
                'black pepper',
                'cinnamon',
                'salt',
                'ginger',
                'butter',
                'garlic cloves',
                'jalapeno chile',
                'coriander',
                'paprika',
                'garam masala',
                'tomato sauce',
                'whipping cream',
                'cilantro',
              ],
            },
            {
              id: 5,
              recipeName: 'Salisbury Steak',
              description: 'gimme da meats',
              location:
                'http://img.sndimg.com/food/image/upload/h_496,w_661,c_fit/v1/img/recipes/56/69/4/fVgy28p7Qqyb5s5nw1UR_DSC_0279.JPG',
              ingredients: [
                'french onion soup',
                'ground beef',
                'breadcrumbs',
                'egg',
                'salt',
                'black peper',
                'all purpose flour',
                'ketchup',
                'Worcestershire sauce',
                'mustard powder',
                'water',
              ],
            },
            {
              id: 6,
              recipeName: 'General Tso',
              description: "Flied lice and greens i'm game",
              location:
                'http://img.sndimg.com/food/image/upload/h_496,w_661,c_fit/v1/img/recipes/16/47/06/lSfuBJlS6WKSVp6VUkAy_general-tsos-chicken-4.jpg',
              ingredients: [
                'chicken breast',
                'green onions',
                'dried chilies',
                'soy sauce',
                'egg',
                'cornstarch',
                'water',
                'garlic',
                'sugar',
                'white viegar',
                'sherry wine/White wine',
                'chicken broth',
              ],
            },
          ],
        })
      }
  }
  // #region render
  render() {
    const { classes } = this.props
    const {
      isloading,
      recipieslist,
      isAdding,
      isEdit,
      editingRecipe,
    } = this.state
    if (isloading) {
      return <CamperPreloader endCounter={this.endPreload} />
    }

    if (isAdding) {
      return (
        <RecipeInjector
          addRecipe={this.handleAddRecipe}
          isadding
          cancelChanges={this.cancelEditAdd}
          lastItem={recipieslist.length}
        />
      )
    }
    if (isEdit) {
      return (
        <RecipeInjector
          data={editingRecipe}
          isadding={false}
          changerecipe={this.handleEdit}
          cancelChanges={this.cancelEditAdd}
        />
      )
    }
    if (recipieslist.length) {
      return (
        <React.Fragment>
          <Recipies
            data={recipieslist}
            destroyRecipe={this.handleRemoveRecipe}
            editRecipeData={this.changeEdit}
          />
          <Button
            variant="fab"
            color="primary"
            aria-label="add"
            className={classes.button}
            onClick={this.setAddMode}>
            <AddIcon />
          </Button>
        </React.Fragment>
      )
    }
  }
  // #endregion
}
RecipiesBox.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(RecipiesBox)
