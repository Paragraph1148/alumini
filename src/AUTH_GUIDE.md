// src/AUTH_GUIDE.md

# Alumni Portal - Authentication & Permissions Guide

## Overview

The Alumni Portal now includes a complete authentication and role-based permission system with three user roles:

- **Admin**: Full access to manage all content and users
- **Moderator**: Can manage events, jobs, news articles
- **User**: Can manage their own profile and account details

## Demo Accounts

### Admin Account
- Email: `admin@alumni.edu`
- Password: `admin123`
- Can access Admin Dashboard to manage all content

### Regular User Account
- Email: `user@alumni.edu`
- Password: `user123`
- Can manage personal profile only

## Features

### For All Users
1. **Login/Signup**: Click the "Login" button in the header
2. **Profile Management**: After logging in, click your avatar → "My Profile"
   - Update personal information
   - Add work details (company, position)
   - Add education details (class year, major)
   - Update location

### For Admins/Moderators
1. **Admin Dashboard**: Click your avatar → "Admin Dashboard"
2. **Manage Content**:
   - View overview statistics
   - Manage events (create, edit, delete)
   - Manage job postings
   - Manage news articles
   - View and manage users

## Technical Implementation

### Frontend
- **AuthContext**: Manages authentication state and user sessions
- **LoginDialog**: Handles login and signup flows
- **UserProfile**: Profile management for all users
- **AdminDashboard**: Content management for admins/moderators

### Backend
- **Authentication Routes**:
  - POST `/auth/login` - User login
  - POST `/auth/signup` - User registration
  - GET `/auth/verify` - Verify session
  - PUT `/auth/profile` - Update user profile

- **Admin Routes** (requires moderator/admin role):
  - GET `/admin/data` - Get all content
  - DELETE `/admin/:type/:id` - Delete content

### Security
- Role-based access control (RBAC)
- Session tokens stored in localStorage
- Backend middleware validates permissions
- Separate routes for admin operations

## User Roles

### Admin
- Full system access
- Can manage all content
- Can view all users
- Badge shown in profile and certain sections

### Moderator
- Can manage events, jobs, and news
- Cannot manage other users
- Badge shown in profile

### User (Default)
- Can view public content
- Can manage own profile
- Can register for events
- Can apply to jobs

## Next Steps

To extend the system:
1. Add password reset functionality
2. Implement email verification
3. Add more granular permissions
4. Add audit logging for admin actions
5. Implement content approval workflows
