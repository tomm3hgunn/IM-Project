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

### 4. Online User Status

-   **Online Presence**: Show online/offline status of users.
-   **Database Tracking**: Online status tracked and updated in the Supabase database.

## Challenges & Solutions

-   **Real-Time Communication**: Overcame challenges in real-time data synchronization using Supabase's Realtime capabilities.

## Conclusion

This project successfully demonstrates the application of networking concepts in a practical, real-world scenario. The implementation of a client-server architecture, secure user authentication, and real-time messaging offers valuable insights into network-based application development.
