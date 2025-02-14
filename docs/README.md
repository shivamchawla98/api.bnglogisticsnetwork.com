# BNG Logistics Network API Documentation

## Overview

BNG Logistics Network API is built using NestJS framework with GraphQL and PostgreSQL. The API provides endpoints for managing users, companies, authentication, and community features for a logistics network platform.

## Tech Stack

- NestJS v10
- GraphQL (Apollo Server)
- PostgreSQL
- TypeORM
- JWT Authentication
- Redis for Caching
- AWS SDK

## Quick Links
- [Getting Started](guides/getting-started.md)
- [API Reference](api/README.md)
- [Authentication](auth/README.md)
- [Entities](entities/README.md)

## Core Features

### Authentication
- Login/Logout functionality
- JWT token based authentication
- Password reset flow
- OTP generation and verification

### User Management
- User CRUD operations
- User profiles with additional info
- Team member invitations
- Job roles and permissions
- Location and timezone settings

### Company Management
- Company profiles
- Multiple locations support
- Service listings
- Certifications
- Team member management

### Community Features
- Business listings
- Community feed
- Events management
- Content sharing
- Member directory

## GraphQL Schema

### Main Types

#### User
```graphql
type User {
  id: ID!
  email: String!
  firstName: String
  lastName: String
  phone: String
  JobRole: JobProfile
  location: [location!]
  timezone: timezone
  company: CommunityCompanyProfile
  additionalInfo: UserAdditionalInfo
}

type CommunityCompanyProfile {
  id: ID!
  companyName: String
  legalName: String
  website: String
  description: String
  logo: String
  coverImage: String
  locations: [Location!]!
  services: [Service!]!
  certifications: [Certification!]!
}

PORT=3001
JWT_SECRET=your-secure-secret-key
JWT_EXPIRES_IN=1d
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=****
DB_DATABASE=db_bng
FRONTEND_URL=http://localhost:3000