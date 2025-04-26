# Social Feed Sample App

A React Native social media feed application built with Expo, showcasing features for posting, viewing, and interacting with social media content.

## Features

- User authentication
- Social media feed with infinite scrolling
- Create new posts with images and captions
- Profile viewing

## Tech Stack

- React Native: For andorid/ios/web app
- Expo: Development platform for easy building and deployment
- Redux: State management for the application
- React Navigation: Navigation management between screens
- React Native Paper: Material Design component library
- TypeScript: Type-safe development

## Project Structure

-assets #static assets
-src
   -components #resusable UI components
   -navigation #Navigation config
   -screens #main screens
   -store #redux store and slices
   -theme #theme condig
   -types #typescript types
-App.tsx #App entry point


## Setup Instructions

- npm install (Install Dependencies)
- npm run web (To test in web, you can use expo to check in android/ios)

## Architecture & Decisions

1. State Management
   - Redux for global state management
   - Separate slices for posts and authentication
   - Async actions for data fetching

2. Navigation
   - Stack-based navigation for main flow
   - Protected routes based on authentication state

3. UI/UX
   - Material Design components for consistent look
   - FAB for quick post creation
   - Infinite scrolling for better performance using FlatList

4. Data Management
   - Dummy data generation for development
   - Structured post types with TypeScript

## Development Practices

- TypeScript for type safety
- Component-based architecture
- Separation of concerns
- Responsive design principles
- Clean and maintainable code structure