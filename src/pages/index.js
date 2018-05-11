import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Link from 'gatsby-link'
import withRoot from '../withRoot'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paperitem: {
    height: 250,
    width: 250,
    padding: '0px 1.0875rem 1.45rem',
    boxShadow: '3px 0px 5px 0px rgba(69,77,89,1)',
  },
})
const IndexPage = ({ classes }) => (
  <Grid container className={classes.root} spacing={16}>
    <Grid item xs={12}>
      <Typography gutterBottom component="p" variant="display3">
        freeCodecamp React Challenges
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Grid container className={classes.root} spacing={40}>
        {[
          { name: 'Markdown Project', linkLocation: '/viewmarked/' },
          { name: 'Leaderboard Project', linkLocation: '/viewleader/' },
          { name: 'Recipies Project', linkLocation: '/viewrecipies/' },
          { name: 'Game of Life Project', linkLocation: '/viewgameoflife/' },
          { name: 'Dungeon Crawler Project', linkLocation: '/viewdungeon/' },
        ].map(item => (
          <Grid item key={`pr_:${item.name}`} xs={12} sm={6}>
            <Paper key={`pholder_${item.name}`}>
              <Typography
                component="p"
                variant="title"
                gutterBottom
                align="center">
                Placeholder to get you to the...
              </Typography>
              <Link to={item.linkLocation}>
                <Typography
                  component="h4"
                  variant="subheading"
                  gutterBottom
                  align="center">
                  {item.name}
                </Typography>
              </Link>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
)
IndexPage.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withRoot(withStyles(styles)(IndexPage))
