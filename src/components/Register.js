import axios from 'axios'
import React, { Component } from 'react'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

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
            return response
        }).then( response => {
            alert('Gracias por registrarse');
            window.location.href="/";
        }
        ).catch(
            error => {
                console.log(error)
            }
        )
        console.log(this.state)
    }

    componentDidMount() {
        if(cookies.get('token')){
            window.location.href="./dashboard";
        }
    }
    render() {     
        const {name, email, password, c_password} = this.state
        return (
            <div className="container text-center">
                <div className="form-signin">
                    <form onSubmit={this.submitHandler} className="mx-auto py-5">
                    <h1 className="h3 mb-3 fw-normal py-3">Registrarse</h1>
                        <div className="form-floating py-">
                            <input type="name" className="form-control" id="floatingText" placeholder="Nombre" name="name" value={name} onChange={this.changeHandler}/>
                            <label htmlFor="floatingInput">Nombre</label>
                        </div>
                        <div className="form-floating py-1">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" value={email} onChange={this.changeHandler}/>
                            <label htmlFor="floatingInput">Dirección de Email</label>
                        </div>
                        <div className="form-floating py-1">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" value={password} onChange={this.changeHandler}/>
                            <label htmlFor="floatingPassword">Contraseña</label>
                        </div>
                        <div className="form-floating py-1">
                            <input type="password" className="form-control" id="FloatingConfirmPassword" placeholder="Confirm Password" name="c_password" value={c_password} onChange={this.changeHandler}/>
                            <label htmlFor="floatingPassword">Confirme la contraseña</label>
                        </div>
                        <button className="btn btn-lg btn-success my-3" type="submit">Registrar</button>
                        <button className="btn btn-lg btn-secondary my-3 mx-1" type="button" onClick={()=> {window.location.href="./"}}>Volver atrás</button>
                    </form>
                </div> 
            </div>
        )
    }
}

export default Register
