# Serverless - AWS Lambda (Node.js & Typescript) and DynamoDB

A simple vehicle API


## Prerequisites

- [`serverless-framework`](https://github.com/serverless/serverless)
- [`node.js`](https://nodejs.org)

## Usage

To run this code , you must have serverless installed globally on your machine

```
 $ npm install -g serverless
```
You must must have an AWS IAM account to configure serverless
 ```
 $ serverless --version
 $ serverless configure

```
After a successful configuration with your IAM AWS details, cd into the file folder and run the following commands to install all the packages and deploy directly on AWS
 ```
 $ npm install
 $ serverless deploy

```
The output of the deployment will show all the Lambda functions and the API endpoints

## API ENDPOINTS

The serverless API has been deployed and the following are the endpoints

- POST /vehicle - creates new vehicle (all inputs are validated)
- GET /vehicle/{id} - gets a vehicle by ID
- PUT /vehicle/{id} - updates a vehicle by ID
- DELETE /vehicle/{id} - deletes a vehicle by ID
- GET /products - gets a list of vehicles

## API DOCUMENTATION
Here is the link to the API documentation on Postman