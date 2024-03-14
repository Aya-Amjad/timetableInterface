import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Addcourse() {
  const [data, setData] = useState([]);
  const [professorsMap, setProfessorsMap] = useState({});

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/courses/')
      .then((res) => {
        setData(res.data);

        // Fetch professor data to create a map for quick lookups
        axios.get('http://127.0.0.1:8000/api/professors/')
          .then(professorRes => {
            const professorsData = professorRes.data.reduce((map, professor) => {
              map[professor.id] = professor.name;
              return map;
            }, {});
            setProfessorsMap(professorsData);
          })
          .catch(err => console.error('Error fetching professors data:', err));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirmation = window.confirm('Would you like to Delete?');
    if (confirmation) {
      axios
        .delete(`http://127.0.0.1:8000/api/courses/${id}/`)
        .then((res) => {
          setData(prevData => prevData.filter(item => item.id !== id));
        })
        .catch((err) => console.error('Delete error:', err));
    }
  };

  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100 text-center'>
      <h1>List of Courses</h1>
      <div className='w-100 rounded bg-white border shadow p-4'>
        <div className='d-flex justify-content-end'>
          <Link to='Createcourse' className='btn btn-success'> Add +</Link>
        </div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Professors</th>
              <th>Number of Students</th>
              <th>Number of Hours</th>
              <th>Max Students per Room</th>
              <th>Requires Projector</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.code}</td>
                <td>{d.name}</td>
                <td>
                  {/* Display professors as an unordered list */}
                  <ul>
                    {d.professors.map(professorId => (
                      <li key={professorId}>{professorsMap[professorId]}</li>
                    ))}
                  </ul>
                </td>
                <td>{d.number_of_students}</td>
                <td>{d.number_of_hours}</td>
                <td>{d.max_students_per_room}</td>
                <td>{d.requires_projector ? 'Yes' : 'No'}</td>

                <td>
                  <Link
                    to={`/Updatecourse/${d.id}`}
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

export default Addcourse;
