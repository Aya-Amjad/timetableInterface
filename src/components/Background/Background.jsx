import React, { useState } from 'react';
import TimeTableImage from "./TimeTableImage.jpg";
import Cookies from 'js-cookie';

function Background({ user }) {
  const [loading, setLoading] = useState(false);

  const handleGenerateTimetable = async () => {
    setLoading(true);

    try {
      const userToken = Cookies.get('userToken');

      if (userToken) {
        const response = await fetch('http://localhost:5000/generate_timetable', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${userToken}`,
          },
        });

        console.log(response);
      } else {
        console.error('Access token not found in cookies. Redirecting to login page.');
      }
    } catch (error) {
      console.error('Error generating timetable:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
  };

  const imgStyle = {
    width: user ? 'auto' : '100%',
    height: user ? 'auto' : '100%',
    position: user ? 'absolute' : 'relative',
    top: user ? '100px' : 'auto', // قم بتعديل هذه القيمة حسب احتياجك
    left: user ? '65px' : 'auto',
    height: '596px',
    width: '700px',
    marginBottom: '20px',
    position: 'absolute',
    left: '40px',
  };

  const contentStyle = {
    position: 'absolute',
    bottom: '300px',
    right: '0',
    width: '420px',
    textAlign: 'right',
    padding: '20px',
  };

  const headingStyle = {
    marginBottom: '20px',
    color: '#38c0b3',
  };

  const buttonStyle = {
    color: '#fff',
    backgroundColor: '#01d7a7',
    borderRadius: '3px',
    padding: '16px 36px',
    textAlign: 'center',
    letterSpacing: '0.9px',
    textDecoration: 'none',
    lineHeight: '26px',
    fontSize: '28px',
    boxShadow: '0px 1px 3px 0px #9e9292',
  };

  return (
    <div style={containerStyle}>
      {user ?
        <>
          <div class="inner">
            <img
              src={TimeTableImage}
              alt="TimeTableImage"
              style={imgStyle}
            />
            <div className="txt" style={contentStyle}>
              <div>
                <h2 className="fw-bold fs-2" style={headingStyle}>Timetable Generator</h2>
                <p className="fw-bolder fs-5">Let Our Artificial Intelligence Schedule your Classes. Add Your university Class details and generate Timetable</p>
                <div className="crdbtn">
                  <button
                    onClick={handleGenerateTimetable}
                    className="btn"
                    style={buttonStyle}
                    disabled={loading}
                  >
                    {loading ? 'Generating...' : 'Generate Timetable'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
        :
        <img
          src={TimeTableImage}
          alt="وصف الصورة"
          style={containerStyle}
        />
      }
    </div>
  );
}

export default Background;
