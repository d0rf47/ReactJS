import React, { Component } from 'react';
import {Link} from '@reach/router'

class Welcome extends Component 
{
    render()
    {
        const {userName, logOutUser}  =  this.props;
     
            return(
            <>
            <div className='mt-4' style={{textAlign : "center"} }>
                <div className='text-secondary font-weight-bold pl-1'>
                    Welcome {userName}               
                </div>
                <Link to='/login' className="text-primary font-weight-bold pl-1" onClick={e => logOutUser} >
                    Log Out
                </Link>
            </div>
            </>
            )        
    }
}


export default Welcome;