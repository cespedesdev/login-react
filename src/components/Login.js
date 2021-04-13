import axios from 'axios'
import React, { Component } from 'react'
import Cookies from 'universal-cookie';

// Declaración de la variable para almacenar las cookies
const cookies = new Cookies();

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email: '',
             password: '',
             errors: {}

        }
    }

    
    //Mediante esta función se asigna cualquier cambio realizado en los campos
    changeHandler = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    //Mediante esta fuynción se validan los campos del formulario
    handleValidation(){
        let email = this.state.email;
        let password = this.state.password;

        let errors = {};
        let formIsValid = true;

        //Verificación de que la contraseña no esté en blanco
        if(password.lengt < 1){
           formIsValid = false;
           errors["password"] = "Cannot be empty";
        }
     
        //Verificación de que el email no esté en blanco
        if(email === "undefined"){
           formIsValid = false;
           errors["email"] = "Cannot be empty";
        }
        //Verificación de que el email tenga un formato correcto
        if(typeof email !== "undefined"){
           let lastAtPos = email.lastIndexOf('@');
           let lastDotPos = email.lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = "Email is not valid";
            }
       }  
       //Se fijan los errores
       this.setState({errors: errors});
       return formIsValid;
   }
   //Esta función maneja la petición a la api
    submitHandler = async(e) => {
        //Evalua si los campos están mal llenos
        if(!this.handleValidation()){
            alert("Por favor, rellene bien los campos.");
         }
        else{
            e.preventDefault();
            await axios.post('http://localhost:8000/api/login', {email: this.state.email, password: this.state.password}).then(response => {
                return response
            }).then(
                response => {
                    console.log(response.data.name);
                    if(response.data.name != null){
                        var respuesta = response.data;
                        //fijan el valor de las cookies para verificar el inicio de sesión
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
            console.log(this.state.errors)
        }
        
    }
    //ciclo de vida del componente
    componentDidMount() {
        //Evalua si las cookies tienen un valor llamado token asignado
        if(cookies.get('token')){
            window.location.href="./dashboard";
        }
    }
    
    //Visualización del formulario
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

