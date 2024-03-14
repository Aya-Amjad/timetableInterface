import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // استيراد مكتبة js-cookie

function Login(props) {
  const [statusError, setStatusError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: SendLoginData,
  });

  // Clear the status error when input values change
  const handleInputChange = (e) => {
    setStatusError('');
    formik.handleChange(e);
  };

  async function SendLoginData(values) {
    if (!values.email || !values.password) {
      setStatusError('Please fill in all required fields');
      return;
    } else {
      setStatusError('');
    }

    try {
      const { data } = await axios.post('http://127.0.0.1:8000/api/login/', values);
      if (data.message === 'Login successful') {
        Cookies.set('userToken', data.access_token);
        props.saveCurrentUser();
        navigate('/');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);

      if (error.response) {
        const responseData = error.response.data;

        if (responseData.error) {
          // If the error response has a specific 'error' property, display its value
          setStatusError(responseData.error);
        } else {
          // Otherwise, display a generic error message
          setStatusError('An error occurred while processing your request.');
        }
      } else {
        setStatusError('An error occurred. Please try again later.');
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
                  <h2 className="text-uppercase text-center mb-5">Log in</h2>
                  {statusError && <div className="text-danger">{statusError}</div>}

                  <form onSubmit={formik.handleSubmit}>
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
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Log in
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

export default Login;
