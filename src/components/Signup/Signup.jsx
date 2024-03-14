import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const Navigate = useNavigate();
  const [warningMessage, setWarningMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      cPassword: '',
    },
    onSubmit: SendRegisterData,
  });

  function handleInputChange(e) {
    // Clear the warning message when input values change
    setWarningMessage('');
    formik.handleChange(e);
  }

  async function SendRegisterData(values) {
    // Check if any required field is empty
    if (!values.name || !values.email || !values.password || !values.cPassword) {
      setWarningMessage('Please fill in all required fields');
      return;
    } else {
      setWarningMessage('');
    }

    try {
      const { data } = await axios.post('http://127.0.0.1:8000/api/signup/', values);
      if (data.message === 'Signup successful') {
        Navigate('/Login');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);

      // Customize error messages based on the error response
      if (error.response) {
        const responseData = error.response.data;

        if (responseData.email && responseData.email.length > 0) {
          setWarningMessage(responseData.email[0]); // Display the email validation error
        } else if (responseData.error) {
          setWarningMessage(responseData.error); // Display other validation errors
        } else {
          setWarningMessage('An error occurred while processing your request.');
        }
      } else {
        setWarningMessage('An error occurred. Please try again later.');
      }
    }
  }

  return (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: 15 }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                  {warningMessage && (
                    <div className="alert alert-warning" role="alert">
                      {warningMessage}
                    </div>
                  )}
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example1cg">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        name="name"
                        value={formik.values.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3cg">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        name="email"
                        value={formik.values.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4cg">
                        Password
                      </label>
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        name="password"
                        value={formik.values.password}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example5cdg">
                        Repeat your password
                      </label>
                      <input
                        type="password"
                        id="form3Example5cdg"
                        className="form-control form-control-lg"
                        name="cPassword"
                        value={formik.values.cPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
