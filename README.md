# EECS 563 Project Documentation: Instant Messaging Platform

## Project Overview

### Objective

Develop an Instant Messaging (IM) Platform showcasing networking concepts and real-time communication technologies.

### Team Members

-   Member 1: Wyatt
-   Member 2: Thomas

## Implementation Details

### 1. Network Architecture

-   **Client-Server Model**: Implemented using React (frontend) and Flask (backend).
-   **Database**: Utilized Supabase for user data and message storage.
-   **Communication Protocol**: WebSockets for real-time updates (Supabase Realtime).

### 2. User Authentication

-   **Registration & Login**: Users can register and log in using a username and password.
-   **Password Encryption**: Implemented using Flask-Bcrypt.
-   **JWT Tokens**: Used for secure session management.

### 3. Real-Time Messaging

-   **Sending/Receiving Messages**: Users can send messages to others, which update in real-time.
-   **Message Storage**: Messages stored in Supabase and fetched via Flask API.
-   **Real-Time Updates**: Implemented using WebSockets with Supabase for live message updates.

![GitHub Image](/images/Conversation.png)

### 4. Online User Status

-   **Online Presence**: Show online/offline status of users.
-   **Database Tracking**: Online status tracked and updated in the Supabase database.

## Challenges & Solutions

-   **Real-Time Communication**: Overcame challenges in real-time data synchronization using Supabase's Realtime capabilities.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the frontend directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://im-backend-6uzp.onrender.com](http://im-backend-6uzp.onrender.com) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Conclusion

This project successfully demonstrates the application of networking concepts in a practical, real-world scenario. The implementation of a client-server architecture, secure user authentication, and real-time messaging offers valuable insights into network-based application development.
