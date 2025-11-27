import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="portal-header">
        <h1>Government Election Management System</h1>
        <p>Official Portal for Democratic Participation</p>
      </header>

      <section className="services-section">
        <div className="services-grid">
          <div className="service-card">
            <h3>🆔 Voter Registration</h3>
            <p>Register as a voter to participate in elections</p>
            <Link to="/signup" className="btn-primary">Register Now</Link>
          </div>
          <div className="service-card">
            <h3>🔐 Voter Login</h3>
            <p>Access your voting dashboard</p>
            <Link to="/login" className="btn-primary">Login</Link>
          </div>
          <div className="service-card">
            <h3>📈 Election Results</h3>
            <p>View official election outcomes</p>
            <Link to="/results" className="btn-primary">View Results</Link>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2>Election Information</h2>
        <div className="info-grid">
          <div className="info-card">
            <h4>Current Status</h4>
            <p>Election: Active</p>
            <p>Voting Period: Ongoing</p>
          </div>
          <div className="info-card">
            <h4>Security Features</h4>
            <p>End-to-end encryption</p>
            <p>Blockchain verification</p>
          </div>
          <div className="info-card">
            <h4>Support</h4>
            <p>24/7 Help Desk</p>
            <p>Email: support@elections.gov</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;