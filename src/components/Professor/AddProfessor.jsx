import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';

export default function AddProfessor() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/professors/')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  },[]);

  const handleDelete = (id) => {
    const confirmation = window.confirm('Would you like to Delete?');
    if (confirmation) {
      axios
        .delete(`http://127.0.0.1:8000/api/professors/${id}/`)
        .then((res) => {
          setData(prevData => prevData.filter(item => item.id !== id));
        })
        .catch((err) => console.error('Delete error:', err));
    }
  };
  
  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100 text-center'>
      <h1>List of Professors</h1>
      <div className='w-75 rounded bg-white border shadow p-4'>
        <div className='d-flex justify-content-end'>
          <Link to='Createprofessor' className='btn btn-success'> Add +</Link>
        </div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Name</th>
              <th>id_number</th>
              <th>min_hours</th>
              <th>max_hours</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.name}</td>
                <td>{d.id_number}</td>
                <td>{d.min_hours}</td>
                <td>{d.max_hours}</td>
                <td>
                  <Link
                    to={`/Updatprofessor/${d.id}`}
                    className='btn btn-sm btn-primary me-2'
                  >
                    Edit
                  </Link>
                  <button
                    onClick={e => handleDelete(d.id)}
                    className='btn btn-sm btn-danger'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
