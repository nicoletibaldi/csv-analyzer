const fileSystem = require('fs');
const prompt = require('prompt');

const parseData = require('./parse-data');
const columnTypes = require('./column-types');

// const testFile = 'test-contacts.csv';

function listColumnNamesWithTypes(matrix, columnNames) {
  const list = {};
  for (let i = 0; i < columnNames.length; i++) {
    const currentColumn = columnNames[i];
    const columnData = parseData.getColumnData(matrix, i);
    const typesObj = columnTypes.getColumnTypesAndWordFreq(columnData);
    const typesArr = columnTypes.orderColumnTypes(typesObj.typeObj);
    const mostFreq = columnTypes.getMostFrequentType(typesArr);
    const multipleChoice = columnTypes.isMultipleChoice(
      typesObj.wordFreq,
      columnData.length,
    );
    list[currentColumn] = columnTypes.assignMultipleChoiceType(
      multipleChoice,
      currentColumn,
      typesObj,
      mostFreq,
    );
  }
  return list;
}

function analyzeCsvData(fileName) {
  fileSystem.readFile(fileName, 'utf-8', (err, data) => {
    if (err) throw err;
    const matrix = parseData.createMatrix(data);
    const columnNames = parseData.getColumnNames(matrix);
    return listColumnNamesWithTypes(matrix, columnNames);
  });
}

prompt.start();

prompt.get(['file'], (err, result) => {
  /* eslint-disable no-console */
  console.log(analyzeCsvData(result.file));
  /* eslint-disable no-console */
});


// We have some contact records in a CSV (attached). We want to convert this
// CSV into a database schema. Write a Node program that will read the full list
// of contacts and predict whether each column is one of the following 3 types:
// Date/Time, Text, or Multiple Choice. Provide the available options for any Multiple
// Choice columns. This program should be fully tested. Use ES6 conventions when applicable.
