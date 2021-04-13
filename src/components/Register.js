import axios from 'axios'
import React, { Component } from 'react'


class Register extends Component {
    constructor(props) {
        super(props)    
        this.state = {
             name: '',
             email: '',
             password: '',
             c_password: ''
        }
    }
    
    changeHandler = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/register', this.state).then(response => {
            console.log(response)
        }).catch(
            error => {
                console.log(error)
            }
        )
        console.log(this.state)
    }
    render() {     
        const {name, email, password, c_password} = this.state
        return (
            <div className="text-center">
                <div className="form-signin">
                    <form onSubmit={this.submitHandler}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    <div className="form-floating">
                            <input type="name" className="form-control" id="floatingText" placeholder="Nombre" name="name" value={name} onChange={this.changeHandler}/>
                            <label htmlFor="floatingInput">Name</label>
                        </div>
                        <div className="form-floating">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" value={email} onChange={this.changeHandler}/>
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" value={password} onChange={this.changeHandler}/>
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="FloatingConfirmPassword" placeholder="Confirm Password" name="c_password" value={c_password} onChange={this.changeHandler}/>
                            <label htmlFor="floatingPassword">Confirm Password</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Registrar</button>
                    </form>
                </div> 
            </div>
        )
    }
}

export default Register
