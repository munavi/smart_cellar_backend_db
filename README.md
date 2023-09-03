# Smart Cellar Backend + Database

This code is an essential component of the bachelor's project on the topic "Smart Cellar: Development of a Full-Stack App for Reducing Food Waste and Promoting a Sustainable and Cost-Effective Lifestyle."


## Requirements

To ensure the proper functioning of the project, make sure the following requirements are met:

* [Node.js 18](https://nodejs.org/en/download): Ensure that you have Node.js version 18 or higher installed. This is necessary to provide the runtime environment for running the application.

* [PostgreSQL](https://www.postgresql.org/download/): You need a PostgreSQL database to store the necessary data for the application. Make sure PostgreSQL is installed and properly configured.

Make sure these requirements are met before starting the project to ensure smooth execution of the application.

## Installation
Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install the project's dependencies.

```bash
npm install
```
## Environment Variables

Before running the project, you need to set up environment variables. Create a .env file in the root directory of the project and add the following variables:
```bash
SERVER=http://localhost:4000
PORT=4000
PG_DB_URL=postgres://username:password@localhost:5432/database_name
SECRET_KEY=mysecretkey
```
Replace username, password, and database_name with your PostgreSQL credentials and database name. Also, set a value for SECRET_KEY which will be used for encryption and security purposes.

Make sure to keep your .env file secure and do not share sensitive information.

## Usage
To run the project, please use the following command:

```bash
npm run dev
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](LICENSE)
