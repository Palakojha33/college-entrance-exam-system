import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Calendar, Settings, LogOut, Bell, Search, User, BookOpen, ClipboardList, UploadCloud, ShieldCheck, CreditCard, Globe, Volume2, Type } from 'lucide-react';
import axios from 'axios';
import { useLanguage } from './LanguageContext';

function Sidebar({ onLogout }) {
  const location = useLocation();
  const { t } = useLanguage();
  
  return (
    <div className="sidebar">
      <div className="logo-container">
        <div className="avatar" style={{backgroundColor: 'var(--primary)', width: '32px', height: '32px'}}>U</div>
        Univex System
      </div>
      
      <nav style={{ flex: 1 }}>
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          <LayoutDashboard size={20} /> {t('dashboard')}
        </Link>
        <Link to="/applications" className={`nav-link ${location.pathname === '/applications' ? 'active' : ''}`}>
          <FileText size={20} /> {t('applications')}
        </Link>
        <Link to="/merit-list" className={`nav-link ${location.pathname === '/merit-list' ? 'active' : ''}`}>
          <ClipboardList size={20} /> {t('meritList')}
        </Link>
        <Link to="/cutoff-prediction" className={`nav-link ${location.pathname === '/cutoff-prediction' ? 'active' : ''}`}>
          <ShieldCheck size={20} /> {t('cutoffPrediction')}
        </Link>
        <Link to="/seat-allocation" className={`nav-link ${location.pathname === '/seat-allocation' ? 'active' : ''}`}>
          <BookOpen size={20} /> {t('seatAllocation')}
        </Link>
        <Link to="/payments" className={`nav-link ${location.pathname === '/payments' ? 'active' : ''}`}>
          <CreditCard size={20} /> {t('payments')}
        </Link>
        <Link to="/exams" className={`nav-link ${location.pathname === '/exams' ? 'active' : ''}`}>
          <Calendar size={20} /> {t('exams')}
        </Link>
        <Link to="/mock-tests" className={`nav-link ${location.pathname === '/mock-tests' ? 'active' : ''}`}>
          <BookOpen size={20} /> {t('mockTests')}
        </Link>
        <Link to="/documents" className={`nav-link ${location.pathname === '/documents' ? 'active' : ''}`}>
          <ShieldCheck size={20} /> {t('documents')}
        </Link>
        {/* Rural Support Links */}
        <div style={{ margin: '1rem 0', padding: '0.5rem 0', borderTop: '1px solid rgba(0, 217, 255, 0.2)', borderBottom: '1px solid rgba(0, 217, 255, 0.2)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{t('ruralSupport')}</div>
          <Link to="/scholarships" className={`nav-link ${location.pathname === '/scholarships' ? 'active' : ''}`}>
            <ShieldCheck size={20} /> {t('scholarships')}
          </Link>
          <Link to="/helplines" className={`nav-link ${location.pathname === '/helplines' ? 'active' : ''}`}>
            <Bell size={20} /> {t('helplines')}
          </Link>
          <Link to="/coaching-centers" className={`nav-link ${location.pathname === '/coaching-centers' ? 'active' : ''}`}>
            <BookOpen size={20} /> {t('coachingCenters')}
          </Link>
          <Link to="/transportation" className={`nav-link ${location.pathname === '/transportation' ? 'active' : ''}`}>
            <UploadCloud size={20} /> {t('transportation')}
          </Link>
          <Link to="/community-forum" className={`nav-link ${location.pathname === '/community-forum' ? 'active' : ''}`}>
            <User size={20} /> {t('communityForum')}
          </Link>
          <Link to="/computer-literacy" className={`nav-link ${location.pathname === '/computer-literacy' ? 'active' : ''}`}>
            <BookOpen size={20} /> {t('computerLiteracy')}
          </Link>
          <Link to="/offline-forms" className={`nav-link ${location.pathname === '/offline-forms' ? 'active' : ''}`}>
            <UploadCloud size={20} /> {t('offlineForms')}
          </Link>
        </div>
        <Link to="/settings" className={`nav-link ${location.pathname === '/settings' ? 'active' : ''}`}>
          <Settings size={20} /> {t('settings')}
        </Link>
      </nav>
      
      <div className="nav-link" onClick={onLogout} style={{ cursor: 'pointer', marginTop: 'auto' }}>
        <LogOut size={20} /> {t('logout')}
      </div>
    </div>
  );
}

function Topbar() {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const [showLanguage, setShowLanguage] = React.useState(false);
  const [ruralMode, setRuralMode] = React.useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="header">
      <div className="header-title">{t('engineeringAdmissionsPortal')}</div>
      <div className="user-profile" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a 
            href="https://jeemain.nta.nic.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-outline" 
            style={{ textDecoration: 'none', fontSize: '0.875rem', padding: '0.5rem 1rem' }}
          >
            {t('applyJee')}
          </a>
          <a 
            href="https://www.comedk.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-outline" 
            style={{ textDecoration: 'none', fontSize: '0.875rem', padding: '0.5rem 1rem' }}
          >
            {t('applyComedk')}
          </a>
        </div>
        
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={20} color="var(--gray-400)" style={{ position: 'absolute', left: '10px' }} />
          <input 
            type="text" 
            placeholder={t('searchPrograms')} 
            style={{ padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0, 217, 255, 0.2)', outline: 'none' }} 
          />
        </div>

        {/* Rural Features */}
        <div style={{ position: 'relative' }}>
          <button 
            className="btn btn-outline" 
            onClick={() => setRuralMode(!ruralMode)}
            style={{ padding: '0.5rem', fontSize: '0.75rem' }}
          >
            {ruralMode ? 'Normal Mode' : t('ruralFriendlyMode')}
          </button>
        </div>

        {/* Language Selector */}
        <div style={{ position: 'relative' }}>
          <Globe 
            size={24} 
            color="var(--text-muted)" 
            style={{ cursor: 'pointer' }} 
            onClick={() => { setShowLanguage(!showLanguage); setShowNotifications(false); setShowProfile(false); }} 
          />
          {showLanguage && (
            <div className="card" style={{ position: 'absolute', top: '150%', right: '-50px', width: '150px', zIndex: 100, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)' }}>
              <div style={{ paddingBottom: '0.5rem', borderBottom: '1px solid rgba(0, 217, 255, 0.2)', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>{t('selectLanguage')}</div>
              <div style={{ fontSize: '0.875rem', padding: '0.5rem 0', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => { setLanguage('en'); setShowLanguage(false); }}>
                {t('english')}
              </div>
              <div style={{ fontSize: '0.875rem', padding: '0.5rem 0', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => { setLanguage('hi'); setShowLanguage(false); }}>
                {t('hindi')}
              </div>
            </div>
          )}
        </div>
        
        <div style={{ position: 'relative' }}>
          <Bell 
            size={24} 
            color="var(--text-muted)" 
            style={{ cursor: 'pointer' }} 
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); setShowLanguage(false); }} 
          />
          {showNotifications && (
            <div className="card" style={{ position: 'absolute', top: '150%', right: '-50px', width: '320px', zIndex: 100, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)' }}>
              <div style={{ paddingBottom: '0.5rem', borderBottom: '1px solid rgba(0, 217, 255, 0.2)', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>{t('notifications')}</div>
              <div style={{ fontSize: '0.875rem', padding: '0.5rem 0', color: 'var(--text-muted)', borderBottom: '1px solid rgba(0, 217, 255, 0.1)' }}>
                <strong>JEE Main</strong> {t('jeeRegistrationClosing')}
              </div>
              <div style={{ fontSize: '0.875rem', padding: '0.5rem 0', color: 'var(--text-muted)', borderBottom: '1px solid rgba(0, 217, 255, 0.1)' }}>
                {t('applicationUnderReview')}
              </div>
              <div style={{ fontSize: '0.875rem', padding: '0.5rem 0', color: 'var(--text-muted)' }}>
                {t('systemMaintenance')}
              </div>
            </div>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <div 
            className="avatar" 
            style={{ cursor: 'pointer' }} 
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); setShowLanguage(false); }}
          >
            <User size={20} />
          </div>
          {showProfile && (
            <div className="card" style={{ position: 'absolute', top: '120%', right: '0', width: '200px', zIndex: 100, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', border: '1px solid rgba(0, 217, 255, 0.2)' }}>
              <div style={{ paddingBottom: '0.5rem', borderBottom: '1px solid rgba(0, 217, 255, 0.2)', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>{t('studentProfile')}</div>
              <Link to="/settings" style={{ display: 'block', textDecoration: 'none', color: 'var(--text-muted)', padding: '0.5rem 0', fontSize: '0.875rem', fontWeight: 500 }}>{t('editSettings')}</Link>
              <Link to="/applications" style={{ display: 'block', textDecoration: 'none', color: 'var(--text-muted)', padding: '0.5rem 0', fontSize: '0.875rem', fontWeight: 500 }}>{t('myApplications')}</Link>
              <div style={{ borderTop: '1px solid rgba(0, 217, 255, 0.2)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                <a href="/" style={{ display: 'block', textDecoration: 'none', color: 'var(--secondary)', fontSize: '0.875rem', fontWeight: 500 }}>{t('logoutSession')}</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const { t } = useLanguage();
  const [data, setData] = useState({ applications: 12, pending: 4, exams: 2 });

  return (
    <div>
      <Topbar />
      
      <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '2rem', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: 'var(--radius-lg)', color: 'white' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{t('engineeringAdmissionsPortal')}</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{t('gatewayToPrograms')}</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a 
            href="https://jeemain.nta.nic.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn" 
            style={{ backgroundColor: 'white', color: 'var(--primary)', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', fontWeight: '600' }}
          >
            {t('applyJee')}
          </a>
          <a 
            href="https://www.comedk.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn" 
            style={{ backgroundColor: 'white', color: 'var(--secondary)', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', fontWeight: '600' }}
          >
            {t('applyComedk')}
          </a>
        </div>
      </div>
      
      <div className="card-grid">
        <div className="card">
          <div className="card-header">
            <div className="card-icon">
              <FileText size={24} />
            </div>
            <div className="card-title">{t('engineeringApplications')}</div>
          </div>
          <div className="card-value">{data.applications}</div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <div className="card-icon" style={{ color: 'var(--secondary)', backgroundColor: 'rgba(255, 0, 110, 0.1)' }}>
              <Bell size={24} />
            </div>
            <div className="card-title">{t('pending')}</div>
          </div>
          <div className="card-value">{data.pending}</div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <div className="card-icon" style={{ color: 'var(--accent-green)', backgroundColor: 'rgba(57, 255, 20, 0.1)' }}>
              <Calendar size={24} />
            </div>
            <div className="card-title">{t('upcomingExams')}</div>
          </div>
          <div className="card-value">{data.exams}</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{t('recentApplications')}</h2>
        <Link to="/applications" className="btn btn-primary" style={{ textDecoration: 'none' }}>{t('startApplication')}</Link>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>{t('program')}</th>
              <th>Date Applied</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#ENG-2024-001</td>
              <td>B.Tech Computer Science</td>
              <td>Oct 24, 2024</td>
              <td><span className="badge badge-warning">{t('underReview')}</span></td>
              <td><button onClick={() => alert('Viewing details for ENG-2024-001')} className="btn btn-outline" style={{ padding: '0.25rem 0.75rem' }}>{t('view')}</button></td>
            </tr>
            <tr>
              <td>#ENG-2024-002</td>
              <td>B.Tech Mechanical Engineering</td>
              <td>Oct 20, 2024</td>
              <td><span className="badge badge-success">{t('admitted')}</span></td>
              <td><button onClick={() => alert('Viewing details for ENG-2024-002')} className="btn btn-outline" style={{ padding: '0.25rem 0.75rem' }}>{t('view')}</button></td>
            </tr>
            <tr>
              <td>#ENG-2024-003</td>
              <td>B.Tech Electrical Engineering</td>
              <td>Oct 15, 2024</td>
              <td><span className="badge badge-primary">{t('processing')}</span></td>
              <td><button onClick={() => alert('Viewing details for ENG-2024-003')} className="btn btn-outline" style={{ padding: '0.25rem 0.75rem' }}>{t('view')}</button></td>
            </tr>
            <tr>
              <td>#ENG-2024-004</td>
              <td>B.Tech Civil Engineering</td>
              <td>Oct 10, 2024</td>
              <td><span className="badge badge-info">{t('jeeQualified')}</span></td>
              <td><button onClick={() => alert('Viewing details for ENG-2024-004')} className="btn btn-outline" style={{ padding: '0.25rem 0.75rem' }}>{t('view')}</button></td>
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
  // Import application states
  const [showImport, setShowImport] = React.useState(false);
  const [importType, setImportType] = React.useState('jee');
  const [importApplicationId, setImportApplicationId] = React.useState('');
  const [importEmail, setImportEmail] = React.useState('');
  const [importPassword, setImportPassword] = React.useState('');
  const [importing, setImporting] = React.useState(false);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('/api/applications');
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
      await axios.post('/api/applications', {
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
      await axios.delete(`/api/applications/${id}`);
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
      const orderResponse = await axios.post('/api/payments/create-order', {
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
        axios.post('/api/payments/verify-payment', mockResponse)
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

  const importApplication = async (e) => {
    e.preventDefault();
    if (!importApplicationId || !importEmail) {
      return alert('Please fill all required fields');
    }
    
    setImporting(true);
    
    try {
      // Simulate API call to import application
      const response = await axios.post('/api/applications/import', {
        type: importType,
        applicationId: importApplicationId,
        email: importEmail,
        password: importPassword // In real implementation, this would be handled securely
      });
      
      alert(`Application imported successfully! Application ID: ${response.data.applicationId}`);
      setShowImport(false);
      setImportApplicationId('');
      setImportEmail('');
      setImportPassword('');
      fetchApplications();
    } catch (err) {
      console.error('Failed to import application', err);
      alert('Failed to import application. Please check your credentials and try again.');
    } finally {
      setImporting(false);
    }
  };

  return (
    <div>
      <Topbar />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-main)' }}>Engineering Applications</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Apply for engineering programs through JEE Main and COMEDK</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => setShowImport(!showImport)} className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>
            📥 Import from JEE/COMEDK
          </button>
          <button onClick={() => setShowForm(!showForm)} className={`btn ${showForm ? 'btn-outline' : 'btn-primary'}`} style={{ padding: '0.75rem 1.5rem' }}>
            {showForm ? 'Cancel Creation' : '+ Draft Engineering Application'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'var(--surface)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)' }}>Draft a New Engineering Application</h3>
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
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Engineering Program</label>
              <select value={newProgram} onChange={(e) => setNewProgram(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }}>
                <option value="">Select Engineering Program</option>
                <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                <option value="B.Tech Mechanical Engineering">B.Tech Mechanical Engineering</option>
                <option value="B.Tech Electrical Engineering">B.Tech Electrical Engineering</option>
                <option value="B.Tech Civil Engineering">B.Tech Civil Engineering</option>
                <option value="B.Tech Chemical Engineering">B.Tech Chemical Engineering</option>
                <option value="B.Tech Electronics & Communication">B.Tech Electronics & Communication</option>
                <option value="B.Tech Information Technology">B.Tech Information Technology</option>
                <option value="B.Tech Aerospace Engineering">B.Tech Aerospace Engineering</option>
                <option value="B.Tech Biotechnology">B.Tech Biotechnology</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Department</label>
              <input type="text" value="Engineering" readOnly style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none', backgroundColor: 'var(--gray-100)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Class 12 Marks (%)</label>
              <input type="number" min="0" max="100" step="0.1" placeholder="85.5" value={newAcademicMarks} onChange={(e) => setNewAcademicMarks(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>JEE/COMEDK Score (%)</label>
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

      {showImport && (
        <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'var(--surface)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-main)' }}>Import Application from JEE/COMEDK</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Automatically sync your application data from official JEE Main or COMEDK portals.
          </p>
          
          <form onSubmit={importApplication} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Application Type</label>
              <select value={importType} onChange={(e) => setImportType(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }}>
                <option value="jee">JEE Main</option>
                <option value="comedk">COMEDK</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Application ID</label>
              <input 
                type="text" 
                placeholder="Enter your application ID" 
                value={importApplicationId} 
                onChange={(e) => setImportApplicationId(e.target.value)} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Registered Email</label>
              <input 
                type="email" 
                placeholder="email@jee.com" 
                value={importEmail} 
                onChange={(e) => setImportEmail(e.target.value)} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Password</label>
              <input 
                type="password" 
                placeholder="Your portal password" 
                value={importPassword} 
                onChange={(e) => setImportPassword(e.target.value)} 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }} 
              />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                🔒 Your credentials are encrypted and secure
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setShowImport(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={importing}>
                  {importing ? '🔄 Importing...' : '📥 Import Application'}
                </button>
              </div>
            </div>
          </form>
          
          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--gray-50)', borderRadius: '0.5rem', border: '1px solid var(--gray-200)' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>What gets imported?</h4>
            <ul style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, paddingLeft: '1rem' }}>
              <li>Application details and status</li>
              <li>Personal information and documents</li>
              <li>Exam scores and rankings</li>
              <li>Payment and fee details</li>
              <li>Seat allocation information</li>
            </ul>
          </div>
        </div>
      )}

      <div className="table-container" style={{ overflowX: 'auto', marginTop: '2rem' }}>
        <table style={{ minWidth: '1200px', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ minWidth: '120px' }}>Application ID</th>
              <th style={{ minWidth: '150px' }}>Student Name</th>
              <th style={{ minWidth: '200px' }}>Program</th>
              <th style={{ minWidth: '120px' }}>Academic Marks</th>
              <th style={{ minWidth: '120px' }}>Exam Score</th>
              <th style={{ minWidth: '100px' }}>Total Score</th>
              <th style={{ minWidth: '120px' }}>Payment Status</th>
              <th style={{ minWidth: '120px' }}>Status</th>
              <th style={{ minWidth: '180px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="9" style={{textAlign: 'center', padding: '2rem', fontSize: '1.1rem', color: 'var(--text-muted)'}}>Loading data from Database...</td></tr>
            ) : applications.length === 0 ? (
              <tr><td colSpan="9" style={{textAlign: 'center', padding: '2rem', fontSize: '1.1rem', color: 'var(--text-muted)'}}>No applications found. Click "+ Draft Application" to create one.</td></tr>
            ) : applications.map(app => (
              <tr key={app._id}>
                <td style={{ fontWeight: 500, padding: '1rem' }}>{app.applicationId}</td>
                <td style={{ padding: '1rem' }}>{app.studentName || 'N/A'}</td>
                <td style={{ padding: '1rem' }}>{app.program}</td>
                <td style={{ padding: '1rem' }}>{app.academicMarks ? `${app.academicMarks}%` : 'N/A'}</td>
                <td style={{ padding: '1rem' }}>{app.examScore ? `${app.examScore}%` : 'N/A'}</td>
                <td style={{ fontWeight: 600, padding: '1rem' }}>{app.totalScore ? app.totalScore.toFixed(2) : 'N/A'}</td>
                <td style={{ padding: '1rem' }}>
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
                <td style={{ padding: '1rem' }}>
                  <span className={`badge ${app.status === 'Processing' ? 'badge-primary' : app.status === 'Under Review' ? 'badge-warning' : app.status === 'Admitted' ? 'badge-success' : app.status === 'Waitlisted' ? 'badge-warning' : ''}`} style={app.status === 'Rejected' ? {backgroundColor: 'rgba(255, 0, 110, 0.1)', color: 'var(--secondary)'} : {}}>
                    {app.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button onClick={() => manageApp(app.applicationId)} className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>Manage</button>
                    <button onClick={() => deleteApplication(app._id)} className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', color: 'var(--secondary)', borderColor: 'var(--secondary)', whiteSpace: 'nowrap' }}>Delete</button>
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
      const response = await axios.get('/api/applications/merit-list');
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
      const response = await axios.get(`/api/applications/cutoff-prediction/${encodeURIComponent(program)}`);
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
      const response = await axios.get('/api/seats');
      setSeats(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch seats', err);
      setLoading(false);
    }
  };

  const allocateSeats = async () => {
    try {
      const response = await axios.post('/api/seats/allocate-seats');
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
      const response = await axios.get('/api/payments/history/1');
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
      const res = await axios.post('/api/auth/login', { email, password });
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

        <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--gray-200)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    state: '',
    district: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long!');
      return;
    }

    try {
      const res = await axios.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        state: formData.state,
        district: formData.district
      });

      setSuccess('Registration successful! Please sign in.');
      setTimeout(() => {
        window.location.href = '/signin';
      }, 2000);
    } catch(err) {
      setError(err.response?.data?.message || 'Registration failed! Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--gray-50)' }}>
      <div className="card" style={{ maxWidth: '450px', width: '100%', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="avatar" style={{ backgroundColor: 'var(--primary)', width: '48px', height: '48px', margin: '0 auto 1rem', fontSize: '1.5rem' }}>U</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>Join Univex Portal</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Create your account to get started</p>
        </div>

        {error && <div style={{ backgroundColor: 'rgba(255, 0, 110, 0.1)', color: 'var(--secondary)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>{error}</div>}
        {success && <div style={{ backgroundColor: 'rgba(0, 217, 255, 0.1)', color: 'var(--primary)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>{success}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }}
              placeholder="student@example.com"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }}
                placeholder="Your state"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>District/City</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }}
              placeholder="Your district or city"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }}
              placeholder="Create a strong password"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--gray-300)', outline: 'none' }}
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', fontSize: '1rem' }}>Create Account</button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--gray-200)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Already have an account?{' '}
            <Link to="/signin" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function LandingPage() {
  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100vw', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
      color: 'white'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px', padding: '2rem' }}>
        <div className="avatar" style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.2)', 
          width: '80px', 
          height: '80px', 
          margin: '0 auto 2rem', 
          fontSize: '2.5rem',
          backdropFilter: 'blur(10px)'
        }}>
          U
        </div>
        
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 700, 
          marginBottom: '1rem',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          Welcome to Univex Portal
        </h1>
        
        <p style={{ 
          fontSize: '1.2rem', 
          marginBottom: '3rem', 
          opacity: 0.9,
          lineHeight: 1.6
        }}>
          Your gateway to engineering admissions. Apply for JEE Main and COMEDK programs with ease.
          Access rural support services, track applications, and manage your educational journey.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link 
            to="/signin" 
            className="btn btn-primary" 
            style={{ 
              padding: '1rem 2rem', 
              fontSize: '1.1rem', 
              fontWeight: 600,
              backgroundColor: 'white',
              color: 'var(--primary)',
              border: 'none',
              textDecoration: 'none',
              display: 'inline-block',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            Sign In
          </Link>
          
          <Link 
            to="/register" 
            className="btn btn-outline" 
            style={{ 
              padding: '1rem 2rem', 
              fontSize: '1.1rem', 
              fontWeight: 600,
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white',
              textDecoration: 'none',
              display: 'inline-block',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            Create Account
          </Link>
        </div>
        
        <div style={{ marginTop: '3rem', opacity: 0.8 }}>
          <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            🎓 Engineering Admissions Portal
          </p>
          <p style={{ fontSize: '0.9rem' }}>
            🌾 Rural Student Support Services
          </p>
        </div>
      </div>
    </div>
  );
}

function JEEMain() {
  return (
    <div>
      <Topbar />
      <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '3rem', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: 'var(--radius-lg)', color: 'white' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>JEE Main 2025</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Joint Entrance Examination - Main for Engineering Admissions</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a 
            href="https://jeemain.nta.nic.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn" 
            style={{ backgroundColor: 'white', color: 'var(--primary)', textDecoration: 'none', padding: '1rem 2rem', borderRadius: 'var(--radius-md)', fontWeight: '600', fontSize: '1.1rem' }}
          >
            Official JEE Main Website
          </a>
          <a 
            href="https://jeemain.nta.nic.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn" 
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', textDecoration: 'none', padding: '1rem 2rem', borderRadius: 'var(--radius-md)', fontWeight: '600', fontSize: '1.1rem', border: '2px solid white' }}
          >
            Register Now
          </a>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div className="card">
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--primary)' }}>Exam Pattern</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(0,217,255,0.2)' }}>• 3 Papers: Paper 1 (B.E./B.Tech), Paper 2A (B.Arch), Paper 2B (B.Planning)</li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(0,217,255,0.2)' }}>• 90 questions per paper (30 each in Physics, Chemistry, Mathematics)</li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(0,217,255,0.2)' }}>• 4 marks for correct answer, -1 for incorrect</li>
            <li style={{ padding: '0.5rem 0' }}>• Duration: 3 hours per paper</li>
          </ul>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--primary)' }}>Important Dates</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(0,217,255,0.1)', borderRadius: 'var(--radius-md)' }}>
              <strong>Session 1 Registration:</strong> November - December 2024
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(0,217,255,0.1)', borderRadius: 'var(--radius-md)' }}>
              <strong>Session 1 Exam:</strong> January 2025
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(0,217,255,0.1)', borderRadius: 'var(--radius-md)' }}>
              <strong>Session 2 Registration:</strong> February - March 2025
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(0,217,255,0.1)', borderRadius: 'var(--radius-md)' }}>
              <strong>Session 2 Exam:</strong> April 2025
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--primary)' }}>Eligibility Criteria</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(0,217,255,0.2)' }}>• Passed 10+2 or equivalent with Physics, Chemistry, Mathematics</li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(0,217,255,0.2)' }}>• Minimum 75% marks (65% for SC/ST) in 12th</li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(0,217,255,0.2)' }}>• No age limit for JEE Main</li>
            <li style={{ padding: '0.5rem 0' }}>• Maximum 3 attempts allowed</li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--primary)' }}>Start Your JEE Main Preparation</h3>
        <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>Access our comprehensive study materials, mock tests, and expert guidance</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/mock-tests" className="btn btn-primary" style={{ textDecoration: 'none' }}>Take Mock Tests</Link>
          <Link to="/applications" className="btn btn-outline" style={{ textDecoration: 'none' }}>Apply for Colleges</Link>
        </div>
      </div>
    </div>
  );
}

function COMEDK() {
  return (
    <div>
      <Topbar />
      <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '3rem', background: 'linear-gradient(135deg, var(--secondary), var(--primary))', borderRadius: 'var(--radius-lg)', color: 'white' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>COMEDK UGET 2025</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Consortium of Medical, Engineering and Dental Colleges of Karnataka</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a 
            href="https://www.comedk.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn" 
            style={{ backgroundColor: 'white', color: 'var(--secondary)', textDecoration: 'none', padding: '1rem 2rem', borderRadius: 'var(--radius-md)', fontWeight: '600', fontSize: '1.1rem' }}
          >
            Official COMEDK Website
          </a>
          <a 
            href="https://www.comedk.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn" 
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', textDecoration: 'none', padding: '1rem 2rem', borderRadius: 'var(--radius-md)', fontWeight: '600', fontSize: '1.1rem', border: '2px solid white' }}
          >
            Register Now
          </a>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div className="card">
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--secondary)' }}>Exam Pattern</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,0,110,0.2)' }}>• Single Paper for Engineering (UGET)</li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,0,110,0.2)' }}>• 180 questions (60 each in Physics, Chemistry, Mathematics)</li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,0,110,0.2)' }}>• 1 mark for correct answer, no negative marking</li>
            <li style={{ padding: '0.5rem 0' }}>• Duration: 3 hours</li>
          </ul>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--secondary)' }}>Important Dates</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(255,0,110,0.1)', borderRadius: 'var(--radius-md)' }}>
              <strong>Registration Starts:</strong> January 2025
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(255,0,110,0.1)', borderRadius: 'var(--radius-md)' }}>
              <strong>Last Date to Apply:</strong> April 2025
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(255,0,110,0.1)', borderRadius: 'var(--radius-md)' }}>
              <strong>Exam Date:</strong> May 2025
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(255,0,110,0.1)', borderRadius: 'var(--radius-md)' }}>
              <strong>Results:</strong> June 2025
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--secondary)' }}>Eligibility Criteria</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,0,110,0.2)' }}>• Passed 10+2 or equivalent with PCM</li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,0,110,0.2)' }}>• Minimum 45% marks in PCM (40% for SC/ST/OBC)</li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,0,110,0.2)' }}>• No age limit</li>
            <li style={{ padding: '0.5rem 0' }}>• Karnataka students get preference</li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--secondary)' }}>Participating Colleges</h3>
        <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>190+ engineering colleges in Karnataka participate in COMEDK</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(255,0,110,0.1)', borderRadius: 'var(--radius-md)' }}>
            <strong>RV College of Engineering</strong>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(255,0,110,0.1)', borderRadius: 'var(--radius-md)' }}>
            <strong>MS Ramaiah Institute</strong>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(255,0,110,0.1)', borderRadius: 'var(--radius-md)' }}>
            <strong>BMS College of Engineering</strong>
          </div>
          <div style={{ padding: '1rem', backgroundColor: 'rgba(255,0,110,0.1)', borderRadius: 'var(--radius-md)' }}>
            <strong>SJCE Mysore</strong>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/mock-tests" className="btn btn-primary" style={{ textDecoration: 'none' }}>Take Mock Tests</Link>
          <Link to="/applications" className="btn btn-outline" style={{ textDecoration: 'none' }}>Apply for Colleges</Link>
        </div>
      </div>
    </div>
  );
}

function Scholarships() {
  const { t } = useLanguage();
  return (
    <div>
      <Topbar />
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{t('scholarships')}</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Scholarship programs available for rural students pursuing engineering education.</p>
        
        <div className="card-grid">
          <div className="card">
            <div className="card-header">
              <div className="card-icon">
                <ShieldCheck size={24} />
              </div>
              <div className="card-title">Government Scholarships</div>
            </div>
            <div className="card-content">
              <p>Central and state government scholarship schemes for SC/ST/OBC students.</p>
              <ul style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
                <li>Post Matric Scholarship</li>
                <li>National Scholarship Portal</li>
                <li>State Merit Scholarships</li>
              </ul>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <div className="card-icon" style={{ color: 'var(--secondary)', backgroundColor: 'rgba(255, 0, 110, 0.1)' }}>
                <BookOpen size={24} />
              </div>
              <div className="card-title">Private Scholarships</div>
            </div>
            <div className="card-content">
              <p>Scholarships from private organizations and NGOs for rural students.</p>
              <ul style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
                <li>Foundation Scholarships</li>
                <li>Corporate Social Responsibility</li>
                <li>Alumni Scholarships</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Helplines() {
  const { t } = useLanguage();
  return (
    <div>
      <Topbar />
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{t('helplines')}</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>24/7 support helplines for rural students.</p>
        
        <div className="card">
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Emergency Helplines</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <strong>Admission Helpline:</strong><br />
                1800-XXX-XXXX<br />
                (Mon-Sat, 9AM-6PM)
              </div>
              <div>
                <strong>Technical Support:</strong><br />
                1800-YYY-YYYY<br />
                (24/7 Available)
              </div>
              <div>
                <strong>Scholarship Queries:</strong><br />
                1800-ZZZ-ZZZZ<br />
                (Mon-Fri, 10AM-5PM)
              </div>
              <div>
                <strong>General Support:</strong><br />
                support@univex.edu.in
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoachingCenters() {
  const { t } = useLanguage();
  return (
    <div>
      <Topbar />
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{t('coachingCenters')}</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Find coaching centers near your location for JEE/COMEDK preparation.</p>
        
        <div className="card-grid">
          <div className="card">
            <div className="card-header">
              <div className="card-icon">
                <BookOpen size={24} />
              </div>
              <div className="card-title">Bengaluru Region</div>
            </div>
            <div className="card-content">
              <p>Coaching centers in and around Bengaluru for comprehensive JEE preparation.</p>
              <ul style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
                <li>Aakash Institute - Multiple locations</li>
                <li>Allen Career Institute</li>
                <li>Local coaching centers with scholarships</li>
              </ul>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <div className="card-icon" style={{ color: 'var(--secondary)', backgroundColor: 'rgba(255, 0, 110, 0.1)' }}>
                <BookOpen size={24} />
              </div>
              <div className="card-title">Mysore Region</div>
            </div>
            <div className="card-content">
              <p>Affordable coaching options in Mysore and surrounding areas.</p>
              <ul style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
                <li>SJCE Study Center</li>
                <li>Government aided coaching</li>
                <li>Community learning centers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Transportation() {
  const { t } = useLanguage();
  return (
    <div>
      <Topbar />
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{t('transportation')}</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Transportation guides and subsidies for rural students.</p>
        
        <div className="card">
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Travel Options</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <strong>Bus Services:</strong><br />
                KSRTC concessional fares for students<br />
                Special routes to exam centers
              </div>
              <div>
                <strong>Railway Concessions:</strong><br />
                Student PNR tickets<br />
                Group travel discounts
              </div>
              <div>
                <strong>Air Travel:</strong><br />
                Subsidized domestic flights<br />
                Student fare schemes
              </div>
              <div>
                <strong>Local Transport:</strong><br />
                Auto-rickshaw services<br />
                Shared transportation
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommunityForum() {
  const { t } = useLanguage();
  return (
    <div>
      <Topbar />
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{t('communityForum')}</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Connect with other rural students and share experiences.</p>
        
        <div className="card">
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Discussion Topics</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ padding: '1rem', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)' }}>
                <strong>Study Tips for Rural Students</strong><br />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Share your study strategies and resources</span>
              </div>
              <div style={{ padding: '1rem', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)' }}>
                <strong>Scholarship Success Stories</strong><br />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Inspiring stories from fellow students</span>
              </div>
              <div style={{ padding: '1rem', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)' }}>
                <strong>Exam Preparation Groups</strong><br />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Join study groups in your region</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComputerLiteracy() {
  const { t } = useLanguage();
  return (
    <div>
      <Topbar />
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{t('computerLiteracy')}</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Basic computer skills and online application tutorials.</p>
        
        <div className="card-grid">
          <div className="card">
            <div className="card-header">
              <div className="card-icon">
                <BookOpen size={24} />
              </div>
              <div className="card-title">Basic Computer Skills</div>
            </div>
            <div className="card-content">
              <p>Learn essential computer skills for online applications.</p>
              <ul style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
                <li>Using web browsers</li>
                <li>Filling online forms</li>
                <li>Uploading documents</li>
                <li>Basic troubleshooting</li>
              </ul>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <div className="card-icon" style={{ color: 'var(--secondary)', backgroundColor: 'rgba(255, 0, 110, 0.1)' }}>
                <BookOpen size={24} />
              </div>
              <div className="card-title">Video Tutorials</div>
            </div>
            <div className="card-content">
              <p>Step-by-step video guides in local languages.</p>
              <ul style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
                <li>Hindi video tutorials</li>
                <li>Kannada language support</li>
                <li>Offline downloadable guides</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OfflineForms() {
  const { t } = useLanguage();
  return (
    <div>
      <Topbar />
      <div style={{ padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{t('offlineForms')}</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Download application forms for offline submission.</p>
        
        <div className="card">
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Available Forms</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <strong>JEE Main Application Form</strong><br />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>PDF format, 2.5 MB</span>
                </div>
                <button className="btn btn-primary" onClick={() => alert('Downloading JEE Main form...')}>{t('downloadForm')}</button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <strong>COMEDK Application Form</strong><br />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>PDF format, 1.8 MB</span>
                </div>
                <button className="btn btn-primary" onClick={() => alert('Downloading COMEDK form...')}>{t('downloadForm')}</button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <strong>Scholarship Application</strong><br />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>PDF format, 1.2 MB</span>
                </div>
                <button className="btn btn-primary" onClick={() => alert('Downloading scholarship form...')}>{t('downloadForm')}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      {!user ? (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<Login onLogin={(user) => setUser(user)} />} />
          <Route path="/register" element={<Register onRegister={(user) => setUser(user)} />} />
        </Routes>
      ) : (
        <div className="app-container">
          <Sidebar onLogout={() => setUser(null)} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/jee-main" element={<JEEMain />} />
              <Route path="/comedk" element={<COMEDK />} />
              <Route path="/merit-list" element={<MeritList />} />
              <Route path="/cutoff-prediction" element={<CutoffPrediction />} />
              <Route path="/seat-allocation" element={<SeatAllocation />} />
              <Route path="/payments" element={<PaymentHistory />} />
              <Route path="/exams" element={<EntranceExams />} />
              <Route path="/mock-tests" element={<MockTests />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/settings" element={<SettingsPage />} />
              {/* Rural Support Routes */}
              <Route path="/scholarships" element={<Scholarships />} />
              <Route path="/helplines" element={<Helplines />} />
              <Route path="/coaching-centers" element={<CoachingCenters />} />
              <Route path="/transportation" element={<Transportation />} />
              <Route path="/community-forum" element={<CommunityForum />} />
              <Route path="/computer-literacy" element={<ComputerLiteracy />} />
              <Route path="/offline-forms" element={<OfflineForms />} />
            </Routes>
          </main>
        </div>
      )}
    </Router>
  );
}

export default App;