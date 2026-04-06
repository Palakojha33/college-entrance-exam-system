import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Calendar, Settings, LogOut, Bell, Search, User, BookOpen, ClipboardList, UploadCloud, ShieldCheck, CreditCard } from 'lucide-react';
import axios from 'axios';

function Sidebar({ onLogout }) {
  const location = useLocation();
  
  return (
    <div className="sidebar">
      <div className="logo-container">
        <div className="avatar" style={{backgroundColor: 'var(--primary)', width: '32px', height: '32px'}}>U</div>
        Univex System
      </div>
      
      <nav style={{ flex: 1 }}>
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        <Link to="/applications" className={`nav-link ${location.pathname === '/applications' ? 'active' : ''}`}>
          <FileText size={20} /> Applications
        </Link>
        <Link to="/merit-list" className={`nav-link ${location.pathname === '/merit-list' ? 'active' : ''}`}>
          <ClipboardList size={20} /> Merit List
        </Link>
        <Link to="/cutoff-prediction" className={`nav-link ${location.pathname === '/cutoff-prediction' ? 'active' : ''}`}>
          <ShieldCheck size={20} /> Cut-off Prediction
        </Link>
        <Link to="/seat-allocation" className={`nav-link ${location.pathname === '/seat-allocation' ? 'active' : ''}`}>
          <BookOpen size={20} /> Seat Allocation
        </Link>
        <Link to="/payments" className={`nav-link ${location.pathname === '/payments' ? 'active' : ''}`}>
          <CreditCard size={20} /> Payments
        </Link>
        <Link to="/exams" className={`nav-link ${location.pathname === '/exams' ? 'active' : ''}`}>
          <Calendar size={20} /> Entrance Exams
        </Link>
        <Link to="/mock-tests" className={`nav-link ${location.pathname === '/mock-tests' ? 'active' : ''}`}>
          <BookOpen size={20} /> Mock Tests
        </Link>
        <Link to="/documents" className={`nav-link ${location.pathname === '/documents' ? 'active' : ''}`}>
          <ShieldCheck size={20} /> Document Center
        </Link>
        <Link to="/settings" className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}>
          <Settings size={20} /> Settings
        </Link>
      </nav>
      
      <div className="nav-link" onClick={onLogout} style={{ cursor: 'pointer', marginTop: 'auto' }}>
        <LogOut size={20} /> Logout
      </div>
    </div>
  );
}

function Topbar() {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);

  return (
    <div className="header">
      <div className="header-title">Admissions Portal</div>
      <div className="user-profile" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={20} color="var(--gray-400)" style={{ position: 'absolute', left: '10px' }} />
          <input 
            type="text" 
            placeholder="Search..." 
            style={{ padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0, 217, 255, 0.2)', outline: 'none' }} 
          />
        </div>
        
        <div style={{ position: 'relative' }}>
          <Bell 
            size={24} 
            color="var(--text-muted)" 
            style={{ cursor: 'pointer' }} 
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }} 
          />
          {showNotifications && (
            <div className="card" style={{ position: 'absolute', top: '150%', right: '-50px', width: '320px', zIndex: 100, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)' }}>
              <div style={{ paddingBottom: '0.5rem', borderBottom: '1px solid rgba(0, 217, 255, 0.2)', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Notifications</div>
              <div style={{ fontSize: '0.875rem', padding: '0.5rem 0', color: 'var(--text-muted)', borderBottom: '1px solid rgba(0, 217, 255, 0.1)' }}>
                <strong>JEE Main</strong> registration is closing soon!
              </div>
              <div style={{ fontSize: '0.875rem', padding: '0.5rem 0', color: 'var(--text-muted)', borderBottom: '1px solid rgba(0, 217, 255, 0.1)' }}>
                Your engineering application is <strong style={{ color: 'var(--secondary)' }}>Under Review</strong>.
              </div>
              <div style={{ fontSize: '0.875rem', padding: '0.5rem 0', color: 'var(--text-muted)' }}>
                System maintenance scheduled for tomorrow.
              </div>
            </div>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <div 
            className="avatar" 
            style={{ cursor: 'pointer' }} 
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
          >
            <User size={20} />
          </div>
          {showProfile && (
            <div className="card" style={{ position: 'absolute', top: '120%', right: '0', width: '200px', zIndex: 100, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)' }}>
              <div style={{ paddingBottom: '0.5rem', borderBottom: '1px solid rgba(0, 217, 255, 0.2)', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Student Profile</div>
              <Link to="/settings" style={{ display: 'block', textDecoration: 'none', color: 'var(--text-muted)', padding: '0.5rem 0', fontSize: '0.875rem', fontWeight: 500 }}>Edit Account Settings</Link>
              <Link to="/applications" style={{ display: 'block', textDecoration: 'none', color: 'var(--text-muted)', padding: '0.5rem 0', fontSize: '0.875rem', fontWeight: 500 }}>My Applications</Link>
              <div style={{ borderTop: '1px solid rgba(0, 217, 255, 0.2)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                <a href="/" style={{ display: 'block', textDecoration: 'none', color: 'var(--secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Logout / Session Reset</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [data, setData] = useState({ applications: 12, pending: 4, exams: 2 });

  return (
    <div>
      <Topbar />
      
      <div className="card-grid">
        <div className="card">
          <div className="card-header">
            <div className="card-icon">
              <FileText size={24} />
            </div>
            <div className="card-title">Total Applications</div>
          </div>
          <div className="card-value">{data.applications}</div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <div className="card-icon" style={{ color: 'var(--secondary)', backgroundColor: 'rgba(255, 0, 110, 0.1)' }}>
              <Bell size={24} />
            </div>
            <div className="card-title">Pending Review</div>
          </div>
          <div className="card-value">{data.pending}</div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <div className="card-icon" style={{ color: 'var(--accent-green)', backgroundColor: 'rgba(57, 255, 20, 0.1)' }}>
              <Calendar size={24} />
            </div>
            <div className="card-title">Upcoming Exams</div>
          </div>
          <div className="card-value">{data.exams}</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Recent Applications</h2>
        <Link to="/applications" className="btn btn-primary" style={{ textDecoration: 'none' }}>Start New Application</Link>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Program</th>
              <th>Date Applied</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#APP-2024-001</td>
              <td>B.S. Computer Science</td>
              <td>Oct 24, 2024</td>
              <td><span className="badge badge-warning">Under Review</span></td>
              <td><button onClick={() => alert('Viewing details for APP-2024-001')} className="btn btn-outline" style={{ padding: '0.25rem 0.75rem' }}>View</button></td>
            </tr>
            <tr>
              <td>#APP-2024-002</td>
              <td>B.A. Business Admin</td>
              <td>Oct 20, 2024</td>
              <td><span className="badge badge-success">Admitted</span></td>
              <td><button onClick={() => alert('Viewing details for APP-2024-002')} className="btn btn-outline" style={{ padding: '0.25rem 0.75rem' }}>View</button></td>
            </tr>
            <tr>
              <td>#APP-2024-003</td>
              <td>B.S. Engineering</td>
              <td>Oct 15, 2024</td>
              <td><span className="badge badge-primary">Processing</span></td>
              <td><button onClick={() => alert('Viewing details for APP-2024-003')} className="btn btn-outline" style={{ padding: '0.25rem 0.75rem' }}>View</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Applications() {
  const [applications, setApplications] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  // Custom draft application form states
  const [showForm, setShowForm] = React.useState(false);
  const [newStudentName, setNewStudentName] = React.useState('');
  const [newEmail, setNewEmail] = React.useState('');
  const [newProgram, setNewProgram] = React.useState('');
  const [newDepartment, setNewDepartment] = React.useState('');
  const [newAcademicMarks, setNewAcademicMarks] = React.useState('');
  const [newExamScore, setNewExamScore] = React.useState('');
  const [newPreferences, setNewPreferences] = React.useState([
    { program: '', department: '', priority: 1 }
  ]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/applications');
      setApplications(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch from backend. Is the server running?', err);
      // Fallback for visual display if backend is offline or empty
      setApplications([]);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchApplications();
  }, []);

  const createApplication = async (e) => {
    e.preventDefault();
    if (!newStudentName || !newEmail || !newProgram || !newDepartment || !newAcademicMarks || !newExamScore) {
      return alert('Please fill all required fields');
    }
    try {
      await axios.post('http://localhost:5001/api/applications', {
        studentName: newStudentName,
        email: newEmail,
        program: newProgram,
        department: newDepartment,
        academicMarks: parseFloat(newAcademicMarks),
        examScore: parseFloat(newExamScore),
        coursePreferences: newPreferences.filter(p => p.program && p.department)
      });
      setShowForm(false);
      setNewStudentName('');
      setNewEmail('');
      setNewProgram('');
      setNewDepartment('');
      setNewAcademicMarks('');
      setNewExamScore('');
      setNewPreferences([{ program: '', department: '', priority: 1 }]);
      fetchApplications(); // refreshing the table
    } catch (err) {
      console.error('Failed to submit application', err);
      alert("Failed to submit. Check if backend is running!");
    }
  };
  
  const deleteApplication = async (id) => {
    if (!window.confirm('Are you certain you want to permanently delete this application?')) return;
    try {
      await axios.delete(`http://localhost:5001/api/applications/${id}`);
      fetchApplications();
    } catch (err) {
      alert("Failed to delete application.");
    }
  };

  const manageApp = (id) => {
    alert(`Opening management portal for Application ID: ${id}`);
  };

  const initiatePayment = async (application) => {
    try {
      // Create Razorpay order
      const orderResponse = await axios.post('http://localhost:5001/api/payments/create-order', {
        applicationId: application.applicationId,
        amount: application.applicationFee,
        studentName: application.studentName,
        email: application.email
      });

      const { orderId, amount, currency, key } = orderResponse.data;

      // For demo purposes, simulate successful payment
      const simulatePayment = () => {
        const mockResponse = {
          razorpay_order_id: orderId,
          razorpay_payment_id: `pay_demo_${Date.now()}`,
          razorpay_signature: 'demo_signature'
        };
        
        // Simulate the handler function
        axios.post('http://localhost:5001/api/payments/verify-payment', mockResponse)
          .then(() => {
            alert('Payment successful! Your application is now active.');
            fetchApplications(); // Refresh the list
          })
          .catch(() => {
            alert('Payment verification failed. Please contact support.');
          });
      };

      // Show demo payment dialog
      if (window.confirm(`Demo Payment: Click OK to simulate payment of ₹${application.applicationFee} for ${application.applicationId}`)) {
        simulatePayment();
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <div>
      <Topbar />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-main)' }}>My Applications</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Manage and track your college applications</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className={`btn ${showForm ? 'btn-outline' : 'btn-primary'}`} style={{ padding: '0.75rem 1.5rem' }}>
          {showForm ? 'Cancel Creation' : '+ Draft Application'}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'var(--surface)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)' }}>Draft a New Application</h3>
          <form onSubmit={createApplication} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'end' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Student Name</label>
              <input type="text" placeholder="Full Name" value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Email</label>
              <input type="email" placeholder="student@example.com" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Program</label>
              <input type="text" placeholder="e.g. B.S. Computer Science" value={newProgram} onChange={(e) => setNewProgram(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Department</label>
              <input type="text" placeholder="e.g. Engineering" value={newDepartment} onChange={(e) => setNewDepartment(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Academic Marks (%)</label>
              <input type="number" min="0" max="100" step="0.1" placeholder="85.5" value={newAcademicMarks} onChange={(e) => setNewAcademicMarks(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Exam Score (%)</label>
              <input type="number" min="0" max="100" step="0.1" placeholder="92.0" value={newExamScore} onChange={(e) => setNewExamScore(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }} />
            </div>
            <div style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Course Preferences (Optional)</label>
              {newPreferences.map((pref, index) => (
                <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minWidth: '20px' }}>#{pref.priority}</span>
                  <input type="text" placeholder="Program" value={pref.program} onChange={(e) => {
                    const updated = [...newPreferences];
                    updated[index].program = e.target.value;
                    setNewPreferences(updated);
                  }} style={{ flex: 1, padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid var(--gray-300)', outline: 'none', fontSize: '0.875rem' }} />
                  <input type="text" placeholder="Department" value={pref.department} onChange={(e) => {
                    const updated = [...newPreferences];
                    updated[index].department = e.target.value;
                    setNewPreferences(updated);
                  }} style={{ flex: 1, padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid var(--gray-300)', outline: 'none', fontSize: '0.875rem' }} />
                  {newPreferences.length > 1 && (
                    <button type="button" onClick={() => setNewPreferences(newPreferences.filter((_, i) => i !== index))} style={{ padding: '0.25rem 0.5rem', backgroundColor: 'rgba(255, 0, 110, 0.2)', color: 'var(--secondary)', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>×</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => setNewPreferences([...newPreferences, { program: '', department: '', priority: newPreferences.length + 1 }])} className="btn btn-outline" style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.875rem' }}>+ Add Preference</button>
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline">Cancel</button>
              <button type="submit" className="btn btn-primary">Submit Application</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Student Name</th>
              <th>Program</th>
              <th>Academic Marks</th>
              <th>Exam Score</th>
              <th>Total Score</th>
              <th>Payment Status</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="9" style={{textAlign: 'center'}}>Loading data from Database...</td></tr>
            ) : applications.length === 0 ? (
              <tr><td colSpan="9" style={{textAlign: 'center'}}>No applications found. Click "+ Draft Application" to create one.</td></tr>
            ) : applications.map(app => (
              <tr key={app._id}>
                <td style={{ fontWeight: 500 }}>{app.applicationId}</td>
                <td>{app.studentName || 'N/A'}</td>
                <td>{app.program}</td>
                <td>{app.academicMarks ? `${app.academicMarks}%` : 'N/A'}</td>
                <td>{app.examScore ? `${app.examScore}%` : 'N/A'}</td>
                <td style={{ fontWeight: 600 }}>{app.totalScore ? app.totalScore.toFixed(2) : 'N/A'}</td>
                <td>
                  <span className={`badge ${app.paymentStatus === 'paid' ? 'badge-success' : app.paymentStatus === 'failed' ? 'badge-danger' : 'badge-warning'}`}>
                    {app.paymentStatus === 'paid' ? 'Paid' : app.paymentStatus === 'failed' ? 'Failed' : 'Pending'}
                  </span>
                  {app.paymentStatus === 'pending' && (
                    <button 
                      onClick={() => initiatePayment(app)} 
                      className="btn btn-primary" 
                      style={{ marginLeft: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                    >
                      Pay ₹{app.applicationFee}
                    </button>
                  )}
                </td>
                <td>
                  <span className={`badge ${app.status === 'Processing' ? 'badge-primary' : app.status === 'Under Review' ? 'badge-warning' : app.status === 'Admitted' ? 'badge-success' : app.status === 'Waitlisted' ? 'badge-warning' : ''}`} style={app.status === 'Rejected' ? {backgroundColor: 'rgba(255, 0, 110, 0.1)', color: 'var(--secondary)'} : {}}>
                    {app.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => manageApp(app.applicationId)} className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}>Manage</button>
                    <button onClick={() => deleteApplication(app._id)} className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', color: 'var(--secondary)', borderColor: 'var(--secondary)' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EntranceExams() {
  const [exams, setExams] = useState([
    { id: 1, title: 'Joint Entrance Examination (JEE) Main', date: 'Jan 24, 2025', time: '09:00 AM', status: 'Upcoming', registered: true },
    { id: 2, title: 'National Eligibility cum Entrance Test (NEET)', date: 'May 05, 2025', time: '02:00 PM', status: 'Open', registered: false },
    { id: 3, title: 'Common Admission Test (CAT)', date: 'Nov 26, 2024', time: '08:30 AM', status: 'Open', registered: false },
    { id: 4, title: 'Karnataka CET (KCET)', date: 'Apr 18, 2025', time: '10:30 AM', status: 'Open', registered: false },
    { id: 5, title: 'COMEDK UGET', date: 'May 12, 2025', time: '09:00 AM', status: 'Open', registered: false },
    { id: 6, title: 'Computer Science Aptitude Test', date: 'Nov 12, 2024', time: '10:00 AM', status: 'Open', registered: false },
    { id: 7, title: 'Design Portfolio Review', date: 'Dec 18, 2024', time: '10:00 AM', status: 'Open', registered: false }
  ]);

  const toggleRegister = (examId) => {
    setExams(exams.map(exam => {
      if (exam.id === examId) {
        if (!exam.registered) {
          alert(`Successfully registered for ${exam.title}!`);
        }
        return { ...exam, registered: !exam.registered };
      }
      return exam;
    }));
  };

  const viewTicket = (title) => {
    alert(`Downloading Hall Ticket for ${title}...`);
  };

  return (
    <div>
      <Topbar />
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-main)' }}>Entrance Exams</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Register and view schedules for required entrance examinations</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {exams.map((exam) => (
          <div key={exam.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ backgroundColor: 'rgba(26, 30, 63, 0.5)', border: '1px solid rgba(0, 217, 255, 0.2)', padding: '0.75rem', borderRadius: '0.5rem', color: 'var(--primary)' }}>
                <Calendar size={24} />
              </div>
              {exam.registered ? (
                <span className="badge badge-success">Registered</span>
              ) : (
                <span className="badge badge-primary">Registration Open</span>
              )}
            </div>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              {exam.title}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '1rem 0', color: 'var(--text-muted)', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} /> <span>{exam.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bell size={16} /> <span>{exam.time}</span>
              </div>
            </div>
            
            <button 
              onClick={() => exam.registered ? viewTicket(exam.title) : toggleRegister(exam.id)} 
              className={`btn ${exam.registered ? 'btn-outline' : 'btn-primary'}`} 
              style={{ width: '100%', marginTop: 'auto' }}
            >
              {exam.registered ? 'View Hall Ticket' : 'Register Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockTests() {
  const mockTests = [
    { title: 'JEE Main Full Mock Test 1', duration: '180 mins', totalMarks: 300, subject: 'Math, Physics, Chemistry', difficulty: 'Hard' },
    { title: 'NEET Practice Paper (Biology focused)', duration: '200 mins', totalMarks: 720, subject: 'Biology, Physics, Chemistry', difficulty: 'Medium' },
    { title: 'CAT Quant & DI Sprint', duration: '120 mins', totalMarks: 198, subject: 'Quantitative, Data Interpretation', difficulty: 'Expert' },
    { title: 'KCET Engineering Mock', duration: '80 mins', totalMarks: 60, subject: 'Mathematics Core', difficulty: 'Medium' },
    { title: 'COMEDK General Demo', duration: '180 mins', totalMarks: 180, subject: 'All Subjects', difficulty: 'Easy' }
  ];

  return (
    <div>
      <Topbar />
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-main)' }}>Mock Tests</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Prepare for your entrance exams by taking realistic simulated mock tests.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {mockTests.map((test, index) => (
          <div key={index} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ backgroundColor: 'rgba(0, 217, 255, 0.1)', padding: '0.75rem', borderRadius: '0.5rem', color: 'var(--primary)' }}>
                <BookOpen size={24} />
              </div>
              <span className={`badge ${test.difficulty === 'Easy' ? 'badge-success' : test.difficulty === 'Medium' ? 'badge-primary' : 'badge-warning'}`}>
                {test.difficulty}
              </span>
            </div>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              {test.title}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '1rem 0', color: 'var(--text-muted)', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ClipboardList size={16} /> <span>{test.subject}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(0, 217, 255, 0.2)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                <span style={{ fontWeight: 500 }}>{test.duration}</span>
                <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>{test.totalMarks} Marks</span>
              </div>
            </div>
            
            <button 
              onClick={() => alert(`Starting ${test.title} simulation environment...`)} 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: 'auto' }}
            >
              Start Free Mock Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Documents() {
  const [docs, setDocs] = useState([
    { id: 1, name: '10th Grade Marksheet', type: 'Marksheet', status: 'Verified', date: 'Oct 20, 2024' },
    { id: 2, name: 'Aadhar Card Front', type: 'ID Proof', status: 'Pending', date: 'Oct 22, 2024' }
  ]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('Marksheet');

  const handleUpload = (e) => {
    e.preventDefault();
    if (!newTitle) return alert("Please enter document name");
    setDocs([{ id: Date.now(), name: newTitle, type: newType, status: 'Pending', date: new Date().toLocaleDateString() }, ...docs]);
    setNewTitle('');
    alert("Document securely uploaded for verification!");
  };

  const handleStatus = (id, newStatus) => {
    setDocs(docs.map(d => d.id === id ? { ...d, status: newStatus } : d));
  };

  return (
    <div>
      <Topbar />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-main)' }}>Document Center</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Securely upload and verify your ID proofs and marksheets</p>
        </div>
        <button onClick={() => setIsAdmin(!isAdmin)} className={`btn ${isAdmin ? 'btn-primary' : 'btn-outline'}`}>
          {isAdmin ? 'Exit Admin Mode' : 'Admin: Verify Docs'}
        </button>
      </div>

      {!isAdmin && (
        <div className="card" style={{ marginBottom: '2rem', backgroundColor: 'var(--surface)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Upload New Document</h3>
          <form onSubmit={handleUpload} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
            <div style={{ flex: 2 }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Document Title</label>
              <input type="text" value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="e.g. 12th Grade Transcript" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Document Type</label>
              <select value={newType} onChange={e=>setNewType(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid rgba(0, 217, 255, 0.3)', backgroundColor: 'rgba(26, 30, 63, 0.8)', color: 'var(--text-main)', outline: 'none' }}>
                <option>Marksheet</option>
                <option>ID Proof</option>
                <option>Certificate</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
               <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Upload</label>
               <input type="file" style={{ width: '100%' }} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}><UploadCloud size={18} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }}/> Upload</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Document Name</th>
              <th>Type</th>
              <th>Upload Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {docs.map(doc => (
              <tr key={doc.id}>
                <td style={{ fontWeight: 500 }}>{doc.name}</td>
                <td>{doc.type}</td>
                <td>{doc.date}</td>
                <td>
                  <span className={`badge ${doc.status === 'Verified' ? 'badge-success' : doc.status === 'Rejected' ? '' : 'badge-warning'}`} style={doc.status==='Rejected'?{backgroundColor: 'rgba(255, 0, 110, 0.1)',color: 'var(--secondary)'}:{}}>
                    {doc.status}
                  </span>
                </td>
                <td>
                  {isAdmin ? (
                     <div style={{ display: 'flex', gap: '0.5rem' }}>
                       <button onClick={() => handleStatus(doc.id, 'Verified')} className="btn btn-outline" style={{ padding: '0.35rem 0.75rem', borderColor: 'var(--accent-green)', color: 'var(--accent-green)', fontSize: '0.75rem' }}>Verify</button>
                       <button onClick={() => handleStatus(doc.id, 'Rejected')} className="btn btn-outline" style={{ padding: '0.35rem 0.75rem', borderColor: 'var(--secondary)', color: 'var(--secondary)', fontSize: '0.75rem' }}>Reject</button>
                     </div>
                  ) : (
                     <button onClick={() => alert(`Previewing ${doc.name}...`)} className="btn btn-outline" style={{ padding: '0.35rem 1rem', fontSize: '0.85rem' }}>Preview</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsPage() {
  const [name, setName] = useState("Student Applicant");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [email, setEmail] = useState("student@example.com");
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  const handleSave = () => {
    let msg = `Settings Saved!\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`;
    if (smsEnabled) {
      msg += `\n\n(Note: To actually send real SMS text messages to ${phone}, we would need to integrate a third-party paid service API like Twilio to the Node.js backend!)`;
    }
    alert(msg);
  };

  return (
    <div>
      <Topbar />
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-main)' }}>Account Settings</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Manage your personal details and app preferences</p>
      </div>
      
      <div className="card">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1.5rem', borderBottom: '1px solid rgba(0, 217, 255, 0.2)', paddingBottom: '0.5rem' }}>Personal Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Full Name</label>
            <input type="text" value={name} onChange={e=>setName(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Phone Number</label>
            <input type="text" value={phone} onChange={e=>setPhone(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }} />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Email Address</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }} />
          </div>
        </div>
        
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '3rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(0, 217, 255, 0.2)', paddingBottom: '0.5rem' }}>Notifications</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={emailEnabled} onChange={e=>setEmailEnabled(e.target.checked)} style={{ width: '1.25rem', height: '1.25rem' }} />
            <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>Email updates for Application Status</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={smsEnabled} onChange={e=>setSmsEnabled(e.target.checked)} style={{ width: '1.25rem', height: '1.25rem' }} />
            <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>SMS alerts for Entrance Exams</span>
          </label>
        </div>
        
        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button className="btn btn-outline" style={{ padding: '0.75rem 1.5rem' }}>Cancel</button>
          <button onClick={handleSave} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function MeritList() {
  const [meritList, setMeritList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMeritList = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/applications/merit-list');
      setMeritList(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch merit list', err);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchMeritList();
  }, []);

  return (
    <div>
      <Topbar />
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-main)' }}>Auto Merit List</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Ranked list based on academic marks (60%) + exam score (40%)</p>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Application ID</th>
              <th>Student Name</th>
              <th>Program</th>
              <th>Academic Marks</th>
              <th>Exam Score</th>
              <th>Total Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="8" style={{textAlign: 'center'}}>Loading merit list...</td></tr>
            ) : meritList.length === 0 ? (
              <tr><td colSpan="8" style={{textAlign: 'center'}}>No applications found.</td></tr>
            ) : meritList.map(app => (
              <tr key={app._id}>
                <td style={{ fontWeight: 600, color: 'var(--primary)' }}>#{app.rank}</td>
                <td style={{ fontWeight: 500 }}>{app.applicationId}</td>
                <td>{app.studentName}</td>
                <td>{app.program}</td>
                <td>{app.academicMarks}%</td>
                <td>{app.examScore}%</td>
                <td style={{ fontWeight: 600 }}>{app.totalScore.toFixed(2)}</td>
                <td>
                  <span className={`badge ${app.status === 'Admitted' ? 'badge-success' : app.status === 'Processing' ? 'badge-primary' : app.status === 'Waitlisted' ? 'badge-warning' : ''}`}>
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CutoffPrediction() {
  const [predictions, setPredictions] = useState({});
  const [loading, setLoading] = useState(false);

  const programs = [
    'B.S. Computer Science',
    'B.S. Electrical Engineering', 
    'B.S. Mechanical Engineering',
    'B.A. Business Administration'
  ];

  const fetchPrediction = async (program) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5001/api/applications/cutoff-prediction/${encodeURIComponent(program)}`);
      setPredictions(prev => ({ ...prev, [program]: response.data }));
    } catch (err) {
      console.error('Failed to fetch prediction', err);
    }
    setLoading(false);
  };

  return (
    <div>
      <Topbar />
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-main)' }}>Cut-off Prediction System</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Predict admission cut-offs based on historical admission data</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {programs.map(program => (
          <div key={program} className="card">
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>{program}</h3>
            
            {predictions[program] ? (
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  {predictions[program].predictedCutoff}
                </div>
                <div style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Confidence: <span style={{ fontWeight: 600, color: predictions[program].confidence === 'High' ? '#059669' : predictions[program].confidence === 'Medium' ? '#D97706' : '#DC2626' }}>
                    {predictions[program].confidence}
                  </span>
                </div>
              </div>
            ) : (
              <div style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Click to predict cut-off score
              </div>
            )}
            
            <button 
              onClick={() => fetchPrediction(program)} 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Predicting...' : 'Predict Cut-off'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SeatAllocation() {
  const [seats, setSeats] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSeats = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/seats');
      setSeats(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch seats', err);
      setLoading(false);
    }
  };

  const allocateSeats = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/seats/allocate-seats');
      setAllocations(response.data.allocations);
      setSeats(response.data.remainingSeats);
      alert('Seat allocation completed successfully!');
    } catch (err) {
      console.error('Failed to allocate seats', err);
      alert('Failed to allocate seats');
    }
  };

  React.useEffect(() => {
    fetchSeats();
  }, []);

  return (
    <div>
      <Topbar />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-main)' }}>Seat Allocation System</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Automatic seat allocation based on merit and course preferences</p>
        </div>
        <button onClick={allocateSeats} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
          Run Seat Allocation
        </button>
      </div>

      {allocations.length > 0 && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Recent Allocations</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {allocations.map((allocation, index) => (
              <div key={index} style={{ padding: '0.75rem', borderBottom: '1px solid rgba(0, 217, 255, 0.2)', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong>{allocation.studentName}</strong> ({allocation.applicationId})
                </div>
                <div style={{ color: 'var(--primary)', fontWeight: 600 }}>
                  → {allocation.allocatedProgram}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Program</th>
              <th>Department</th>
              <th>Total Seats</th>
              <th>Available Seats</th>
              <th>Cut-off Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{textAlign: 'center'}}>Loading seat data...</td></tr>
            ) : seats.length === 0 ? (
              <tr><td colSpan="6" style={{textAlign: 'center'}}>No seat data available.</td></tr>
            ) : seats.map((seat, index) => (
              <tr key={index}>
                <td style={{ fontWeight: 500 }}>{seat.program}</td>
                <td>{seat.department}</td>
                <td>{seat.totalSeats}</td>
                <td style={{ fontWeight: 600, color: seat.availableSeats > 0 ? '#059669' : '#DC2626' }}>
                  {seat.availableSeats}
                </td>
                <td>{seat.cutoffScore}</td>
                <td>
                  <span className={`badge ${seat.availableSeats > 0 ? 'badge-success' : 'badge-warning'}`}>
                    {seat.availableSeats > 0 ? 'Available' : 'Full'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPaymentHistory = async () => {
    try {
      // Using a mock student ID for demo
      const response = await axios.get('http://localhost:5001/api/payments/history/1');
      setPayments(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch payment history', err);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPaymentHistory();
  }, []);

  return (
    <div>
      <Topbar />
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-main)' }}>Payment History</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Track all your application fee payments</p>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{textAlign: 'center'}}>Loading payment history...</td></tr>
            ) : payments.length === 0 ? (
              <tr><td colSpan="6" style={{textAlign: 'center'}}>No payment history found.</td></tr>
            ) : payments.map(payment => (
              <tr key={payment._id}>
                <td style={{ fontWeight: 500 }}>{payment.applicationId}</td>
                <td>{payment.description}</td>
                <td style={{ fontWeight: 600 }}>₹{payment.amount}</td>
                <td>
                  <span className={`badge ${payment.status === 'paid' ? 'badge-success' : payment.status === 'failed' ? 'badge-danger' : 'badge-warning'}`}>
                    {payment.status}
                  </span>
                </td>
                <td>{payment.paymentMethod || 'N/A'}</td>
                <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Points to the mock authentication route in backend/server.js
      const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      if (res.data.token) {
        onLogin(res.data.user);
      }
    } catch(err) {
      setError('Invalid credentials! Make sure backend is running.');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--gray-50)' }}>
      <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="avatar" style={{ backgroundColor: 'var(--primary)', width: '48px', height: '48px', margin: '0 auto 1rem', fontSize: '1.5rem' }}>U</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>Univex Portal</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Sign in to your account</p>
        </div>
        
        {error && <div style={{ backgroundColor: 'rgba(255, 0, 110, 0.1)', color: 'var(--secondary)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Email Address</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }} placeholder="student@example.com" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }} placeholder="••••••••" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', fontSize: '1rem' }}>Sign In</button>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={(user) => setUser(user)} />;
  }

  return (
    <Router>
      <div className="app-container">
        <Sidebar onLogout={() => setUser(null)} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/merit-list" element={<MeritList />} />
            <Route path="/cutoff-prediction" element={<CutoffPrediction />} />
            <Route path="/seat-allocation" element={<SeatAllocation />} />
            <Route path="/payments" element={<PaymentHistory />} />
            <Route path="/exams" element={<EntranceExams />} />
            <Route path="/mock-tests" element={<MockTests />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;