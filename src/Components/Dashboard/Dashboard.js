import React, { Component } from "react"
import { connect } from 'react-redux'
import Axios from "axios"

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            search: '',
            userposts: true
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getPosts = () => {
        if (this.state.search != '') {
            Axios.get(`/api/posts/${this.props.userId}/${this.state.search}`)
                .then(res => {
                    this.setState({
                        posts: res.data
                    })
                }).catch(err => console.log(err))
        } else if (this.state.userposts) {
            Axios.get(`/api/posts/${this.props.userId}/?=true`)
                .then(res => {
                    this.setState({
                        posts: res.data
                    })
                })
        }
    }

    // resetSearch = () => {
    //     if ()
    // }

    render() {
        const postMapper = this.state.posts.map((post, index) => {
            return (
                <div>
                    {postMapper}
                </div>
            )
        })
        return (
            <div className="dashboard">
                <input
                    placeholder="Search"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleInput}
                />
                <button>
                    Search
                </button>
                <button>
                    Reset
                </button>
                <input
                    type="checkbox"
                    value={this.state.userposts}
                    name="userposts"
                    defaultChecked
                /> My Posts
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const { userId } = reduxState

    return {
        userId
    }
}

export default connect(mapStateToProps)(Dashboard)