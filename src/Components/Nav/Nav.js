import React, { Component } from "react"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/reducer'

class Nav extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
        return (
            <div className="navbar">
                <section className="profile-info">
                    <img src="https://i.ya-webdesign.com/images/default-image-png-1.png" height="50px" width="50px" style={{ borderRadius: "100%" }} />
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