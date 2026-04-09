const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');

const app = express();
app.use(express.json());
app.use(cors());

// Razorpay configuration
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_your_key_id', // Replace with your Razorpay Key ID
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'your_secret_key' // Replace with your Razorpay Key Secret
});

console.log('Using in-memory array database (No MongoDB required!)');

// In-memory database (will reset when server restarts)
let applications = [
  { 
    _id: '1', 
    applicationId: '#ENG-2024-001', 
    studentName: 'Palak Ojha',
    email: 'palak.ojha@example.com',
    program: 'B.Tech Computer Science', 
    department: 'Engineering', 
    coursePreferences: [
      { program: 'B.Tech Computer Science', department: 'Engineering', priority: 1 },
      { program: 'B.Tech Information Technology', department: 'Engineering', priority: 2 }
    ],
    academicMarks: 85,
    examScore: 92,
    totalScore: 87.8,
    applicationFee: 500,
    paymentStatus: 'paid',
    paymentId: 'pay_test_123456789',
    status: 'Under Review', 
    submittedDate: new Date('2024-10-24') 
  },
  { 
    _id: '2', 
    applicationId: '#ENG-2024-002', 
    studentName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    program: 'B.Tech Mechanical Engineering', 
    department: 'Engineering', 
    coursePreferences: [
      { program: 'B.Tech Mechanical Engineering', department: 'Engineering', priority: 1 }
    ],
    academicMarks: 78,
    examScore: 88,
    totalScore: 81.6,
    applicationFee: 500,
    paymentStatus: 'paid',
    paymentId: 'pay_test_987654321',
    status: 'Admitted', 
    admittedProgram: 'B.Tech Mechanical Engineering',
    submittedDate: new Date('2024-10-20') 
  },
  { 
    _id: '3', 
    applicationId: '#ENG-2024-003', 
    studentName: 'Priya Patel',
    email: 'priya.patel@example.com',
    program: 'B.Tech Electrical Engineering', 
    department: 'Engineering', 
    coursePreferences: [
      { program: 'B.Tech Electrical Engineering', department: 'Engineering', priority: 1 },
      { program: 'B.Tech Electronics & Communication', department: 'Engineering', priority: 2 }
    ],
    academicMarks: 82,
    examScore: 85,
    totalScore: 83.2,
    applicationFee: 500,
    paymentStatus: 'pending',
    status: 'Processing', 
    submittedDate: new Date('2024-10-15') 
  },
  { 
    _id: '4', 
    applicationId: '#ENG-2024-004', 
    studentName: 'Amit Kumar',
    email: 'amit.kumar@example.com',
    program: 'B.Tech Civil Engineering', 
    department: 'Engineering', 
    coursePreferences: [
      { program: 'B.Tech Civil Engineering', department: 'Engineering', priority: 1 }
    ],
    academicMarks: 80,
    examScore: 87,
    totalScore: 82.6,
    applicationFee: 500,
    paymentStatus: 'paid',
    paymentId: 'pay_test_456789123',
    status: 'JEE Qualified', 
    submittedDate: new Date('2024-10-10') 
  }
];

// Payment history
let payments = [
  {
    _id: '1',
    applicationId: '#APP-2024-001',
    studentId: '1',
    studentName: 'Palak Ojha',
    email: 'palak.ojha@example.com',
    amount: 500,
    currency: 'INR',
    razorpayOrderId: 'order_test_123456789',
    razorpayPaymentId: 'pay_test_123456789',
    status: 'paid',
    paymentMethod: 'card',
    description: 'College Application Fee',
    createdAt: new Date('2024-10-24'),
    paidAt: new Date('2024-10-24')
  },
  {
    _id: '2',
    applicationId: '#APP-2024-002',
    studentId: '2',
    studentName: 'Palak Ojha',
    email: 'palak.ojha@example.com',
    amount: 500,
    currency: 'INR',
    razorpayOrderId: 'order_test_987654321',
    razorpayPaymentId: 'pay_test_987654321',
    status: 'paid',
    paymentMethod: 'netbanking',
    description: 'College Application Fee',
    createdAt: new Date('2024-10-20'),
    paidAt: new Date('2024-10-20')
  }
];

// Seat allocation data
let seatAllocations = [
  { program: 'B.Tech Computer Science', department: 'Engineering', totalSeats: 120, availableSeats: 95, cutoffScore: 85 },
  { program: 'B.Tech Mechanical Engineering', department: 'Engineering', totalSeats: 100, availableSeats: 88, cutoffScore: 80 },
  { program: 'B.Tech Electrical Engineering', department: 'Engineering', totalSeats: 90, availableSeats: 82, cutoffScore: 82 },
  { program: 'B.Tech Civil Engineering', department: 'Engineering', totalSeats: 80, availableSeats: 75, cutoffScore: 78 },
  { program: 'B.Tech Chemical Engineering', department: 'Engineering', totalSeats: 60, availableSeats: 58, cutoffScore: 75 },
  { program: 'B.Tech Electronics & Communication', department: 'Engineering', totalSeats: 85, availableSeats: 78, cutoffScore: 83 },
  { program: 'B.Tech Information Technology', department: 'Engineering', totalSeats: 95, availableSeats: 87, cutoffScore: 84 },
  { program: 'B.Tech Aerospace Engineering', department: 'Engineering', totalSeats: 50, availableSeats: 48, cutoffScore: 88 },
  { program: 'B.Tech Biotechnology', department: 'Engineering', totalSeats: 40, availableSeats: 38, cutoffScore: 80 }
];

// Mock routes for Auth
const authRoutes = express.Router();

// In-memory user database
let users = [
  {
    _id: '1',
    name: 'Demo Student',
    email: 'student@example.com',
    password: 'password123',
    phone: '+91 9876543210',
    state: 'Karnataka',
    district: 'Bangalore',
    role: 'student',
    createdAt: new Date('2024-01-01')
  }
];

authRoutes.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    token: 'mock_token_' + user._id,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

authRoutes.post('/register', (req, res) => {
  const { name, email, password, phone, state, district } = req.body;

  // Basic validation
  if (!name || !email || !password || !phone || !state || !district) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }

  // Create new user
  const newUser = {
    _id: (users.length + 1).toString(),
    name,
    email,
    password, // In production, this should be hashed
    phone,
    state,
    district,
    role: 'student',
    createdAt: new Date()
  };

  users.push(newUser);

  res.json({
    message: 'User registered successfully',
    user: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }
  });
});

// Database-connected routes for Applications using JS array
const applicationRoutes = express.Router();

applicationRoutes.get('/', (req, res) => {
  // Sort descending by date
  const sortedApps = [...applications].sort((a, b) => b.submittedDate - a.submittedDate);
  res.json(sortedApps);
});

applicationRoutes.post('/', (req, res) => {
  const totalScore = (req.body.academicMarks * 0.6) + (req.body.examScore * 0.4);
  const newApp = {
    _id: Date.now().toString(),
    applicationId: `#ENG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    studentName: req.body.studentName,
    email: req.body.email,
    program: req.body.program || 'B.Tech Computer Science',
    department: req.body.department || 'Engineering',
    coursePreferences: req.body.coursePreferences || [],
    academicMarks: req.body.academicMarks,
    examScore: req.body.examScore,
    totalScore: totalScore,
    applicationFee: 500,
    paymentStatus: 'pending',
    status: 'Processing',
    submittedDate: new Date()
  };
  applications.push(newApp);
  res.json(newApp);
});

applicationRoutes.delete('/:id', (req, res) => {
  applications = applications.filter(app => app._id !== req.params.id);
  res.json({ message: 'Application deleted successfully' });
});

// Import application from JEE/COMEDK
applicationRoutes.post('/import', (req, res) => {
  const { type, applicationId, email, password } = req.body;
  
  // Simulate API call to external portal
  // In real implementation, this would securely connect to JEE/COMEDK APIs
  setTimeout(() => {
    // Mock successful import - in reality, this would validate credentials and fetch real data
    const mockImportedData = {
      studentName: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email: email,
      program: type === 'jee' ? 'B.Tech Computer Science' : 'B.Tech Information Technology',
      department: 'Engineering',
      academicMarks: Math.floor(70 + Math.random() * 25), // Random marks between 70-95
      examScore: Math.floor(75 + Math.random() * 20), // Random score between 75-95
      status: 'Imported from ' + (type === 'jee' ? 'JEE Main' : 'COMEDK'),
      paymentStatus: Math.random() > 0.5 ? 'paid' : 'pending',
      applicationFee: 500,
      importedFrom: type.toUpperCase(),
      importDate: new Date()
    };
    
    const totalScore = (mockImportedData.academicMarks * 0.6) + (mockImportedData.examScore * 0.4);
    const newApp = {
      _id: Date.now().toString(),
      applicationId: applicationId.startsWith('#') ? applicationId : `#${type.toUpperCase()}-${applicationId}`,
      ...mockImportedData,
      totalScore: totalScore,
      submittedDate: new Date()
    };
    
    applications.push(newApp);
    res.json({ 
      message: 'Application imported successfully', 
      application: newApp 
    });
  }, 2000); // Simulate network delay
});

// New routes for smart admission features

// Auto merit list
applicationRoutes.get('/merit-list', (req, res) => {
  const meritList = [...applications]
    .filter(app => app.status !== 'Rejected')
    .sort((a, b) => b.totalScore - a.totalScore)
    .map((app, index) => ({
      ...app,
      rank: index + 1
    }));
  res.json(meritList);
});

// Cut-off prediction
applicationRoutes.get('/cutoff-prediction/:program', (req, res) => {
  const program = req.params.program;
  const programApps = applications.filter(app => 
    app.program === program && app.status === 'Admitted'
  );
  
  if (programApps.length === 0) {
    return res.json({ predictedCutoff: 70, confidence: 'Low' });
  }
  
  const scores = programApps.map(app => app.totalScore).sort((a, b) => b - a);
  const cutoffIndex = Math.min(Math.floor(scores.length * 0.1), scores.length - 1);
  const predictedCutoff = scores[cutoffIndex];
  
  res.json({ 
    predictedCutoff: Math.round(predictedCutoff * 100) / 100,
    confidence: programApps.length > 10 ? 'High' : 'Medium'
  });
});

// Seat allocation system
const seatRoutes = express.Router();

seatRoutes.get('/', (req, res) => {
  res.json(seatAllocations);
});

seatRoutes.post('/allocate-seats', (req, res) => {
  // Auto allocate seats based on merit list and preferences
  const meritList = [...applications]
    .filter(app => app.status === 'Processing')
    .sort((a, b) => b.totalScore - a.totalScore);

  let allocations = [];
  let updatedSeats = [...seatAllocations];

  for (const applicant of meritList) {
    let allocated = false;
    
    // Try to allocate based on preferences
    for (const preference of applicant.coursePreferences.sort((a, b) => a.priority - b.priority)) {
      const seatIndex = updatedSeats.findIndex(seat => 
        seat.program === preference.program && 
        seat.availableSeats > 0 &&
        applicant.totalScore >= seat.cutoffScore
      );
      
      if (seatIndex !== -1) {
        // Allocate seat
        updatedSeats[seatIndex].availableSeats -= 1;
        applicant.status = 'Admitted';
        applicant.admittedProgram = preference.program;
        allocations.push({
          applicationId: applicant.applicationId,
          studentName: applicant.studentName,
          allocatedProgram: preference.program,
          score: applicant.totalScore
        });
        allocated = true;
        break;
      }
    }
    
    if (!allocated) {
      applicant.status = 'Waitlisted';
    }
  }

  seatAllocations = updatedSeats;
  res.json({ 
    message: 'Seat allocation completed',
    allocations: allocations,
    remainingSeats: seatAllocations
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/seats', seatRoutes);

// Payment routes
const paymentRoutes = express.Router();

// Create Razorpay order
paymentRoutes.post('/create-order', async (req, res) => {
  try {
    const { applicationId, amount } = req.body;
    
    // For demo purposes, create a mock order since we don't have real Razorpay keys
    const mockOrderId = `order_demo_${Date.now()}`;
    
    // Store order in payments array
    const paymentRecord = {
      _id: Date.now().toString(),
      applicationId,
      studentId: applicationId, // Using applicationId as studentId for demo
      studentName: req.body.studentName || 'Student',
      email: req.body.email || 'student@example.com',
      amount,
      currency: 'INR',
      razorpayOrderId: mockOrderId,
      status: 'created',
      description: 'College Application Fee',
      createdAt: new Date()
    };
    
    payments.push(paymentRecord);
    
    res.json({
      orderId: mockOrderId,
      amount: amount * 100, // Amount in paisa
      currency: 'INR',
      key: 'rzp_test_demo_key' // Demo key for testing
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

// Verify payment
paymentRoutes.post('/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    // Find the payment record
    const payment = payments.find(p => p.razorpayOrderId === razorpay_order_id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment record not found' });
    }
    
    // For demo purposes, accept any payment as successful
    payment.razorpayPaymentId = razorpay_payment_id || `pay_demo_${Date.now()}`;
    payment.status = 'paid';
    payment.paidAt = new Date();
    payment.paymentMethod = 'demo_payment';
    
    // Update application payment status
    const application = applications.find(app => app.applicationId === payment.applicationId);
    if (application) {
      application.paymentStatus = 'paid';
      application.paymentId = payment.razorpayPaymentId;
    }
    
    res.json({ 
      success: true, 
      message: 'Payment verified successfully',
      paymentId: payment.razorpayPaymentId 
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

// Get payment history
paymentRoutes.get('/history/:studentId', (req, res) => {
  const studentId = req.params.studentId;
  const studentPayments = payments.filter(p => p.studentId === studentId);
  res.json(studentPayments);
});

// Get all payments (admin)
paymentRoutes.get('/all', (req, res) => {
  res.json(payments);
});

app.use('/api/payments', paymentRoutes);

const path = require('path');

// Serve frontend in production or if build folder exists
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));