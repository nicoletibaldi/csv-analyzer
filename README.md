# Knack Coding Challenge
This project was created to solve the following problem:
```
We have some contact records in a CSV (attached). We want to convert this CSV into a database schema. Write a Node program that will read the full list of contacts and predict whether each column is one of the following 3 types: Date/Time, Text, or Multiple Choice. Provide the available options for any Multiple Choice columns. This program should be fully tested. Use ES6 conventions when applicable.
```

The app returns an object which contains keys that represent the column names. Each key has a nested object, which has a key of `type`, and lists the column's type (date/time, text, or multiple choice). If `type` is multiple choice, the object includes property, `choices`, which lists the choices for the multiple choice column, in array format.

## Setup:
Run `npm install` from within the project folder.


## Scripts:

### `npm start`
Runs the app in the terminal. The program will log out the analysis of the default file (`test-contacts.csv`), as provided. This can be used for other .csv files by changing `testFile` in `index.js`. YMMV with other files, as there were obviously some assumptions made based on the content of `test-contacts.csv`. (Date format, for example.) However, I did test this with other data and it works fairly well.

### `npm test`
Runs all tests in the `test` directory.

### `npm run lint`
Lints both the project and test files using Airbnb linting rules.

## Other Considerations:
I wanted to return this in a timely fashion, but I can think of a lot of possible improvements that would make this really cool.

First, I'd like to create a function that generates a `CREATE TABLE` statement, in a default SQL syntax (maybe Postgres?). This SQL statement would be returned to the user along with the Javascript object that lists the types.

This function would have to determine the data type in the context of SQL (for most of these, `varchar`), if the column is nullable (I already checked for the presence of null for this reason), and create constraints for the multiple choice columns that will only allow values that are part of the `choices` array. For example, if the column is 'Gender,' and the choices are 'Male,' 'Female,' and 'Unknown':
`CONSTRAINT check_value CHECK (value IN ('Male', 'Female', 'Unknown'))`

Along with that, I'd like to analyze the length of the strings in each column to determine the length of the longest string. This would allow me to add a specific length to each column, rather than defaulting to the max length for `varchar`.

To take it a step further, I'd like to add command line prompts. The user could then enter a file name, or use the default. This could also potentially allow the user to input the name of their preferred SQL syntax (MySQL, Oracle, Postgres, etc) for the `CREATE TABLE` statement, instead of  using a default.
