import React, { Component } from 'react';


import firebase from './Firebase';
import AttendeeList from './AttendeeList'
import { FaUndo, FaRandom } from 'react-icons/fa';

class Attendees extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            displayAttendees : [],
            searchQuery : '',
            allAttendees : []
        }
        this.handleChange = this.handleChange.bind(this);
        this.resetQuery = this.resetQuery.bind(this);
        this.chooseRandom = this.chooseRandom.bind(this);
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
                displayAttendees : attendeesList,
                allAttendees : attendeesList
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

    resetQuery =() =>
    {
        this.setState({
            searchQuery : '',
            displayAttendees : this.state.allAttendees
        });
    };

    chooseRandom = () =>
    {
        const randomNum = Math.floor(Math.random() * this.state.allAttendees.length);
        this.resetQuery();
        this.setState({
            displayAttendees : [this.state.allAttendees[randomNum]]
        })
    }

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
                                <div className='input-group input-group-lg'>
                                <input 
                                    type='text' 
                                    className='form-control'
                                    name='searchQuery' 
                                    value={this.state.searchQuery}  
                                    placeholder='Search Attendees'
                                    onChange={this.handleChange}
                                    />
                                <div className='input-group-append'>
                                    <button 
                                    className='btn btm-sm btn-outline-info' 
                                    title='Reset Query'
                                    onClick={this.resetQuery}
                                    >
                                    <FaUndo />
                                    </button>
                                    <button 
                                    className='btn btm-sm btn-outline-info' 
                                    title='Random Attendee'
                                    onClick={this.chooseRandom}
                                    >
                                    <FaRandom />
                                    </button>
                                </div>
                                </div>                                    
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