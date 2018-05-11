import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import withRoot from '../withRoot'
import MarkDownContainer from '../components/challenges/markdown/Markdown'

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
})
const MarkedChallengePage = ({ classes }) => (
  <div>
    <Helmet title="Super Duper Markdown Parser"
      meta={[
        { name: 'description', content: 'freeCodeCamp React Challenges, Markdown Parser' },
        { name: 'keywords', content: 'react, gatsby,challenges,react,markdown,parser' },
        { name: 'author', content: 'jonniebigodes' },
      ]}/>
    <MarkDownContainer />
  </div>

)
MarkedChallengePage.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withRoot(withStyles(styles)(MarkedChallengePage))
