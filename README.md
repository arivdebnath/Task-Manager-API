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
|"/users/logoutALl"| POST | Logs out of all active sessions across all devices|
|"/users/me"| GET | Shows the profile of the current user|
|"/users/me"| PATCH| Updates the value of the provided fields for the current user|
|"/users/me"| DELETE | Deletes the account of the current user|
|"/users/me/avatars"|POST| To upload the profile picture of the user|

