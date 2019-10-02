import React, { Component } from 'react'

class Logout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedout: false,
      time: 5
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  submitHandler = (e) => {
    e.preventDefault()

    this.props.doLogout()
    this.setState({ loggedout: true })
  }

  countDown = () => {
    const time = this.state.time

    if(time === 1) {
      clearInterval(this.interval)
      this.setState({ time: 5 })
      this.setState({ loggedout: false })
      this.props.history.push('/')
    } else {
      this.setState(prevState => ({ time: prevState.time - 1}))
    }
  }

  render() {
    if(this.state.loggedout === true) {
      this.interval = setInterval(this.countDown, 1000)

      return (
        <React.Fragment>
          <div className="container">
            <h1 className="text-center">Logging out now...</h1>
            <h5 className="text-center">Going to homepage in { this.state.time } seconds</h5>
          </div>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <div className="container">
          <h1 className="text-center">Logout of the site</h1>

          <div className="row">
            <div className="col-md-2">
            </div>
            <div className="col-md-8 text-center">
              <form onSubmit={ this.submitHandler }>
                <button type="submit" className="btn btn-primary mb-2">Sign Out</button>
              </form>
            </div>
            <div className="col-md-2">
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Logout
