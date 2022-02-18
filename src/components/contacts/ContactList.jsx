import React from 'react';
import style from './Contacts.module.css';
import { Link } from 'react-router-dom'
class ContactList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <div className={style.contacts__main}>
                    <div className={style.contacts__header}>
                        <div>First Name</div>
                        <div>Last Name</div>
                        <div>Phone Number</div>
                    </div>
                    {this.props.state.map(item => {
                        return (
                            <div className={style.contacts__item} key={item.id}>
                                <div>{item.firstName}</div>
                                <div>{item.lastName}</div>
                                <div>{item.phoneNumber}</div>
                                <button className={style.contacts__deleteButton} id={item.id} onClick={this.props.contactDelete}>Delete</button>
                            </div>
                        )
                    })}
                </div>

                <Link  to='/form' onClick={this.props.toggleValidation}>
                    <button className={style.contacts__toForm}>Form to add contact</button>

                </Link>
            </>
        )

    }
}

export default ContactList;