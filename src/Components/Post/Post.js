import React, { Component } from "react"

class Post extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <li>
                <div>
                    <p className="post-user">{this.props.post.username}</p>
                </div>
            </li>
        )
    }
}

export default Post