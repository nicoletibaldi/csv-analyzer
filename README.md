# Knack Coding Challenge
This project was created to solve the following problem:
```
We have some contact records in a CSV (attached). We want to convert this CSV into a database schema. Write a Node program that will read the full list of contacts and predict whether each column is one of the following 3 types: Date/Time, Text, or Multiple Choice. Provide the available options for any Multiple Choice columns. This program should be fully tested. Use ES6 conventions when applicable.
```

## Setup:
Run `npm install` from within the project folder.


## Scripts:

### `npm start`
Runs the app in the terminal. The user will be prompted to enter a file name, or press enter to use the default file (`test-contacts.csv`), as
provided. YMMV with other files, as there were obviously some assumptions made based on the content of `test-contacts.csv`. (Date format, for example.)

### `npm test`
Runs all tests in the `test` directory.

### `npm run lint`
Lints both the project and test files using Airbnb linting rules.
