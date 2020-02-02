import React, { Component } from 'react';

class Welcome extends Component 
{
    render()
    {
        const {user}  =  this.props;
     
            return(
            <>
            <div className='mt-4' style={{textAlign : "center"} }>
                <div className='text-secondary font-weight-bold pl-1'>
                    Welcome {user}               
                </div>
                <a href="/" className="text-primary font-weight-bold pl-1">
                    Log Out
                </a>
            </div>
            </>
            )        
    }
}


export default Welcome;