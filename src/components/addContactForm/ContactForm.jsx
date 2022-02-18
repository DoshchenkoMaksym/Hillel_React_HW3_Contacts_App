import React from 'react';
import { Link } from 'react-router-dom';

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            shouldRedirect: false
        }
    };

    handlerUserDataChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };

    componentDidUpdate() {
        
        for (let key in this.state) {
            
            if (this.state[key] === '' && this.state.shouldRedirect) {
                this.props.updateContacts()       
                this.props.redirectFunc()
            } else { 
                return null
            }
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.addPost.bind(this)}>
                    <label>
                        First Name:
                        <input 
                        value={this.state.firstName}
                        type="text" 
                        name="firstName" 
                        onChange={this.handlerUserDataChange} />
                    </label>
                    <label>
                        Last Name:
                        <input 
                        value={this.state.lastName}
                        type="text" 
                        name="lastName" 
                        onChange={this.handlerUserDataChange} />
                    </label>
                    <label>
                        Phone number:
                        <input 
                        value={this.state.phoneNumber}
                        type="text" 
                        name="phoneNumber" 
                        onChange={this.handlerUserDataChange} />
                    </label>
                        <button type='submit'>Сохранить</button>
                    <Link to='/'>
                        <button>Отмена</button>
                    </Link>
                </form>
            </div>
        )

    }
};

export default ContactForm;