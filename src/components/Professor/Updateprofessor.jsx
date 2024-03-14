import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UpdateProfessor() {
  const { id } = useParams();
  const [values, setValues] = useState({
    name: '',
    id_number: '',
    min_hours: '',
    max_hours: '',
  });

  const [warningMessage, setWarningMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/professors/${id}`)
      .then((res) => setValues(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setWarningMessage('');
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleUpdate = (event) => {
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
      .put(`http://127.0.0.1:8000/api/professors/${id}/`, values)
      .then((res) => {
        console.log(res);
        if (res.data === 'Updated Successfully') {
          setSuccessMessage('Updated Successfully');
          setWarningMessage('');
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
    if (successMessage === 'Updated Successfully') {
      navigate('/addprofessor');
      setSuccessMessage('');
    }
  }, [successMessage, navigate]);

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h1>Update Professor</h1>
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
        <form onSubmit={handleUpdate}>
          <div className='mb-2'>
            <label htmlFor='name'>Name : </label>
            <input
              type='text'
              name='name'
              className='form-control'
              placeholder='Enter Name'
              value={values.name}
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
              value={values.id_number}
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
              value={values.min_hours}
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
              value={values.max_hours}
              onChange={handleChange}
            />
          </div>
          <button className='btn btn-success'>Update</button>
          <Link to='/addprofessor' className='btn btn-primary ms-3'>
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfessor;
