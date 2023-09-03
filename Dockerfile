# Using the official Node.js image as the base
FROM node:latest

# Installing Docker dependencies for working with PostgreSQL
RUN apt-get update && apt-get install -y postgresql-client

# Setting the working directory inside the container
WORKDIR /backend

# Cloning the project from GitLab
RUN git clone https://gitlab.elektrotechnik.hs-augsburg.de/namu1848/smart_cellar_backend_db.git .

# Setting environment variables for PostgreSQL
ENV POSTGRES_DB mydatabase
ENV POSTGRES_USER root
ENV POSTGRES_PASSWORD 1
ENV PG_DB_URL postgres://root:1@postgres:5432/mydatabase

# Setting environment variables for the .env file
ENV SECRET_KEY MyNewSecretKey123!@#
ENV PG_DB_URL postgres://root:1@postgres:5432/mydatabase

# Installing project dependencies
RUN npm install

# Running unit tests
RUN npm run test:unit

# Starting the application in development mode
CMD ["npm", "run", "dev"]
