import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import GameContainer from '../components/challenges/gameoflife/GameContainer'

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
})

const viewgameoflife = ({ classes }) => (
  <div>
    <Helmet title="Super Duper Game of life"
      meta={[
        { name: 'description', content: 'freeCodeCamp React Challenges,game of life' },
        { name: 'keywords', content: 'react, gatsby,challenges,react,game,life' },
        { name: 'author', content: 'jonniebigodes' },
      ]}/>
    <GameContainer />
  </div>
)
viewgameoflife.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withRoot(withStyles(styles)(viewgameoflife))
