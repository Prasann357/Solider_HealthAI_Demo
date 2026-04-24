# Soldier Health Management System

A comprehensive military health management system designed to track soldier medical records, SHAPE assessments, and health status with AI capabilities.

## Features

- **SHAPE Assessment System**: Military-specific health scoring (Strength, Hearing, Appendages, Psychological, Eyesight)
- **Medical Record Management**: Comprehensive tracking of AME, PME, and other medical examinations
- **Health Status Monitoring**: Automated tracking of medical checkup schedules
- **Admin Authentication**: Secure login system for administrators
- **Notification System**: Alerts for due medical examinations and health status changes
- **Advanced Filtering**: Filter by rank, company, medical status, and name search

## Prerequisites

- Node.js 20.x or higher
- PostgreSQL database
- npm or yarn package manager

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repository-url>
cd soldier-health-management
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/health_data
PGUSER=your_db_user
PGPASSWORD=your_db_password
PGHOST=localhost
PGPORT=5432
PGDATABASE=health_data

# Session Secret
SESSION_SECRET=your-secure-session-secret-key

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-email-password

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 3. Database Setup

1. Create a PostgreSQL database named `health_data`
2. Run database migrations:

```bash
npm run db:push
```

### 4. Create Default Admin Account

Run the admin setup script:

```bash
node setup-admin.js
```

This creates a default admin with:
- **Username**: admin
- **Password**: admin123
- **Email**: admin@military.health

### 5. Start the Application

For development:
```bash
npm run dev
```

For production:
```bash
npm run build
npm start
```

The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility libraries
├── server/                # Express backend
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   ├── db.ts              # Database connection
│   └── types/             # TypeScript type definitions
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema and Zod validation
└── package.json
```

## Usage

### Admin Login
1. Visit the application at `http://localhost:5000`
2. Click "Admin Login" in the top right corner
3. Use the default credentials (admin/admin123) or your custom admin account

### Adding Soldiers
1. Login as admin
2. Click "Add New Soldier" button
3. Fill in personal information and SHAPE assessment scores
4. Save the soldier record

### Managing Medical Records
1. Click on any soldier's "Actions" dropdown
2. Select "View History" to see medical records
3. Add new medical records as needed

### Filtering and Search
- Use the filter section to narrow down soldier lists
- Search by name, filter by rank, company, or medical status
- Apply filters to find specific soldiers quickly

## SHAPE Assessment System

The SHAPE system evaluates soldiers across five categories:

- **S**trength: Physical fitness and strength assessment
- **H**earing: Auditory health evaluation
- **A**ppendages: Limb and extremity function
- **P**sychological: Mental health and psychological fitness
- **E**yesight: Visual acuity and eye health

Each category is scored from 1-4:
- **1**: Excellent condition
- **2**: Good condition
- **3**: Fair condition (may need monitoring)
- **4**: Unfit for service

## Medical Checkup Requirements

- **AME (Annual Medical Examination)**: Required for all soldiers annually
- **PME (Periodic Medical Examination)**: Required for:
  - All soldiers over 35 years old (every 6 months)
  - Junior Commissioners under 35 years old (every 6 months)

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout

### Soldiers
- `GET /api/soldiers` - Get all soldiers (with filters)
- `GET /api/soldiers/:id` - Get specific soldier
- `POST /api/soldiers` - Create new soldier (admin only)
- `PUT /api/soldiers/:id` - Update soldier (admin only)
- `DELETE /api/soldiers/:id` - Delete soldier (admin only)

### Medical Records
- `GET /api/soldiers/:id/medical-records` - Get soldier's medical history
- `POST /api/soldiers/:id/medical-records` - Add medical record (admin only)

### Notifications
- `GET /api/notifications` - Get admin notifications
- `POST /api/notifications` - Create notification (admin only)
- `POST /api/soldiers/:id/send-alert` - Send alert to soldier (admin only)

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check DATABASE_URL in environment variables
   - Ensure database exists and is accessible

2. **Admin Login Not Working**
   - Run the admin setup script: `node setup-admin.js`
   - Check if admin account exists in database
   - Verify password is correct

3. **Port Already in Use**
   - Change PORT in environment variables
   - Kill existing processes: `pkill -f "node.*5000"`

4. **Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Clear build cache: `npm run clean` (if available)

### Development Mode Issues

- Hot reload not working: Restart the dev server
- TypeScript errors: Run `npm run type-check`
- Database schema changes: Run `npm run db:push`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test` (if available)
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the troubleshooting section above
- Review the API documentation
- Contact the development team

---

**Security Note**: Change the default admin credentials and session secret in production environments.