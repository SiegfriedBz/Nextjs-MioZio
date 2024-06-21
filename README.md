
# MioZio

This is a Next.js 14 (App Router) application for a food delivery service.  
Users can authenticate using Google or a magic link (powered by Brevo), order food, and make secure payments through Stripe.  
The app is written in TypeScript with a responsive design using Tailwind CSS.  
The backend uses Prisma as the ORM with a PostgreSQL database.

# Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Upload Images to Cloudinary](#upload-images-to-cloudinary)
- [Set up Prisma & Seed the database](#set-up-prisma--seed-the-database)
- [Running the Development Server](#running-the-development-server)
- [Building for Production](#building-for-production)
- [Running the Production Server](#running-the-production-server)
- [Technologies Used](#technologies-used)
- [Live Demo](#live-demo)

# Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js
- PostgreSQL database provider (e.g., hosted by [neon.com](https://neon.com))
- Stripe account for payment processing
- Brevo account for magic link authentication
- Cloudinary account for image hosting

# Installation

1. Clone the repository:
```bash
git clone git@github.com:SiegfriedBz/next_app__restaurant.git
cd next_app__restaurant
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a .env file in the root directory and add the following environment variables

```env
# Contact Information
PHONE_NUMBER=
MAIL_CONTACT=

# Database Configuration
# PostgreSQL database connection string
DATABASE_URL="postgresql://..."

# NextAuth Configuration
NEXT_PUBLIC_NEXTAUTH_URL=
NEXTAUTH_SECRET=

# NextAuth - Google Provider
# Google OAuth client ID and secret
GOOGLE_CLIENT_ID=
GOOGLE_SECRET_ID=

# Cloudinary Configuration
# Cloudinary cloud name
CLOUDINARY_CLOUD_NAME=
# Cloudinary application name for seeding images
CLOUDINARY_APP_NAME="MyApp"
# Cloudinary API key and secret
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Stripe Configuration
# Stripe API keys (get them from https://dashboard.stripe.com/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=

# Brevo Mail API
# API key for Brevo email service
BREVO_API_KEY=
```

# Upload Images to Cloudinary
- Ensure you have images in the `./seed/data/images` folder.
- Run the following command to upload the images:
```bash
npm run seed:cloudinary
```

# Set up Prisma & Seed the database

Initialize Prisma:
```bash
npx prisma init
```

Generate Prisma Client:
```bash
npx prisma generate
```

Seed the database:
```bash
npm run seed:db
```
       
# Running the Development Server
To start the development server, run:

```bash
npm run dev
  ```

# Building for Production
To build the project for production, run:

```bash
npm run build
```

# Running the Production Server
After building the project, you can start the production server with:

```bash
npm start
```

# Technologies Used

- **Framework**: React, Next.js 14 (App Router)
- **TypeScript**: Provides type safety and improved development experience.
- **Cloudinary**: : Image hosting service.

## Frontend:
- **react-query**: Library for managing server-state in React applications
- **Styling**: Tailwind CSS, responsive design

## Backend:
- **ORM**: Prisma
- **DB**: PostgreSQL
- **Authentication**: NextAuth.js with Google Provider and Brevo for magic link.

## Payment Processing:
- **Stripe**

## Live Demo
Visit the live demo of [MioZio](https://mio-zio.vercel.app/) deployed on Vercel
PostgreSQL DB hosted on [neon.com](https://neon.com)
