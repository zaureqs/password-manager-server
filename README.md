# Password Manager

A brief description of your Node.js application.

### Requirements

- Node.js
- mongodb

## Installation

1. Clone the repository:
    ```base
        git clone https://github.com/zaureqs/password-manager-server
    ```

2. Change directory to the project root:
    ```
        cd password-manager-server
    ```
3. Install the dependencies:
    ```base
        npm install
    ```
4. Create a .env file (if you don't already have one) and add your environment variables to it.
    ```base
    DATABASE_URL = your mongodb url
    JWT_SECRET= a randomly generated string 
    PORT=5000
    JWT_EXPIRES_IN=1h
    vault_secret= a randomly generated string
    Salt_rounds = no of rounds required for salting
    FRONTEND_URL = http://localhost:3000
    ```
5. Initialize Prisma:
    ```base
    npx prisma init
    ```
6. Config and generate your Prisma schema:
    ```base 
    npx prisma generate
    ```

## Usage

To run the application, run the following command:

```base
npm run dev
```

This will start the application on port 5000 by default. You can visit the application in your web browser at `https://localhost/5000`.


## For client side see [Password Manager Client](https://github.com/zaureqs/password-manager-client)

## Deployment

To deploy the application to production, you can use a variety of different tools and services. Some popular options include:

1. Heroku
2. AWS Elastic Beanstalk
3. Azure App Service
4. digitalocean

Please consult the documentation for your chosen deployment platform for instructions on how to deploy your application.

## Contributing

If you would like to contribute to this project, please feel free to fork the repository and submit a pull request. All contributions are welcome!


Contact

If you have any questions or feedback, please feel free to contact me at [Linkedin](https://www.linkedin.com/in/manish-fenin/).

