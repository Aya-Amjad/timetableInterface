import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

function Updatecourse() {
  const { id } = useParams();
  const [values, setValues] = useState({
    code: '',
    name: '',
    professors: [],
    number_of_students: '',
    number_of_hours: '',
    max_students_per_room: '',
    requires_projector: '',
  });

  const [professorsOptions, setProfessorsOptions] = useState([]);
  const [requiresProjectorOptions] = useState([
    { value: 'true', label: 'True' },
    { value: 'false', label: 'False' },
  ]);

  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/professors/')
      .then(res => {
        const options = res.data.map(professor => ({
          value: professor.name,
          label: professor.name,
        }));
        setProfessorsOptions(options);
      })
      .catch(err => console.error("Error fetching professors data:", err));

    axios.get(`http://127.0.0.1:8000/api/courses/${id}/`)
      .then(res => {
        const { code, name, professors, number_of_students, number_of_hours, max_students_per_room, requires_projector } = res.data;

        // Fetch details of each professor by their number
        const professorPromises = professors.map(professorNumber =>
          axios.get(`http://127.0.0.1:8000/api/professors/${professorNumber}/`)
        );

        Promise.all(professorPromises)
          .then(professorResponses => {
            // Extract professor names from the responses
            const professorDetails = professorResponses.map(response => response.data);
            const professorsFormatted = professorDetails.map(professor => ({
              value: professor.name,
              label: professor.name,
            }));

            setValues({
              code,
              name,
              professors: professorsFormatted,
              number_of_students,
              number_of_hours,
              max_students_per_room,
              requires_projector,
            });
          })
          .catch(err => console.error("Error fetching professor details:", err));
      })
      .catch(err => console.error("Error fetching course data:", err));
  }, [id]);

  useEffect(() => {
    if (successMessage === 'Updated Successfully') {
      navigate('/addcourse');
      setSuccessMessage('');
    }
  }, [successMessage, navigate]);

  const [showWarning, setShowWarning] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFieldChange = (field) => {
    setShowWarning(false);
    // Add any specific conditions to handle field changes if needed
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    // Check if any field is empty
    for (const key in values) {
      if (values[key] === '' || (Array.isArray(values[key]) && values[key].length === 0)) {
        setShowWarning(true);
        return; // Stop the update process if any field is empty
      }
    }

    const professorNames = values.professors.map(professor => professor.value);

    const dataToUpdate = {
      ...values,
      professors: professorNames,
    };

    axios.put(`http://127.0.0.1:8000/api/courses/${+id}/`, dataToUpdate)
      .then(res => {
        console.log(res);
        setSuccessMessage('Updated Successfully');
        setErrorMessage(''); // Clear previous error messages
      })
      .catch(err => {
        if (err.response && err.response.data.message) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage('An error occurred while updating the course');
        }
      });
  };

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h1>Update Course</h1>
        <form onSubmit={handleUpdate}>
          {showWarning && (
            <div className="alert alert-warning" role="alert">
              Please fill in all fields.
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <div className='mb-2'>
            <label htmlFor="code">Code: </label>
            <input
              type="text"
              name="code"
              className='form-control'
              placeholder='Enter Code'
              value={values.code}
              onChange={(e) => {
                setValues({ ...values, code: e.target.value });
                handleFieldChange('code');
              }}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              className='form-control'
              placeholder='Enter Name'
              value={values.name}
              onChange={(e) => {
                setValues({ ...values, name: e.target.value });
                handleFieldChange('name');
              }}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="professors">Professors: </label>
            <Select
              isMulti
              options={professorsOptions}
              value={values.professors}
              onChange={(selectedOptions) => {
                setValues({ ...values, professors: selectedOptions });
                handleFieldChange('professors');
              }}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="number_of_students">Number of Students: </label>
            <input
              type="number"
              name="number_of_students"
              className='form-control'
              placeholder='Enter Number of Students'
              value={values.number_of_students}
              onChange={(e) => {
                setValues({ ...values, number_of_students: e.target.value });
                handleFieldChange('number_of_students');
              }}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="number_of_hours">Number of Hours: </label>
            <select
              name="number_of_hours"
              className='form-control'
              value={values.number_of_hours}
              onChange={(e) => {
                setValues({ ...values, number_of_hours: e.target.value });
                handleFieldChange('number_of_hours');
              }}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="3">4</option>
            </select>
          </div>
          <div className='mb-3'>
            <label htmlFor="max_students_per_room">Max Students Per Room: </label>
            <input
              type="number"
              name="max_students_per_room"
              className='form-control'
              placeholder='Enter Max Students Per Room'
              value={values.max_students_per_room}
              onChange={(e) => {
                setValues({ ...values, max_students_per_room: e.target.value });
                handleFieldChange('max_students_per_room');
              }}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="requires_projector">Requires Projector: </label>
            <Select
              options={requiresProjectorOptions}
              value={{ value: values.requires_projector, label: values.requires_projector === 'true' ? 'True' : 'False' }}
              onChange={(selectedOption) => {
                setValues({ ...values, requires_projector: selectedOption.value });
                handleFieldChange('requires_projector');
              }}
            />
          </div>
          <button className='btn btn-success'>Update</button>
          <Link to="/addcourse" className="btn btn-primary ms-3">Back</Link>
        </form>
      </div>
    </div>
  );
}

export default Updatecourse;
