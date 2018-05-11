import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import RecipiesBox from '../components/challenges/recipies/RecipiesBox'
import withRoot from '../withRoot'

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
})
const viewRecipes = ({ classes }) => (
  <div>
    <Helmet title="Super Duper Recipes Box"
      meta={[
        { name: 'description', content: 'freeCodeCamp React Challenges, Recipes, Box' },
        { name: 'keywords', content: 'react, gatsby,challenges,react,recipes' },
        { name: 'author', content: 'jonniebigodes' },
      ]}/>
    <RecipiesBox />
  </div>
  
)
viewRecipes.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withRoot(withStyles(styles)(viewRecipes))
