# Military Health Management System

## Overview

This is a comprehensive military health management system designed to track soldier medical records, SHAPE assessments (Strength, Hearing, Appendages, Psychological, Eyesight), and health status. The application provides admin authentication, soldier management, medical record tracking, and notification systems for health management workflows.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom military-themed color scheme
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with dedicated routes for authentication, soldiers, medical records, and notifications
- **Session Management**: Simple session-based authentication stored in memory
- **Validation**: Zod schemas for request/response validation shared between client and server

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless connection pooling
- **Schema Management**: Drizzle Kit for migrations and schema updates
- **Connection**: Uses connection pooling via @neondatabase/serverless

### Data Models
- **Admins**: Authentication and authorization management
- **Soldiers**: Core personnel data with SHAPE scores, ranks, companies, and medical status
- **Medical Records**: Detailed medical examinations (AME, PME, SHAPE assessments, injuries)
- **Notifications**: System alerts and health management notifications

### Authentication & Authorization
- **Admin Authentication**: Simple credential-based login system
- **Session Management**: Server-side session storage
- **Route Protection**: Middleware-based authentication checks for protected endpoints
- **Password Security**: Bcrypt for password hashing

### Key Features
- **SHAPE Assessment System**: Military-specific health scoring (1-4 scale for each category)
- **Medical Record Management**: Comprehensive tracking of various examination types
- **Health Status Monitoring**: Automated tracking of medical checkup schedules
- **Notification System**: Alerts for due medical examinations and health status changes
- **Filtering & Search**: Advanced filtering by rank, company, medical status, and name search

## External Dependencies

### Database & ORM
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database operations and migrations
- **Connection Pooling**: @neondatabase/serverless for efficient database connections

### UI & Components
- **Radix UI**: Headless component primitives for accessibility
- **Shadcn/ui**: Pre-built component library with consistent styling
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Icon library for UI elements

### Development & Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety across the entire stack
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment integration with error overlays

### Email Services
- **Nodemailer**: Email sending capability for notifications and alerts
- **SMTP Configuration**: Configurable email service integration

### Validation & Forms
- **Zod**: Schema validation shared between client and server
- **React Hook Form**: Form state management and validation
- **@hookform/resolvers**: Zod integration for form validation

### Development Dependencies
- **PostCSS & Autoprefixer**: CSS processing and vendor prefixing
- **Class Variance Authority**: Type-safe CSS class generation
- **CLSX & Tailwind Merge**: Conditional CSS class management