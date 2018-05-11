import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import LeaderBoardContainer from '../components/challenges/leaderboard/LeaderBoard'

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
})
const ViewLeaderBoard = ({ classes }) => (
  <div>
    <Helmet title="Super Duper Camper Leaderboard"
      meta={[
        { name: 'description', content: 'freeCodeCamp React Challenges,Leaderboard' },
        { name: 'keywords', content: 'react, gatsby,challenges,react,leaderboard' },
        { name: 'author', content: 'jonniebigodes' },
      ]}/>
    <LeaderBoardContainer />
  </div>
)

ViewLeaderBoard.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withRoot(withStyles(styles)(ViewLeaderBoard))
