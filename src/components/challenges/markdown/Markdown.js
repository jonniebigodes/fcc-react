import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import marked from 'marked'

const styles = theme => ({
  root: {
    margin: '0 auto',
  },
  title:{
    marginTop:theme.spacing.unit,
    marginBottom:theme.spacing.unit*2
  },
  paperMarkDown: {
    width: 400,
    height: 300,
  },
})
class MarkDownContainer extends Component {
  state = {
    content: '',
    markedcontent: '',
  }
  componentDidMount() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
    })
  }
  handleText = e => {
    const textItem = e.target.value
    const markeditem = marked(textItem, { sanitize: true })
    this.setState({ content: textItem, markedcontent: markeditem })
  }
  render() {
    const { content, markedcontent } = this.state
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.title}>
          <Typography component="p" ariant="title" gutterBottom align="center">
                Super Duper Markdown Previewer 
          </Typography>
        </div>
        
        <Grid container spacing={40} justify="center" direction="row">
          <Grid item xs={12} sm={6}>
            <TextField
              helperText="Start writing your markdown here"
              margin="dense"
              value={content}
              fullWidth
              multiline
              rows={8}
              rowsMax={32}
              onChange={this.handleText}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paperMarkDown}>
              <span dangerouslySetInnerHTML={{ __html: markedcontent }} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}
MarkDownContainer.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(MarkDownContainer)
