import React, { Component } from "react"
import { connect } from 'react-redux'
import Axios from "axios"

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [{
                content: "This is a post",
                username: "User1",
                profile: "https://i.ya-webdesign.com/images/default-image-png-1.png"
            }, {
                content: "This is not a post",
                username: "User3",
                profile: "https://i.ya-webdesign.com/images/default-image-png-1.png"
            }, {
                content: "This is definitely not a post",
                username: "User2",
                profile: "https://i.ya-webdesign.com/images/default-image-png-1.png"
            }],
            search: '',
            userposts: true
        }
    }

    componentDidMount() {
        this.getPosts()
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCheck = (e) => {
        if (!document.getElementById("post-check").checked) {
            this.setState({
                userposts: false
            })
        } else {
            this.setState({
                userposts: true
            })
        }
    }

    getPosts = () => {
        if (this.state.search !== '' && this.state.userposts === true) {
            Axios.get(`/api/posts/${this.props.userId}?userposts=${this.state.userposts}/${this.state.search}`)
                .then(res => {
                    console.log(res.data)
                    this.setState({
                        posts: res.data
                    })
                }).catch(err => console.log(err))
        } else if (this.state.userposts === false && this.state.search === '') {
            Axios.get(`/api/posts/${this.props.userId}?userposts=${this.state.userposts}`)
                .then(res => {
                    this.setState({
                        posts: res.data
                    })
                })
        } else if (this.state.userposts === true && this.state.search === '') {
            Axios.get(`/api/posts/${this.props.userId}?userposts=${this.state.userposts}`)
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
        const postMapper = this.state.posts.map((post) => {
            return (
                <div>
                    <section className="posts">
                        {post.content}&nbsp;
                    {post.username}&nbsp;
                    <img src={post.profile} height="25px" width="25px" style={{ borderRadius: "100%" }} />
                    </section>
                </div>
            )
        })
        return (
            <div className="dashboard">
                <div className="main-posts">
                    <section className="search-bar">
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
                            name="userpostscheck"
                            id="post-check"
                            defaultChecked
                            onClick={this.handleCheck}
                        /> My Posts
                    </section>
                    <div className="posts-box">
                        {postMapper}
                    </div>
                </div>
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