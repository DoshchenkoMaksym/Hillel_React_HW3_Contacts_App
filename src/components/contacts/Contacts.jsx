import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ContactForm from '../addContactForm/ContactForm';
import ContactList from './ContactList';
import ContactsLoading from './ContactsLoading';
class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validation: false
        };

    };

    async componentDidMount() {
        let url = 'https://620e6a08585fbc3359e1c2b5.mockapi.io/contacts';
        let response = await fetch(url);
        let data = await response.json();
        this.setState({ data })
    };

    async contactDelete(event) {
        let urlFroDelete = `https://620e6a08585fbc3359e1c2b5.mockapi.io/contacts/${event.target.id}`;
        let responseForDelete = await fetch(urlFroDelete, {
            method: 'DELETE'
        });
        let url = 'https://620e6a08585fbc3359e1c2b5.mockapi.io/contacts';
        let response = await fetch(url);
        let items = await response.json();
        this.setState({ data: items })
    };

    async updateContacts() {
        let url = 'https://620e6a08585fbc3359e1c2b5.mockapi.io/contacts';
        let response = await fetch(url);
        let data = await response.json();
        this.setState({ data: data })
    }
    async addPost(event) {
        event.preventDefault()
        let url = 'https://620e6a08585fbc3359e1c2b5.mockapi.io/contacts';
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        this.setState({
            firstName: '',
            lastName: '',
            phoneNumber: '',
            shouldRedirect: true
        });
    };

    changeValidationAfterRedirect = () => {

        this.setState({validation: false})

    };

    changeValidationForRedirect = () => {

        this.setState({validation: true})
        
    };

    render() {
        
        return (  
            <>
            <Routes>
                {
                    this.state.hasOwnProperty('data')
                        ? <Route path='/' element={<ContactList state={this.state.data} contactDelete={this.contactDelete.bind(this)} toggleValidation={this.changeValidationAfterRedirect.bind(this)}/> }/> 
                        : <Route path='/' element={<ContactsLoading />} /> 
                }
                <Route path='/form' element={this.state.validation 
                ? <Navigate to='/'/>
                : <ContactForm addPost={this.addPost} redirectFunc={this.changeValidationForRedirect.bind(this)} updateContacts={this.updateContacts.bind(this)}/>}/> 
               
            </Routes>
            
            </>
        )
    }
};


export default Contacts;