# Node.js Clean Architecture with TypeScript

This project is a REST API built with Node.js, Express, and TypeScript, following the principles of Clean Architecture. It uses Prisma as the ORM, Inversify for dependency injection, and Zod for validation.

## ✨ Features

-   **Clean Architecture:** Separates concerns into distinct layers (Entities, Use Cases, Controllers, Repositories) for better maintainability and testability.
-   **TypeScript:** Strong typing for robust and scalable code.
-   **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
-   **Prisma:** Next-generation ORM for Node.js and TypeScript.
-   **InversifyJS:** A powerful and lightweight inversion of control container for TypeScript & JavaScript apps.
-   **Zod:** TypeScript-first schema declaration and validation library.
-   **Modular Structure:** Code is organized by features (e.g., `customer`, `category`).

## 🏛️ Project Structure

The project follows a Clean Architecture pattern, with the code organized into feature-based modules. Each module (like `category` or `customer`) contains its own layers:

```
src/
├── api/                # General API modules (e.g., auth)
├── shop/               # Domain-specific modules
│   ├── category/
│   │   ├── config/       # Inversify container setup
│   │   ├── controller/   # Express controllers
│   │   ├── entities/     # Business objects
│   │   ├── interactors/  # Use cases/Business logic
│   │   ├── interfaces/   # Abstractions for repositories/interactors
│   │   ├── repository/   # Data access logic (Prisma implementation)
│   │   └── router/       # Express routes for the feature
│   └── customer/
│       └── ...
├── libs/               # Shared libraries (e.g., prisma client)
├── router/             # Main Express router
└── index.ts            # Application entry point
```

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

-   Node.js (v18 or later)
-   npm
-   A running PostgreSQL or other Prisma-compatible database instance.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd Clean_Architecture_Node_Ts
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project. You can copy the `.env.example` if one exists, or create it from scratch. See the Environment Variables section for details.

4.  **Run database migrations:**
    This will create the database schema based on your Prisma schema file (`prisma/schema.prisma`).
    ```bash
    npx prisma migrate dev
    ```

### Running the Application

-   **Development mode (with hot-reloading):**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:3000` (or the port specified in your `.env`).

-   **Production mode:**
    ```bash
    # 1. Build the TypeScript code
    npm run build

    # 2. Start the server
    npm run start
    ```
## ⚙️ Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# The connection string for your database
# Example for PostgreSQL: DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase?schema=public"
DATABASE_URL=""

# Port for the server to run on
PORT=3000

# Secret key for JWT signing (used in auth)
JWT_SECRET="your-super-secret-key"
```

## Running Application with docker

-  **You must need to known basic docker (dockerfile, docker-compose and other docker tool, etc...)**

-  **Copy the `.env.example` file and rename it to `.env`**

-   **If you run docker for very first time use this command (ps: `-d`  detached mode (background mode))**
    ```bash
    docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build  
    ```
    The server will start on `http://localhost:6000`

-   **If you run docker for seconde time command**
    ```bash
    docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
    ```

-   **If you want to stop docker use this command**
    ```bash
    docker compose -f docker-compose.yml -f docker-compose.dev.yml down
    ```

## 📖 API Endpoints

The API is accessible under the `/api` prefix (configurable).

### Category API (`/api/category`)

-   **`GET /`**: Retrieves a list of all categories.
-   **`POST /create`**: Creates a new category.
    -   **Request Body:**
        ```json
        {
          "category_name": "Books",
          "description": "Fiction and non-fiction"
        }
        ```

### Customer API (`/api/customer`)

-   **`GET /`**: Retrieves a list of all customers.
-   **`POST /create`**: Creates a new customer.

### Authentication API (`/api/auth`)

-   Handles user authentication, registration, etc.