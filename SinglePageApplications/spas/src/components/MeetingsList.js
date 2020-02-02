import React, { Component } from 'react';
import { GoTrashcan, GoListUnordered } from 'react-icons/go';
import firebase from './Firebase'
import { navigate } from '@reach/router';
import { FaLink } from 'react-icons/fa';


class MeetingsList extends Component 
{
    
    deleteMeeting = (e, meetingID) =>
    {   
        e.preventDefault();        
        const ref =  firebase
        .database().ref(`meetings/${this.props.userID}/${meetingID}`);
        ref.remove();
    }
    render()
    {
        const { meetings } = this.props;
        const myMeetings = meetings.map(item =>
            {
                return(
                    <div className='list-group-item d-flex' key={item.meetingID}>

                        <section className='btn-group align-self-center' role='group' aria-label="Meeting Options">
                             <button className='btn btn-sm btn-outline-secondary' title="Delete Meeting"
                                 onClick={e => this.deleteMeeting(e, item.meetingID)}>
                                     <GoTrashcan />                        
                             </button>
                             <button className='btn btn-sm btn-outline-secondary' title="Check In"
                                 onClick={ ()=> navigate(`checkin/${this.props.userID}/${item.meetingID}`) }>
                                     <FaLink />                        
                             </button>
                             <button className='btn btn-sm btn-outline-secondary' title="Meeting Attendees"
                                 onClick={ ()=> navigate(`attendees/${this.props.userID}/${item.meetingID}`) }>
                                     <GoListUnordered />                        
                             </button>
                        </section>
                        <section className="pl-3 text-left align-self-center">
                            {item.meetingName}
                        </section>
                    </div>
                );
                
            });
     
            return(
            <>
                <div>
                    {myMeetings}
                </div>
            </>
            )        
    }
}


export default MeetingsList;