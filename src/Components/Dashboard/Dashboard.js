import React, { Component } from "react"

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
                    name="myposts"
                    defaultChecked
                /> My Posts
            </div>
        )
    }
}

export default Dashboard