import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllContactInquery = () => {
    const [contacts, setContacts] = useState([]);

    // Fetch all contacts when the component is mounted
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('https://api.panchgavyamrit.com/api/all-contacts');
                setContacts(response.data.contacts);
            } catch (err) {
                console.error('Failed to fetch contacts:', err);
            }
        };

        fetchContacts();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString(); // Format as 'MM/DD/YYYY, HH:MM:SS'
    };


    // Delete a contact
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://api.panchgavyamrit.com/api/delete-contact/${id}`);
            console.log(response.data.message);
            setContacts(contacts.filter(contact => contact._id !== id)); // Remove deleted contact from the state
        } catch (err) {
            console.error('Failed to delete contact:', err);
        }
    };

    return (
        <>
            <div className="bread">
                <div className="head">
                    <h4>All Contact Inquiries</h4>
                </div>
            </div>
            <section className="mt-2 d-table table-responsive">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">S No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Message</th>
                            <th scope="col">Date & Time</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => (
                            <tr key={contact._id}>
                                <td>{index + 1}</td>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.number}</td>
                                <td>{contact.subject}</td>
                                <td>{contact.message}</td>
                                <td>{formatDate(contact.createdAt)}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(contact._id)}
                                    >
                                        Delete <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AllContactInquery;
