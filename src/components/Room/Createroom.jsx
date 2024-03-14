import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Createroom() {
  const [values, setValues] = useState({
    room_number: '',
    capacity: '',
    room_type: 'نظري',
    has_projector: 'false',
  });

  const [errors, setErrors] = useState({
    room_number: '',
    capacity: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Front-end validation
    if (!values.room_number.trim()) {
      setErrors({ ...errors, room_number: 'Room number is required' });
      setSuccessMessage(''); // Clear success message
      return;
    }

    if (!values.capacity.trim()) {
      setErrors({ ...errors, capacity: 'Capacity is required' });
      setSuccessMessage(''); // Clear success message
      return;
    }

    // Clear previous error messages
    setErrors({ room_number: '', capacity: '' });

    // Make the API call if validation passes
    axios
      .post('http://127.0.0.1:8000/api/rooms/', values)
      .then((res) => {
        console.log(res);
        setSuccessMessage('Room added successfully');

        // Clear form values after successful submission
        setValues({
          room_number: '',
          capacity: '',
          room_type: 'نظري',
          has_projector: 'false',
        });
      })
      .catch((err) => {
        if (err.response) {
          // If the error has a response object, it means it's a server error
          const serverErrors = err.response.data;
          if (serverErrors.message) {
            // Set the error message from the server response
            setErrors({ ...errors, room_number: serverErrors.message });
          }
        } else {
          // Handle other types of errors
          console.log(err);
        }
      });
  };

  useEffect(() => {
    if (successMessage) {
      // If a success message is set, navigate to the desired route
      navigate('/addroom');
      setSuccessMessage(''); // Clear success message after navigating
    }
  }, [successMessage, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update values
    setValues({ ...values, [name]: value });

    // Check for valid input and clear error message
    if (name === 'room_number' && value.trim() !== '') {
      setErrors({ ...errors, room_number: '' });
    } else if (name === 'capacity' && value.trim() !== '') {
      setErrors({ ...errors, capacity: '' });
    }
  };

  const handleRoomTypeChange = (e) => {
    setValues({ ...values, room_type: e.target.value });
  };

  const handleHasProjectorChange = (e) => {
    setValues({ ...values, has_projector: e.target.value });
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Add Room</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="room_number">Room Number: </label>
            <input
              type="text"
              name="room_number"
              className="form-control"
              placeholder="Enter Room Number"
              value={values.room_number}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleRoomTypeChange}
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
              onChange={handleHasProjectorChange}
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/addroom" className="btn btn-primary ms-3">
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

export default Createroom;
