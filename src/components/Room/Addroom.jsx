import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
function Addroom() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/rooms/')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  },[]);

  const handleDelete = (id) => {
    const confirmation = window.confirm('Would you like to Delete?');
    if (confirmation) {
      axios
        .delete(`http://127.0.0.1:8000/api/rooms/${id}/`)
        .then((res) => {
          setData(prevData => prevData.filter(item => item.id !== id));
        })
        .catch((err) => console.error('Delete error:', err));
    }
  };
  
  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100 text-center'>
      <h1>List of Rooms</h1>
      <div className='w-75 rounded bg-white border shadow p-4'>
        <div className='d-flex justify-content-end'>
          <Link to='Createroom' className='btn btn-success'> Add +</Link>
        </div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Capacity</th>
              <th>Room Type</th>
              <th>Has Projecter</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.room_number}</td>
                <td>{d.capacity}</td>
                <td>{d.room_type}</td>
                <td>{d.has_projector ? 'Yes' : 'No'}</td>
                <td>
                  <Link
                    to={`/Updateroom/${d.id}`}
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

export default Addroom
