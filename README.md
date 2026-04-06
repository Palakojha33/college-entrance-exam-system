click here to view the deployed app: https://college-entrance-exam-system.onrender.com

# 🎓 Smart College Admission System

A comprehensive MERN stack application for college admissions with intelligent features including auto merit lists, cut-off predictions, seat allocation, and integrated payment processing.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![React](https://img.shields.io/badge/React-18.0.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green)
![Razorpay](https://img.shields.io/badge/Razorpay-Integrated-blue)

## ✨ Features

### 🤖 Smart Admission Features
- **Auto Merit List**: Automatic ranking based on academic marks (60%) + exam score (40%)
- **Cut-off Prediction System**: AI-powered prediction of admission cut-offs based on historical data
- **Multiple Course Preferences**: Students can select multiple program preferences with priority ranking
- **Seat Allocation System**: Automated seat allocation based on merit and preferences

### 💰 Payment Integration
- **Application Fee Payment**: Secure ₹500 application fee collection
- **Razorpay Integration**: Complete payment gateway integration with demo mode
- **Payment History**: Comprehensive transaction tracking and history
- **Real-time Status Updates**: Automatic payment status synchronization

### 📋 Application Management
- **Application Creation**: Multi-step application form with validation
- **Document Upload**: Secure document verification system
- **Application Tracking**: Real-time status updates and notifications
- **Admin Dashboard**: Complete administrative control panel

### 🎯 Additional Features
- **Entrance Exam Management**: Register and track entrance examinations
- **Mock Test Platform**: Practice tests for exam preparation
- **User Authentication**: Secure login and session management
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons
- **CSS3** - Custom styling with CSS variables

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database (in-memory implementation for demo)
- **Razorpay** - Payment gateway integration
- **CORS** - Cross-origin resource sharing

### Development Tools
- **npm** - Package management
- **Babel** - JavaScript transpilation
- **ESLint** - Code linting
- **Git** - Version control

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/your-username/college-admission-system.git
cd college-admission-system/backend

# Install dependencies
npm install

# Start the server
npm start
```

### Frontend Setup
```bash
# Open new terminal and navigate to frontend
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm start
```

## 📖 Usage

### For Students
1. **Register/Login**: Create account or login to existing account
2. **Create Application**: Fill detailed application form with academic details
3. **Make Payment**: Pay ₹500 application fee via integrated Razorpay
4. **Track Status**: Monitor application status and merit list ranking
5. **View Results**: Check admission decisions and seat allocation

### For Administrators
1. **Dashboard Overview**: View all applications and statistics
2. **Merit List Management**: Generate and publish merit lists
3. **Seat Allocation**: Run automated seat allocation algorithms
4. **Payment Monitoring**: Track all payment transactions
5. **Cut-off Management**: Set and adjust admission cut-offs

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Applications
- `GET /api/applications` - Get all applications
- `POST /api/applications` - Create new application
- `DELETE /api/applications/:id` - Delete application
- `GET /api/applications/merit-list` - Get merit list
- `GET /api/applications/cutoff-prediction/:program` - Predict cut-offs

### Payments
- `POST /api/payments/create-order` - Create payment order
- `POST /api/payments/verify-payment` - Verify payment
- `GET /api/payments/history/:studentId` - Get payment history
- `GET /api/payments/all` - Get all payments (admin)

### Seat Allocation
- `GET /api/seats` - Get seat information
- `POST /api/seats/allocate-seats` - Run seat allocation

## 📱 Screenshots

### Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

### Application Form
![Application Form](https://via.placeholder.com/800x400?text=Application+Form)

### Merit List
![Merit List](https://via.placeholder.com/800x400?text=Merit+List)

### Payment Integration
![Payment](https://via.placeholder.com/800x400?text=Payment+Integration)

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the backend directory:

```env
PORT=5001
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NODE_ENV=development
```

### Razorpay Setup
1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Get your API keys from the dashboard
3. Replace the demo keys in the code with your actual keys

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Test all features before submitting PR
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [Razorpay](https://razorpay.com/) - Payment gateway
- [MongoDB](https://www.mongodb.com/) - Database
- [Lucide](https://lucide.dev/) - Icon library

## 📞 Support

For support, email support@collegeadmissionsystem.com or create an issue in this repository.

## 🔄 Future Enhancements

- [ ] Email notifications for application updates
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Integration with external exam platforms
- [ ] Multi-language support
- [ ] Advanced reporting features

---

**Made with ❤️ for educational institutions worldwide**</content>
<parameter name="filePath">/Users/air/Desktop/mern_separate_project/README.md
