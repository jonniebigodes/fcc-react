import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CamperPreloader extends Component {
  state = {
    loadStage: 0,
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.updatePreloadStage(), 500)
  }
  componentWillUnmount() {
    clearTimeout(this.timerID)
  }
  updatePreloadStage = () => {
    if (this.state.loadStage >= 10) {
      this.props.endCounter()
    } else {
      this.setState(prevState => {
        return { loadStage: prevState.loadStage + 1 }
      })
    }
  }
  render() {
    return (
      <p>
        <span>Getting Camper data</span>
      </p>
    )
  }
}
CamperPreloader.propTypes = {
  endCounter: PropTypes.func,
}
export default CamperPreloader
