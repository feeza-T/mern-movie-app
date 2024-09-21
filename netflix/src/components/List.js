import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import Footer from './Footer'; // Import the Footer component

const List = () => {
    const [movies, setMovies] = useState([]);
    const [formData, setFormData] = useState({ movieName: '', directorName: '', watchingDate: '' });
    const [editIndex, setEditIndex] = useState(-1); // Track index of movie being edited
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('movieName'); // Default search by movie name
    const [sortOrder, setSortOrder] = useState('asc'); // Sort order for watching date

    const userId = 'user123'; // Assume a unique user ID or email for demonstration

    useEffect(() => {
        // Load movies from localStorage when component mounts
        const savedMovies = JSON.parse(localStorage.getItem(`movieList_${userId}`) || '[]');
        if (savedMovies.length > 0) {
            setMovies(savedMovies);
        }
    }, []);

    useEffect(() => {
        // Save movies to localStorage whenever movies state changes
        localStorage.setItem(`movieList_${userId}`, JSON.stringify(movies));
    }, [movies]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addMovie = () => {
        const newMovie = { ...formData };
        const updatedMovies = [...movies, newMovie];
        setMovies(updatedMovies);
        setFormData({ movieName: '', directorName: '', watchingDate: '' });
        sortMoviesByWatchingDate(updatedMovies);
    };

    const editMovie = (index) => {
        setEditIndex(index);
        const movieToEdit = movies[index];
        setFormData({ ...movieToEdit });
    };

    const updateMovie = () => {
        const updatedMovies = [...movies];
        updatedMovies[editIndex] = { ...formData };
        setMovies(updatedMovies);
        setEditIndex(-1);
        setFormData({ movieName: '', directorName: '', watchingDate: '' });
        sortMoviesByWatchingDate(updatedMovies);
    };

    const deleteMovie = (index) => {
        const updatedMovies = [...movies];
        updatedMovies.splice(index, 1);
        setMovies(updatedMovies);
    };

    const sortMoviesByWatchingDate = (updatedMovies) => {
        updatedMovies.sort((a, b) => {
            if (sortOrder === 'asc') {
                return new Date(a.watchingDate) - new Date(b.watchingDate);
            } else {
                return new Date(b.watchingDate) - new Date(a.watchingDate);
            }
        });
        setMovies(updatedMovies);
    };

    const handleSortChange = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        sortMoviesByWatchingDate([...movies]);
    };

    const filteredMovies = movies.filter((movie) => {
        if (searchTerm === '') return true;
        if (searchBy === 'movieName' && movie.movieName.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
        }
        if (searchBy === 'directorName' && movie.directorName.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
        }
        if (searchBy === 'watchingDate' && movie.watchingDate.includes(searchTerm)) {
            return true;
        }
        return false;
    });

    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Movie List</h1>
                <div className="flex items-center">
                    <Link to="/browse" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                        Back
                    </Link>
                    <button onClick={handleSortChange} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 ml-2 rounded">
                        Sort by Watching Date {sortOrder === 'asc' ? '▲' : '▼'}
                    </button>
                </div>
            </div>

            <div className="mb-4 flex space-x-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border rounded"
                />
                <select
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                    className="px-4 py-2 border rounded"
                >
                    <option value="movieName">Search by Movie Name</option>
                    <option value="directorName">Search by Director Name</option>
                    <option value="watchingDate">Search by Watching Date</option>
                </select>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    name="movieName"
                    value={formData.movieName}
                    onChange={handleInputChange}
                    placeholder="Movie Name"
                    className="px-4 py-2 mr-2 border rounded"
                />
                <input
                    type="text"
                    name="directorName"
                    value={formData.directorName}
                    onChange={handleInputChange}
                    placeholder="Director Name"
                    className="px-4 py-2 mr-2 border rounded"
                />
                <input
                    type="date"
                    name="watchingDate"
                    value={formData.watchingDate}
                    onChange={handleInputChange}
                    className="px-4 py-2 mr-2 border rounded"
                />
                {editIndex === -1 ? (
                    <button onClick={addMovie} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                        Add
                    </button>
                ) : (
                    <button onClick={updateMovie} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                        Update
                    </button>
                )}
            </div>

            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">Movie Name</th>
                        <th className="border px-4 py-2">Director Name</th>
                        <th className="border px-4 py-2">
                            Watching Date{' '}
                            {sortOrder === 'asc' ? <span>▲</span> : <span>▼</span>}
                        </th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMovies.map((movie, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{movie.movieName}</td>
                            <td className="border px-4 py-2">{movie.directorName}</td>
                            <td className="border px-4 py-2">{movie.watchingDate}</td>
                            <td className="border px-4 py-2">
                                <button onClick={() => editMovie(index)} className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2">
                                    Edit
                                </button>
                                <button onClick={() => deleteMovie(index)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

           
        </div>
    );
};

export default List;
