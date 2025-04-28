import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllArtical = () => {
    const [articles, setArticles] = useState([]); // State to store the article data
    const [isLoading, setIsLoading] = useState(false);

    // Fetch articles data from the backend when component mounts
    useEffect(() => {
        const fetchArticles = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:8000/api/all-articals');
                console.log(response)
                setArticles(response.data); // Assuming the API returns an array of articles
            } catch (error) {
                toast.error("Failed to load articles!");
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, []);

    // Delete article function
    const handleDelete = async (articleId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
            });

            if (result.isConfirmed) {
                await axios.delete(`http://localhost:8000/api/delete-artical/${articleId}`);
                setArticles(articles.filter((article) => article._id !== articleId)); // Remove the deleted article from the state
                Swal.fire('Deleted!', 'Your article has been deleted.', 'success');
            }
        } catch (error) {
            toast.error("Failed to delete article!");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Articles</h4>
                </div>
                <div className="links">
                    <Link to="/add-artical" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Image</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="6" className="text-center">Loading...</td>
                            </tr>
                        ) : (
                            articles.map((article, index) => (
                                <tr key={article._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{article.name}</td>
                                    <td>{article.descrition}</td>
                                    <td>
                                        <img src={article.image} alt={article.name} width="100" height="50" />
                                    </td>
                                    <td>
                                        <Link to={`/edit-artical/${article._id}`} className="bt edit">
                                            Edit <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            className="bt delete"
                                            onClick={() => handleDelete(article._id)}
                                        >
                                            Delete <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AllArtical;
