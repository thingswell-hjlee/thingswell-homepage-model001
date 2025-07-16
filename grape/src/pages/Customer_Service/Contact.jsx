import React from 'react';
import SolutionCard from '../../components/SolutionCard.jsx';
import Form from '../../components/Form.jsx';
import { Link } from 'react-router-dom'; 

const Contact = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-layout">
          <div className="main-content">
          <div className="solutions-section" >
              <SolutionCard subtitle="Announcement" title="문의하기" description="고객지원" showButton={false} link="/solutions/detail" className="custom-solution-left" variant="hero" reverse={false} />
              <Form />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;  