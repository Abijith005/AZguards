# Todo List Management System

This project is a Todo List Management System built using Node.js and Express.js. It allows users to perform CRUD operations on todo items, upload todo items from a CSV file, download the todo list in CSV format, and set a status flag for each todo item.

## Project Setup

1. **Basic folder structure:**
 
 ├── src
│ ├── controllers
│ │ ├── authController.ts
│ │ └── taskController.ts
│ ├── dtos
│ │ └── credentialDto.ts
│ ├── helpers
│ │ ├── inputValidation.ts
│ │ ├── jwtDecode.ts
│ │ ├── jwtSign.ts
│ │ ├── jwtVerify.ts
│ │ └── uploadCsv.ts
│ ├── middleware
│ │ └── authMiddleware.ts
│ ├── models
│ │ ├── todoModel.ts
│ │ └── userModel.ts
│ ├── routes
│ │ ├── authRouter.ts
│ │ └── todosRouter.ts
│ └── config
│ └── dbConfig.ts
├── .gitignore
├── README.md
└── package.json

## Database Setup

- **MongoDB:**
- Ensure MongoDB is installed and running locally or on a remote server.
- Create a database named `AZguards`.
- Created two models user Model for registring users and todo model to store todo items.

## CRUD API Endpoints

- **POST /api/v1/auth/userRegister** To register user.

Body:
{
"name":"abc"
"email":"a@gmail.com"
"password":"123"
}

- **POST /api/v1/auth/userLogin** To login user.

Body:
{
"email":"a@gmail.com"
"password":"123"
}

- **GET /api/v1/tasks/todos** Fetch all todo items.

Headers:
Authorization: user JWT Token (Will get on response of login api)

- **GET /api/v1/tasks/todos/:id** Fetch a single todo item by ID (id is object_id of todo document).

Headers:
Authorization: user JWT Token (Will get on response of login api)

- **POST /api/v1/tasks/todos** Add a new todo item.

Headers:
Authorization: user JWT Token (Will get on response of login api)

Body:
{
"description": "Task desc to do",
"status": "pending",(status can be "pending","in-progress","completed")

}

- **PUT /api/v1/tasks/todos/:id** Update an existing todo item (id is object_id of todo document).

Headers:
Authorization: user JWT Token (Will get on response of login api)

Body:
{
"description": "change task",
"status": "compeleted",(status can be changed to anyone of "pending","in-progress","completed")

}

- **DELETE /api/v1/tasks/todos/:id** Delete a todo item (id is object_id of todo document).

Headers:
Authorization: user JWT Token (Will get on response of login api)

- **POST /api/v1/tasks/uploadTodos** Upload todo items from a CSV file.

Headers:
Authorization: user JWT Token (Will get on response of login api)

Body: form-data

    "csvFile":upload csv file

    (example -
     "description","status"
     "todo1","pending"
     "todo2","completed"
     "todo3","in-progress"
     "todo4","pending"
    )

- **GET /api/v1/tasks/downloadTodos** Download the todo list in CSV format.

Headers:
Authorization: user JWT Token (Will get on response of login api)

- **GET /api/v1/tasks/filter?status=pending** Filter todo list items based on status.

Headers:
Authorization: user JWT Token (Will get on response of login api)

## Additional Features

- **Filtering Options:** Implement filtering options in the API to fetch todo list items based on their status (e.g., completed, pending).
- **Validation:** Implement input validation to ensure that only valid data is accepted by the API.
- **Authentication & Authorization:** Implement authentication and authorization mechanisms if required.
- **Error Handling:** Implement proper error handling to provide meaningful error messages to the clients.

## Usage


1. Clone the repository:
   git clone <repository_url>

Copy code

2. Install dependencies:
   npm install

3. Create .env file  and insert below given environments in that file

PORT=5000
MONGODB_URI=mongodb://localhost:27017
DB_NAME=AZguards
JWT_SIGNATURE=9Bz$46rV2j*dT!mPf5nZ@7^Jb@=Q


3. Start the server:
   npm start
