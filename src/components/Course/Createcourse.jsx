import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';

function Createcourse() {
  const [values, setValues] = useState({
    code: '',
    name: '',
    professors: [],
    number_of_students: '',
    number_of_hours: null,
    max_students_per_room: '',
    requires_projector: false,
  });

  const [selectedHours, setSelectedHours] = useState(null);
  const [professorsList, setProfessorsList] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/professors/")
      .then(response => {
        setProfessorsList(response.data);
      })
      .catch(error => {
        console.error('Error fetching professors:', error);
      });
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (successMessage) {
      // If a success message is set, navigate to the desired route
      navigate('/addcourse');
      setSuccessMessage(''); // Clear success message after navigating
    }
  }, [successMessage, navigate]);

  const clearMessages = () => {
    setErrorMessages([]);
    setValidationErrors([]);
  };

  const hoursOptions = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
  ];

  const projectorOptions = [
    { value: true, label: 'True' },
    { value: false, label: 'False' },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset validation errors
    setValidationErrors([]);

    // Validate form data
    if (!values.code || !values.name || values.professors.length === 0 || !values.number_of_students || selectedHours === null || !values.max_students_per_room || values.requires_projector === null) {
      setValidationErrors(['Please fill in all the required fields.']);
      return;
    }

    const dataToSend = {
      ...values,
      number_of_hours: selectedHours ? selectedHours.value : null,
      number_of_students: parseInt(values.number_of_students, 10),
      max_students_per_room: parseInt(values.max_students_per_room, 10),
      requires_projector: values.requires_projector ? values.requires_projector.value : false,
      professors: values.professors.map(professor => professor.label),
    };

    axios.post("http://127.0.0.1:8000/api/courses/", dataToSend)
      .then(res => {
        console.log(res);
        setSuccessMessage('Added Successfully');
        // Clear form values after successful submission
        setValues({
          code: '',
          name: '',
          professors: [],
          number_of_students: '',
          number_of_hours: null,
          max_students_per_room: '',
          requires_projector: false,
        });
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMessages([err.response.data.message]);
        } else {
          console.error(err);
        }
      });
  };

  const handleProfessorChange = (selectedProfessors) => {
    setValues({ ...values, professors: selectedProfessors });
    clearMessages(); // Clear messages when professors change
  };

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    clearMessages(); // Clear messages when any input changes
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h1>Add Course</h1>
        <form onSubmit={handleSubmit}>
          {validationErrors.length > 0 && (
            <div className="alert alert-warning" role="alert">
              {validationErrors.map((message, index) => (
                <p key={index}>{message}</p>
              ))}
            </div>
          )}
          {errorMessages.length > 0 && (
            <div className="alert alert-danger" role="alert">
              {errorMessages.map((message, index) => (
                <p key={index}>{message}</p>
              ))}
            </div>
          )}
          <div className='mb-2'>
            <label htmlFor="code">code: </label>
            <input type="text" name="code" className='form-control' placeholder='Enter code' onChange={handleInputChange} value={values.code} />
          </div>
          <div className='mb-2'>
            <label htmlFor="name">name: </label>
            <input type="text" name="name" className='form-control' placeholder='Enter name' onChange={handleInputChange} value={values.name} />
          </div>
          <div className='mb-3'>
            <label htmlFor="professors">Professors: </label>
            <Select
              name="professors"
              isMulti
              options={professorsList.map((professor) => ({
                label: professor.name,
                value: professor.id
              }))}
              onChange={(selectedProfessors) => handleProfessorChange(selectedProfessors)}
              value={values.professors}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="number_of_students">number_of_students: </label>
            <input type="number" name="number_of_students" className='form-control' placeholder='Enter number_of_students' onChange={handleInputChange} value={values.number_of_students} />
          </div>
          <div className='mb-3'>
            <label htmlFor="number_of_hours">number_of_hours: </label>
            <Select
              name="number_of_hours"
              options={hoursOptions}
              value={selectedHours}
              onChange={(selectedOption) => setSelectedHours(selectedOption)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="max_students_per_room">max_students_per_room: </label>
            <input type="number" name="max_students_per_room" className='form-control' placeholder='Enter max_students_per_room' onChange={handleInputChange} value={values.max_students_per_room} />
          </div>
          <div className='mb-3'>
            <label htmlFor="requires_projector">requires_projector: </label>
            <Select
              name="requires_projector"
              options={projectorOptions}
              onChange={(selectedOption) => setValues({ ...values, requires_projector: selectedOption })}
              value={values.requires_projector}
            />
          </div>
          <button className='btn btn-success'>Submit</button>
          <Link to="/Addcourse" className="btn btn-primary ms-3">Back</Link>
        </form>
      </div>
    </div>
  );
}

export default Createcourse;
