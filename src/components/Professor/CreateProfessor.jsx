import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CreateProfessor() {
  const [values, setValues] = useState({
    name: '',
    id_number: '',
    min_hours: '',
    max_hours: '',
  });

  const [warningMessage, setWarningMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setWarningMessage('');
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setWarningMessage('');
    setSuccessMessage('');

    if (!values.name || !values.id_number || !values.min_hours || !values.max_hours) {
      setWarningMessage('Please fill in all fields.');
      return;
    }

    if (parseInt(values.min_hours) >= parseInt(values.max_hours)) {
      setWarningMessage('min_hours must be less than max_hours.');
      return;
    }

    axios
      .post('http://127.0.0.1:8000/api/professors/', values)
      .then((res) => {
        console.log(res);
        if (res.data === 'Added Successfully') {
          setSuccessMessage('Added Successfully');
          setWarningMessage('');
          navigate('/addprofessor');
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          setWarningMessage(err.response.data.error || err.response.data.message);
        }
        console.log(err);
      });
  };

  useEffect(() => {
    if (successMessage === 'Added Successfully') {
      navigate('/addprofessor');
      setSuccessMessage('');
    }
  }, [successMessage, navigate]);

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h1>Add Professor</h1>
        {warningMessage && (
          <div className='alert alert-danger' role='alert'>
            {warningMessage}
          </div>
        )}
        {successMessage && (
          <div className='alert alert-success' role='alert'>
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label htmlFor='name'>Name : </label>
            <input
              type='text'
              name='name'
              className='form-control'
              placeholder='Enter Name'
              onChange={handleChange}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>id_number: </label>
            <input
              type='text'
              name='id_number'
              className='form-control'
              placeholder='Enter id_number'
              onChange={handleChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='phone'>min_hour : </label>
            <input
              type='text'
              name='min_hours'
              className='form-control'
              placeholder='Enter min_hour'
              onChange={handleChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='pho'>max_hours : </label>
            <input
              type='text'
              name='max_hours'
              className='form-control'
              placeholder='Enter max_hour'
              onChange={handleChange}
            />
          </div>
          <button className='btn btn-success'>Submit</button>
          <Link to='/AddProfessor' className='btn btn-primary ms-3'>
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default CreateProfessor;
