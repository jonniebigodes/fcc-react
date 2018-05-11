import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from 'material-ui/Table'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    maxWidth: 700,
    minWidth: 350,
  },
  avatar: {
    width: 45,
    height: 45,
    maxWidth: 65,
    maxHeight: 65,
  },
})

class CamperTable extends Component {
  state = {
    currentpage: 0,
    rowsPage: 10,
  }
  handlePageChange = (event, page) => {
    this.setState({ currentpage: page })
  }
  handleChangeRowsPage = event => {
    this.setState({ rowsPage: event.target.value })
  }
  handleSort = () => {
    const { pointsType, dataSorter } = this.props
    dataSorter(pointsType)
  }
  render() {
    const { classes, camperData, pointsType } = this.props
    const { currentpage, rowsPage } = this.state
    return (
      <div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Camper</TableCell>
              <TableCell numeric onClick={this.handleSort}>
                {pointsType === 'recent' ? 'recent' : 'All Time'}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {camperData
              .slice(currentpage * rowsPage, currentpage * rowsPage + rowsPage)
              .map((item, i) => {
                return (
                  <TableRow key={`row_${item.username}`}>
                    <TableCell>{i}</TableCell>
                    <TableCell>
                      <img
                        src={item.img}
                        className={classes.avatar}
                        alt={item.username}
                      />
                    </TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell numeric>
                      {pointsType === 'recent' ? item.recent : item.alltime}
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={camperData.length}
          rowsPerPage={rowsPage}
          page={currentpage}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handlePageChange}
          onChangeRowsPerPage={this.handleChangeRowsPage}
        />
      </div>
    )
  }
}
CamperTable.propTypes = {
  classes: PropTypes.object.isRequired,
  pointsType: PropTypes.string,
  dataSorter: PropTypes.func,
  camperData: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      img: PropTypes.string,
      alltime: PropTypes.number,
      recent: PropTypes.number,
      lastUpdate: PropTypes.string,
    }),
  ),
}
export default withStyles(styles)(CamperTable)
