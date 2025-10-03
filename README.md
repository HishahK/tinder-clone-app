# Tinder Clone Backend (Laravel) & Mobile (React Native)

This repository contains a Tinder-like clone application. It is divided into two main parts:

-   **Mobile App**: Built with React Native (using recommended stacks: Atomic Design, React Query, and Recoil).
-   **Backend**: Built with Laravel (PHP) for API services.

## Features

### Mobile (React Native)

1.  Splash screen
2.  Show opponent card (similar to Tinder main screen)
    -   Swipe right to like
    -   Swipe left to dislike
3.  Liked opponent list (similar card UI but without swipe actions)

### Backend (Laravel)

-   People data includes: name, age, pictures, location
-   API features:
    -   List of recommended people (with pagination)
    -   Like person
    -   Dislike person
    -   Liked people list (API only)
-   Cronjob: If a person is liked more than 50 times, an email is sent to the admin.

## Requirements

### Backend

-   PHP 8.1+
-   Composer
-   Laravel 10+
-   Database (MySQL, Postgres, or SQLite)

### Mobile

-   Node.js 18+
-   React Native CLI
-   Android Studio / Xcode for emulators

## Installation

### Backend

1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    composer install
    ```
3.  Copy `.env.example` to `.env` and configure database settings.
    ```bash
    cp .env.example .env
    ```
4.  Generate application key:
    ```bash
    php artisan key:generate
    ```
5.  Run migrations:
    ```bash
    php artisan migrate
    ```
6.  Start local development server:
    ```bash
    php artisan serve
    ```

### Mobile

1.  Navigate to the mobile folder:
    ```bash
    cd mobile
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the app on Android:
    ```bash
    npx react-native run-android
    ```
4.  Or on iOS:
    ```bash
    npx react-native run-ios
    ```

## Swagger Documentation

The project includes Swagger API documentation generated for the backend.

**Local testing:**

Start the Laravel backend (`php artisan serve`) and then visit:
`http://127.0.0.1:8000/api/documentation`

You will see the Swagger UI with all available endpoints.

***Deployment Note:***

*Swagger is implemented but not auto-deployed online in this setup.*

To test, run the backend locally and access the above URL.

If deployment is required, you can use services like Heroku, Render, or Replit to host the backend and expose Swagger.

## Cronjob

A Laravel scheduler is implemented. To test locally, add the following to your system crontab:

```bash
* * * * * php /path-to-your-project/artisan schedule:run >> /dev/null 2>&1
