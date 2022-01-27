# Task-Manager API
This is a simple REST API for task manager app and includes endpoints for CRUD operations.  
## Installation
To run locally, run
```
npm install
```
and then, run
```
npm start
```
The API endpoints should be up and available at the default port 3000, unless provided otherwise.

### Some of the features include  
- Password Hashing. 
- JWT based authentication.
- File upload support.

## Endpoints

|Endpoints | Method | Description|
|----------|--------|-------------|
||         User Endpoints        ||
|"/users"  | POST   | New User Signup|
|"/users/login"| POST| User Login|
|"/users/logout"| POST | Logs out the user from the current session|
