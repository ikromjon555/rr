import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Movie = () => {
    const [movies, setMovies] = useState();
    const [newMovie, setNewMovie] = useState({title: '', description: '', age: ''});
    const [editId, setEditId] = useState(null);
    const [editMovies, setEditMovies] = useState({title: '', description: '', age: ''});

    useEffect(() => {
        getMovies();
    }, [])

    const getMovies = () => {
        axios.get('http://localhost:5000/movies')
        .then(({data}) => setMovies(data))
        .catch((error) => console.log(error))
    }

    const addedNewMovie = (movie) => {
        axios.post(`http://localhost:5000/movies`, movie)
        .then(() => {
            getMovies()
            setNewMovie({title: '', description: '', age: ''})
        })
    }

    const deleteMovie = (id) => {
        axios.delete(`http://localhost:5000/movies/${id}`)
        .then(() => {
            getMovies()
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const editMovie = (movie) => {
        setEditId(movie.id);
        setEditMovies({title: movie.title, description: movie.description, age: movie.age})
    }

    const editFetch = (id) => {
        axios.patch(`http://localhost:5000/movies/${id}`, editMovies)
        .then(() => {
            getMovies();
            setEditId(null);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>
            <h1>Movies</h1>
            <ul>
                {
                    movies &&
                    movies.map((movie) => (
                        <li key={movie.id}>
                            {editId === movie.id ? (
                                <div>
                                    <input type="text" value={editMovies.title} onChange={(e) => {setEditMovies({...editMovies, title: e.target.value})}} />
                                    <input type="text" value={editMovies.description} onChange={(e) => {setEditMovies({...editMovies, description: e.target.value})}} />
                                    <input type="text" value={editMovies.age} onChange={(e) => {setEditMovies({...editMovies, age: e.target.value})}} />
                                    <button onClick={() => {editFetch(movie.id)}}>Edit</button>
                                    <button onClick={() => {setEditId(null)}}>Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <p><Link to={`/detail/${movie.id}`}>{movie.title}</Link></p>
                                    <p>{movie.description}</p>
                                    <p>{movie.age}</p>
                                    <button onClick={() => deleteMovie(movie.id)}>Delete</button>
                                    <button onClick={() => editMovie(movie)}>Edit</button>
                                </div>
                            )}
                            
                        </li>
                    ))
                }
            </ul>

            <input type="text" placeholder="title" value={newMovie.title} onChange={(e) => {setNewMovie({...newMovie, title: e.target.value})}} />
            <input type="text" placeholder="description"  value={newMovie.description} onChange={(e) => {setNewMovie({...newMovie, description: e.target.value})}}  />
            <input type="text" placeholder="age"  value={newMovie.age} onChange={(e) => {setNewMovie({...newMovie, age: e.target.value})}} />
            <button onClick={() => addedNewMovie(newMovie)}>Added movie</button>
        </div>
    );
}

