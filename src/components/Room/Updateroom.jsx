import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Updateroom() {
  const { id } = useParams();
  const [values, setValues] = useState({
    room_number: '',
    capacity: '',
    room_type: '',
    has_projector: '',
  });

  const [errors, setErrors] = useState({
    room_number: '',
    capacity: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/rooms/${+id}/`)
      .then((res) => {
        console.log('API response data:', res.data);
        setValues(res.data);
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, [id]);

  useEffect(() => {
    if (successMessage) {
      // If a success message is set, navigate to the desired route
      navigate('/addroom');
      // Clear success message after navigating
      setSuccessMessage('');
    }
  }, [successMessage, navigate]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    // Clear previous error messages
    setErrors({ room_number: '', capacity: '' });

    // Front-end validation
    if (!values.room_number.trim()) {
      setErrors({ ...errors, room_number: 'Room number is required' });
      return;
    }

    // Check if values.capacity is a string before calling trim
    if (typeof values.capacity === 'string' && !values.capacity.trim()) {
      setErrors({ ...errors, capacity: 'Capacity is required' });
      return;
    }

    try {
      const res = await axios.put(`http://127.0.0.1:8000/api/rooms/${+id}/`, values);
      console.log(res);
      setSuccessMessage('Room updated successfully');
      // Clear form values after successful submission
      setValues({
        room_number: '',
        capacity: '',
        room_type: '',
        has_projector: '',
      });
      // Clear success message after a brief delay
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      if (err.response) {
        const serverErrors = err.response.data;
        if (serverErrors.message) {
          setErrors({ ...errors, room_number: serverErrors.message });
        }
      } else {
        console.log(err);
      }
    }
  };

  const handleRoomNumberChange = (e) => {
    setValues({ ...values, room_number: e.target.value });
    setErrors({ ...errors, room_number: '' }); // Clear room_number error
    setSuccessMessage(''); // Clear success message
  };

  const handleCapacityChange = (e) => {
    setValues({ ...values, capacity: e.target.value });
    setErrors({ ...errors, capacity: '' }); // Clear capacity error
    setSuccessMessage(''); // Clear success message
  };

  // Other handlers for room_type and has_projector...

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Update Room</h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-2">
            <label htmlFor="room_number">Room Number: </label>
            <input
              type="text"
              name="room_number"
              className="form-control"
              placeholder="Enter Room Number"
              value={values.room_number}
              onChange={handleRoomNumberChange} // Use the specific handler
            />
            {errors.room_number && (
              <div className="text-danger">{errors.room_number}</div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="capacity">Capacity: </label>
            <input
              type="number"
              name="capacity"
              className="form-control"
              placeholder="Enter Capacity"
              value={values.capacity}
              onChange={handleCapacityChange} // Use the specific handler
            />
            {errors.capacity && (
              <div className="text-danger">{errors.capacity}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="room_type">Room Type: </label>
            <select
              name="room_type"
              className="form-control"
              value={values.room_type}
              onChange={(e) =>
                setValues({ ...values, room_type: e.target.value })
              }
            >
              <option value="نظري">نظري</option>
              <option value="عملي">عملي</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="has_projector">Has Projector: </label>
            <select
              name="has_projector"
              className="form-control"
              value={values.has_projector}
              onChange={(e) =>
                setValues({ ...values, has_projector: e.target.value })
              }
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>

          <button className="btn btn-success">Update</button>
          <Link to="/Addroom" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
        {successMessage && (
          <div className="alert alert-success mt-3">{successMessage}</div>
        )}
      </div>
    </div>
  );
}

export default Updateroom;
