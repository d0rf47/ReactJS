import  React, { Component } from 'react';
import firebase from './Firebase';
import { GoTrashcan, GoStar, GoMail } from 'react-icons/go';

class AttendeeList extends Component
{
    constructor(props)
    {
        super(props);
        this.deleteAttendee = this.deleteAttendee.bind(this);
    }
    

    toggleStar = (e,star, meetingID, attendeesID) =>
    {
        e.preventDefault();
        const adminUser = this.props.adminUser;
        const ref = firebase.database()
                    .ref(`meetings/${adminUser}/${meetingID}/attendees/${attendeesID}/star`);

        if(star === undefined)  
        {
            ref.set(true);
        }
        else
        {
            ref.set(!star)
        }
    };
    deleteAttendee = (e, meetingID, attendeesID) =>
    {
        e.preventDefault();
        const adminUser = this.props.adminUser;
        const ref = firebase.database()
                    .ref(`meetings/${adminUser}/${meetingID}/attendees/${attendeesID}`);
                    ref.remove();
    }
    render()
    {
        const admin = (this.props.adminUser === this.props.userID) ? true : false;
        const attendees =  this.props.attendees;
        const totalAttendees = attendees.map(item =>
            {
              return(
                <div className="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1" key={item.attendeesID} >
                    <div className="card">                        
                            <div className={
                                'card-body px-3 py-2 d-flex align-items-center ' +
                                    (admin ? '' : 'justify-content-center')
                            }>
                            {admin && (
                                <div className="btn-group pr-2">
                                    <button  title="Star Attendee"  className={
                                        "btn btn-sm " + (item.star ? 'btn-info' : 'btn-outline-secondary')}        
                                        onClick={e => this.toggleStar(e, item.star, this.props.meetingID, item.attendeesID)}
                                    >                                    
                                    <GoStar />
                                    </button>                                                  
                                    <a  href={`mailto:${item.attendeeEmail}`} className='btn btn-sm btn-outline-secondary' title='Email Attendee'>
                                        <GoMail />
                                    </a>
                                    <button title='Delete Attendee'  className="btn btn-sm btn-outline-secondary"                                
                                        onClick={e => this.deleteAttendee(e, this.props.meetingID, item.attendeesID)}
                                    >
                                    <GoTrashcan />
                                    </button>
                                </div>                                  
                            )}                             
                            <div>{item.attendeeName}</div>
                        </div>
                    </div>
                </div>
              );
            });


        return(
            <>
                <div className="row justify-content-center" >                
                    {totalAttendees}
                </div>
            </>
        )
    }
}   

export default AttendeeList;