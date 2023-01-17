# This is a benchtime demo project of a secure API Gateway using Express Nodejs

## This containes all key areas of an API Gateway as below:

1. Session management
2. Request rate limiting
3. Response time tracking for endpoints
4. Logging

## Tools and libraries used

1. express-session (for session management)
2. http-proxy-middleware (for proxying)
2. winston (for logging)
3. dotenv (for env variable management)
4. helmet (helps you secure the apps by setting various HTTP headers)


## How to up and run

1. Create .env file and add the following values
    
    `SESSION_SECRET={your secret value}`


2. Go to `src/config.ts` and configure the proxies

3. Now all setup, run the below command to run the app
    
    `npm run start:dev`


## Authors
 - [Husny Ahamed M.G](https://github.com/husni1992)