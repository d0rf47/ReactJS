import React, { Component } from 'react';
import firebase from './Firebase';
import FormError from './FormError';
import {navigate} from '@reach/router'


class Login extends Component 
{
    constructor(props)
    {   
        //makes all props from this component available in the main component 
        super(props);
        this.state = 
        {
            email : '',
            password: '',
            errorMsg : null
        }
        //this.handleChange = this.handleChange.bind();
    };

    handleChange = (e) =>
    {
        const itemName = e.target.name;
        const itemVal =  e.target.value;

        this.setState(
            {
                [itemName] : itemVal
            }
        )
    }

    handleSubmit = (e) =>
    {
        let registrationInfo =
        {
            email : this.state.email,
            password : this.state.password
        };
        e.preventDefault();

        firebase.auth().signInWithEmailAndPassword(
            registrationInfo.email,
            registrationInfo.password
        ).then(()=>
        {
            navigate('/meetings')
        })
        .catch(err => 
        {
            if(err.message !== null)
            {
                this.setState({errorMsg : err.message})
            }
            else
            {
                this.setState({errorMsg : null })
            }
        })
    }


    render()
    {            
    return(
        <>
        <form className="mt-3" onSubmit={this.handleSubmit} >
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card bg-light">
                    <div className="card-body" style={{textAlign:'center'}}>
                        <h3 className="font-weight-light mb-3">Log in</h3>
                        <section className="form-group">
                        {
                          this.state.errorMsg !== null ? (
                              <FormError theMessage = {this.state.errorMsg} />
                          )  : null 
                        }
                        <label
                            className="form-control-label sr-only"
                            htmlFor="Email">
                            Email
                        </label>
                        <input
                            required
                            className="form-control"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        </section>
                        <section className="form-group">
                        <input
                            required
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        </section>
                        <div className="form-group text-right mb-0">
                        <button className="btn btn-primary" type="submit">
                            Log in
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </form>
     </>
    )        
  }
}


export default Login;