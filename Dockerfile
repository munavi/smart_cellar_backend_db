# Using the official Node.js image as the base
FROM node:18.17.1

# Installing Docker dependencies for working with PostgreSQL
RUN apt-get update && apt-get install -y postgresql

# Setting the working directory inside the container
WORKDIR /backend

# Cloning the project from GitLab
RUN git clone https://gitlab.elektrotechnik.hs-augsburg.de/namu1848/smart_cellar_backend_db.git .

# Setting environment variables for PostgreSQL
ENV POSTGRES_DB smart_cellar
ENV POSTGRES_USER root
ENV POSTGRES_PASSWORD 12345

# Setting environment variables for the .env file
RUN echo "SERVER=http://localhost:4000" > .env
RUN echo "PORT=4000" >> .env
RUN echo "SECRET_KEY=MyNewSecretKey123!@#" >> .env
RUN echo "PG_DB_URL=postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:5432/$POSTGRES_DB" >> .env

# Start PostgreSQL and creating DB Base
RUN service postgresql start && \
    su - postgres -c "psql -c 'CREATE DATABASE $POSTGRES_DB;'" && \
    su - postgres -c "psql -c 'CREATE USER $POSTGRES_USER WITH SUPERUSER PASSWORD '\''$POSTGRES_PASSWORD'\'';'" && \
    su - postgres -c "psql -c 'ALTER ROLE $POSTGRES_USER SET client_encoding TO '\''utf8'\'';'" && \
    su - postgres -c "psql -c 'ALTER ROLE $POSTGRES_USER SET default_transaction_isolation TO '\''read committed'\'';'" && \
    su - postgres -c "psql -c 'ALTER ROLE $POSTGRES_USER SET timezone TO '\''UTC'\'';'" && \
    su - postgres -c "psql -c 'GRANT USAGE ON SCHEMA public TO $POSTGRES_USER;'" && \
    su - postgres -c "psql -c 'GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;'" && \
    service postgresql stop


# Installing project dependencies
RUN npm install

# Starting the application in development mode
CMD ["sh", "-c", "service postgresql start && npm run dev"]

