import React, {Component} from 'react';
import { userServices } from '../services/userServices';

export default class PruebaUser extends Component{
  constructor(){
    super();
    this.state = {};
    this.userServices = new userServices();
  }

  componentDidMount(){
    this.userServices.getAll().then(data => {
      console.log(data)
    })
  }

  render(){
    return(
      <>
       <h1> HOLA MUNDO </h1>
      </>
    )
  }
}