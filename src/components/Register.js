import axios from 'axios'
import React, { Component } from 'react'
import Cookies from 'universal-cookie';

// Declaración de la variable para almacenar las cookies
const cookies = new Cookies();

class Register extends Component {
    constructor(props) {
        super(props)    
        this.state = {
             name: '',
             email: '',
             password: '',
             c_password: '',
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
        let c_password = this.state.c_password;
        let name = this.state.name;

        let errors = {};
        let formIsValid = true;

        //Esta condicional explica que si el campo "name" es menor o igual a 1, asigne un error al array "errors"
        if(name.length <= 1){
            formIsValid = false;
            errors["name"] = "Cannot be empty";
         }

        //Esta condicional explica que si el campo "password" es menor o igual a 1, asigne un error al array "errors"
        if(password.length < 1){
           formIsValid = false;
           errors["password"] = "Cannot be empty";
        }
        //Esta condicional explica que si el campo "password" es menor o igual a 6, asigne un error al array "errors"
        if(password.length < 6){
            formIsValid = false;
            errors["password"] = "La contraseña debe tener al menos 6 caracteres.";
         }

        //Esta condicional explica que si el campo "c_password" no coincide con el campo "password", asigne un error al array "errors"
        if(c_password != password){
            formIsValid = false;
            errors["c_password"] = "Las contraseñas no coinciden";
         }
     
        //Validación de que el email no esté en blanco o indefinido
        if(email === "undefined"){
           formIsValid = false;
           errors["email"] = "Cannot be empty";
        }
        //Mediante esta condicional se observa el formato correcto del email
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

   //Esta función maneja el envio del formulario a ser procesado por la Api
    submitHandler = (e) => {

        if(!this.handleValidation()){
            alert("Por favor, rellene bien los campos.");
         }else{
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
    }

    //ciclo de vida del componente
    componentDidMount() {
        //Evalua si las cookies tienen un valor llamado token asignado
        if(cookies.get('token')){
            window.location.href="./dashboard";
        }
    }
    //Renderización del formulario
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
