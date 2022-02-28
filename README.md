# E-Commerce-Back-End [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description 
This application was created to allow an internet retail company to have a back end for their e-commerce website that uses the latest technologies so that they can compete with other e-commerce companies.
This application was created with [Node.js](https://nodejs.org/en/). The modules used include: 
- [Express](https://expressjs.com/)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [Sequelize](https://sequelize.org/)
- [Dotenv](https://www.npmjs.com/package/dotenv).
    
## Table of Contents 
- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Contribution](#Contribution)
- [Tests](#Tests)
- [Questions](#Questions)
- [Links](#Links)

## Installation 
To install this application please follow these instructions:
- Please have node, npm and mysql installed with your mysql password ready.
- To be safe and not have your password anywhere sensitive please make sure that there is a .gitignore file in the root repository with ```.env``` typed in if not please make one. 
- Create a .env file in your current repository to hide your sensitive information.
- The .env file must contain the following three lines:
```
    DB_NAME='employees_db'
    DB_USER='root'
    DB_PWD='yourPassword'
```
- NOTE: yourPassword is refferring to your mysql password you created, keep DB_NAME and DB_USER the same.
- Change into the db repository and type ```mysql -u root -p``` on your CLI or Terminal and enter your mysql password.
- Please type ```source schema.sql;``` in your CLI or Terminal, if successful then type ```quit```.
- To start make sure your are in your root repository and run ```npm start``` or ```node server.js```.
- To make changes to the files without having to reset the server everytime please run ```npm watch```.

## Usage 
<p> As this application has no front end please interect with it using an API client such as Insomnia or Postman.</p>

## License 
<p> This application is covered under the:</p>

- [MIT-License](https://opensource.org/licenses/MIT)

## Contribution 
<p> None.</p>

## Tests 
<p> This application was not developed using Test Driven Development.</p>

## Questions 
<p> To reach me with additional questions please contact me via one of the following methods: </p>

- Link: [GitHub](https://github.com/seanscott95)
- Link: [Email](mailto:seanms418@gmail.com)
- Link: [LinkedIn](https://www.linkedin.com/in/sean-scott-18ba07225/)

## Links
- Link: [GitHub](https://github.com/seanscott95/E-Commerce-Back-End)
- Link: [Video-Demo](https://drive.google.com/file/d/114dbkBCCNiXdinuHK4NA01PJyUcy16jc/view)