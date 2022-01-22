# social-network-api
A social network API using a noSQL MongoDB, Mongoose ODM, and Express. js for routing

## Table of Contents
* [Description](#description)
* [Database Schema](#database-schema)
* [List of API Routes](#list-of-api-routes)
* [Screenshots](#screenshot)
* [Installation](#installation)
* [Usage](#usage)
* [Link](#link)
* [Code](#code)
* [Contact](#contact)
* [Technologies](#technologies)
* [Project Status](#project-status)


## Description 
A social network API using a noSQL MongoDB, Mongoose ODM, and Express. js for routing


## Screenshots
![Screenshot of app inital screen](./assets/readme-screenshot.png)


## Database Model

	• User
	    ◦ username
	    ◦ email
		◦ thoughts
	    ◦ friends
	    ◦ friendCount (virtual)

	• Thought
	    ◦ thoughtText
	    ◦ CreatedAt
	    ◦ username
	    ◦ reactions - array of reaction documents
		◦ reactionCount (virtual)

	• Reaction (SCHEMA ONLY - subdocument for reaction field in Thought model)
	    ◦ reactionId
	    ◦ reactionBody
	    ◦ username
	    ◦ createdAt

## List of API Routes
	• /api/users
	    ◦ GET all users
	    ◦ GET a single user by _id
	    ◦ POST a new user (provide "username" and "email")
	    ◦ PUT to update a user by _id
	    ◦ DELETE a user by _id
	• /api/users/:userId/friends/:friendId
	    ◦ POST to add a new friend to user's friend list
	    ◦ DELETE a friend from a user's friend list
	• /api/thoughts
	    ◦ GET all thoughts
	    ◦ GET a single thought by _id
	    ◦ POST a new thought and push the new thought's _id to the associated user's [thoughts] (provide "thoughtText", "username" and "userId")
	    ◦ PUT to update a thought by _id
	    ◦ DELETE a thought by _id
	• /api/thoughts/:thoughtId/reactions
	    ◦ POST a new reaction that is stored in a thought's [reactions]
	    ◦ DELETE a reaction by reactionId


## Installation
Install npm dependencies:
```bash
npm install
```


## Usage
The application can be invoked with the following command:
```bash
nodemon
```
Calls to the api can be made using Postman or Insomnia.


## Link
[Video Walkthrough](#TODO - add this)


## Code
[GitHub Code Repository](https://github.com/Johny49/social-network-api)


## Contact 
Created by [@johny49](https://github.com/Johny49/) - feel free to contact me!


## Technologies
- JavaScript
- Node.js
- Express
- MongoDB
- Mongoose


## Project Status
Project is: in development 
Potential future improvements include:
* 
