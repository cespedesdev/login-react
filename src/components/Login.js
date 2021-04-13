import axios from 'axios'
import React, { Component } from 'react'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email: '',
             password: ''
        }
    }
    
    changeHandler = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    submitHandler = async(e) => {
        e.preventDefault()
        await axios.post('http://localhost:8000/api/login', {email: this.state.email, password: this.state.password}).then(response => {
            return response
        }).then(
            response => {
                console.log(response.data.name);
                if(response.data.name != null){
                    var respuesta = response.data;
                    cookies.set('name', respuesta.name, {path: "/"});
                    cookies.set('token', respuesta.token, {path: "/"});
                    alert('Bienvenido ' + respuesta.name);
                    window.location.href="./dashboard"

                }
                else{
                    alert('Usuario y contraseña no es correcto');
                }
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
        const {email, password} = this.state
        return (
            <div className="container py-5 text-center">
                <main className="form-signin">
                    <form onSubmit={this.submitHandler} className="mx-auto">
                    <h1 className="h3 mb-3 fw-normal">Inicie Sesión</h1>
                        <div className="form-floating py-1">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name="email" value={email} onChange={this.changeHandler}/>
                            <label htmlFor="floatingInput">Dirección de email</label>
                        </div>
                        <div className="form-floating py-1">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" value={password} onChange={this.changeHandler}/>
                            <label htmlFor="floatingPassword">Contraseña</label>
                        </div>
                        <div className="checkbox mb-3">
                            <label>
                                ¿No tiene cuenta? <a href="./register">Haga click aquí para registrarse</a>
                            </label>
                        </div>
                        <button className="btn btn-lg btn-primary" type="submit">Iniciar</button>
                    </form>
                </main> 
            </div>
        )
    }
}

export default Login

