import React, { Component } from "react"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/reducer'

class Nav extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="navbar">
                <section className="profile-info">
                    <img src="https://s3.amazonaws.com/37assets/svn/765-default-avatar.png" height="50px" width="50px" />
                    <p>{this.props.username}</p>
                </section>
                <section className="nav-buttons">
                    <button className="home-button">
                        <Link to='/dashboard'>
                            Home
                    </Link>
                    </button>
                    <button className="newpost-button">
                        <Link to='/new'>
                            New Post
                    </Link>
                    </button>
                </section>
                <button className="logout-button">
                    <Link to='/'>
                        Logout
                    </Link>
                </button>
            </div >
        )
    }
}

const mapStateToProps = reduxState => {
    const { username, profile } = reduxState

    return {
        username,
        profile
    }
}

export default connect(mapStateToProps, { getUser })(Nav)