  
import React from 'react';
import {Redirect} from "react-router";

function IsAuth(props) {
    const {Component} = props
    if(!props.isAuth) {
        return  <Redirect to={'/'} />
    }
    return (
        <Component />
    );
}

export default IsAuth;