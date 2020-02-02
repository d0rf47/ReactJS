import React, { Component } from 'react';
import firebase from './Firebase'
import FormError from './FormError'

class Register extends Component 
{
    constructor(props)
    {   
        //makes all props from this component available in the main component 
        super(props);
        this.state = 
        {
            displayName : '',
            email : '',
            passOne : '',
            passTwo : '',
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
            },
            ()=>
            {
                if(this.state.passOne !== this.state.passTwo)
                {
                    this.setState(
                    {
                        errorMsg : 'Passwords do not Match'
                    })
                }
                else
                {
                    this.setState({errorMsg : null})
                }
            }
        )
    }

    handleSubmit = (e) =>
    {
        let registrationInfo =
        {
            displayName : this.state.displayName,
            email : this.state.email,
            password : this.state.passOne
        }
        e.preventDefault();

        firebase.auth().createUserWithEmailAndPassword(
            registrationInfo.email,
            registrationInfo.password
        ).then(()=>
        {
            this.props.registerUser(registrationInfo.displayName);
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
     <form className="mt-3" onSubmit = { this.handleSubmit }>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card bg-light">
                <div className="card-body">
                  <h3 className="font-weight-light mb-3">Register</h3>
                  <div className="form-row">
                      {
                          this.state.errorMsg !== null ? (
                              <FormError theMessage = {this.state.errorMsg} />
                          )  : null 
                      }
                    <section className="col-sm-12 form-group">
                      <label className="form-control-label sr-only" htmlFor="displayName">
                            Display Name
                        </label>
                      <input
                        className="form-control"
                        type="text"
                        id="displayName"
                        placeholder="Display Name"
                        name="displayName"
                        value = {this.state.displayName}
                        onChange = {this.handleChange}
                        required
                      />
                    </section>
                  </div>
                  <section className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      placeholder="Email Address"
                      required
                      name="email"
                      value = {this.state.email}
                      onChange = {this.handleChange}
                    />
                  </section>
                  <div className="form-row">
                    <section className="col-sm-6 form-group">
                      <input
                        className="form-control"
                        type="password"
                        name="passOne"
                        placeholder="Password"
                        value = {this.state.passOne}
                        onChange = {this.handleChange}
                      />
                    </section>
                    <section className="col-sm-6 form-group">
                      <input
                        className="form-control"
                        type="password"
                        required
                        name="passTwo"
                        placeholder="Repeat Password"
                        value = {this.state.passTwo}
                        onChange = {this.handleChange}
                      />
                    </section>
                  </div>
                  <div className="form-group text-right mb-0">
                    <button className="btn btn-primary" type="submit">
                      Register
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


export default Register;