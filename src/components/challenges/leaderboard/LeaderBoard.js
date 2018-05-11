import Tabs, { Tab } from 'material-ui/Tabs'
import { withStyles } from 'material-ui/styles'
import React, { Component } from 'react'
import CamperPreloader from '../../preloader/CamperPreloader'
import CamperTable from './CamperTable'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
})
class LeaderBoardContainer extends Component {
  state = {
    selectedtab: 0,
    recent: [],
    recentReversed: false,
    topalltime: [],
    allReversed: false,
    isloading: true,
    iserror: false,
  }
  componentDidMount() {
    this.fetchRecent()
    this.fetchAll()
  }
  handlerTabChange = (event, value) => {
    this.setState({ selectedtab: value })
  }
  sortData = value => {
    if (value === 'recent') {
      const sortRecentArray = [...this.state.recent]
      if (this.state.recentReversed) {
        sortRecentArray.reverse()
      } else {
        sortRecentArray.sort((x, y) => x.recent - y.recent)
      }
      this.setState({
        recent: sortRecentArray,
        recentReversed: !this.state.recentReversed,
      })
    } else {
      const sortAllTimeArray = [...this.state.topalltime]
      if (this.state.allReversed) {
        sortAllTimeArray.reverse()
      } else {
        sortAllTimeArray.sort((x, y) => x.alltime - y.alltime)
      }
      this.setState({
        topalltime: sortAllTimeArray,
        allReversed: !this.state.allReversed,
      })
    }
  }
  fetchAll() {
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
      .then(response => {
        return response.json()
      })
      .then(result => {
        this.setState({ topalltime: result })
      })
      .catch(error => {
        console.log('====================================')
        console.log(
          `error leaderBoard all time data:${JSON.stringify(error, null, 2)}`,
        )
        console.log('====================================')
        this.setState({ iserror: true })
      })
  }
  fetchRecent() {
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
      .then(response => {
        return response.json()
      })
      .then(result => {
        this.setState({ recent: result })
      })
      .catch(err => {
        console.log('====================================')
        console.log(
          `error leaderBoard recent data:${JSON.stringify(err, null, 2)}`,
        )
        console.log('====================================')
      })
  }
  endPreload = () => {
    this.setState({ isloading: false })
  }
  render() {
    const { iserror, isloading, recent, topalltime, selectedtab } = this.state
    if (iserror) {
      return <span>Lights up the sirens.....Something went wrong</span>
    }
    if (isloading) {
      return <CamperPreloader endCounter={this.endPreload} />
    }
    if (recent.length) {
      return (
        <div className={styles.root}>
          <p>
            <span> freeCodeCamper brownie points</span>
          </p>
          <Tabs
            onChange={this.handlerTabChange}
            centered
            value={selectedtab}
            indicatorColor="primary"
            textColor="primary">
            <Tab label="Recent Brownies" />
            <Tab label="All Brownies" />
          </Tabs>
          {selectedtab === 0 ? (
            <CamperTable
              pointsType="recent"
              dataSorter={this.sortData}
              camperData={recent}
            />
          ) : (
            <CamperTable
              pointsType="all"
              dataSorter={this.sortData}
              camperData={topalltime}
            />
          )}
        </div>
      )
    }
  }
}
export default withStyles(styles)(LeaderBoardContainer)
