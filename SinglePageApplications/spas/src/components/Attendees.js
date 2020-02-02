import React, { Component } from 'react';
import firebase from './Firebase';

import AttendeeList from './AttendeeList'

class Attendees extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            displayAttendees : [],
            searchQuery : '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    
    componentDidMount()
    {
        const ref = firebase.database()
        .ref(`meetings/${this.props.userID}/${this.props.meetingID}/attendees`);

        ref.on('value', snapshot =>
        {
            let attendees = snapshot.val();
            let attendeesList = [];
            for(let item in attendees)
            {
                attendeesList.push({
                    attendeesID : item,
                    attendeeName : attendees[item].attendeeName,
                    attendeeEmail : attendees[item].attendeeEmail,
                    star : attendees[item].star,
                });
            }

            this.setState({
                displayAttendees : attendeesList
            });
        })
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
    };

    render()
    {

        const filter = item =>
         item.attendeeName.toLowerCase()
         .match(this.state.searchQuery.toLowerCase() )&& true;
        const filteredAttendees = this.state.displayAttendees.filter(filter)
        return(
            <>
                <div className="container mt-4 justify-content-center">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <h1 className="font-weight-light text-center">
                                Attendees
                            </h1>

                            <div className='card bg-light mb-4'>
                                <div className='card-body text-center'>
                                    <input 
                                    type='text' 
                                    className='form-control'
                                    name='searchQuery' 
                                    value={this.state.searchQuery}  
                                    placeholder='Search Attendees'
                                    onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <AttendeeList 
                     userID={this.props.userID} 
                     adminUser={this.props.adminUser}
                     attendees={filteredAttendees}
                     meetingID={this.props.meetingID}
                     />
                </div>
            </>
        )
    }
}

export default Attendees;