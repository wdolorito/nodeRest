import React, { Component } from 'react'

class Logout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedout: false
    }
  }

  submitHandler = (e) => {
    e.preventDefault()

    this.props.doLogout()
    this.setState({ loggedout: true })
  }

  render() {
    if(this.state.loggedout) {
      setTimeout(() => {
        this.props.history.push('/')
      }, 5000)

      return (
        <React.Fragment>
          <div className="container">
            <h1 className="text-center">Logging out now...</h1>
            <h5 className="text-center">Going to homepage in 5 seconds</h5>
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
            <div className="col-md-8">
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
