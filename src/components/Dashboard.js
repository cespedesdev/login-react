import React, { Component } from 'react'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Dashboard extends Component {
    logOut =() => {
        cookies.remove('name');
        cookies.remove('token');
        window.location.href="./login";
    }

    componentDidMount() {
        if(!cookies.get('token')){
            window.location.href="./login";
        }
    }

    render() {
        console.log(cookies.get('name'));
        console.log(cookies.get('token'));
        return (
            <div>
                Dashboard
                <button onClick={()=>this.logOut()}> Cerrar Sesión </button>
            </div>
        )
    }
}
export default Dashboard

