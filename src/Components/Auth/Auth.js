import React, { Component } from "react"
import Axios from "axios"
import { connect } from 'react-redux'
import { getUser } from '../../ducks/reducer'
import { Link } from 'react-router-dom'

class Auth extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRegister = () => {
        const { username, password } = this.state
        Axios.post('/api/register', {
            username,
            password
        })
            .then(res => {
                this.props.getUser(res.data)
                this.props.history.push('/dashboard')
            })
            .catch(err => console.log(err))
    }

    handleLogin = () => {
        const { username, password } = this.state
        Axios.post('/api/login', {
            username,
            password
        })
            .then(res => {
                this.props.getUser(res.data)
                this.props.history.push('/dashboard')
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <input
                    maxLength='20'
                    placeholder='Enter Username'
                    name='username'
                    onChange={this.handleInput}
                />
                <input
                    type='password'
                    maxLength='20'
                    placeholder='Enter Password'
                    name='password'
                    onChange={this.handleInput}
                />
                <button onClick={this.handleLogin}>
                    Login
                </button>
                <button onClick={this.handleRegister}>
                    Register
                </button>
            </div>
        )
    }
}

export default connect(null, { getUser })(Auth)