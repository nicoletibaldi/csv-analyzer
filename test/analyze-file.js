const assert = require('assert');
const analyzeFile = require('../src/analyze-file');

const sampleMatrix = [
  ['11/20/2015', 'ABC123', '"John H. Doe, Esq"', 'Accounting', 'Male'],
  ['1/15/2016', 'DEF234', 'Jane M. Doe', 'Human Resources', 'Female'],
  ['2/14/2013', 'GHI345', 'Thomas M. Mann', 'Accounting', 'Male'],
  ['3/14/2012', 'JKL456', 'Joe Smith', 'Human Resources', 'Male'],
  ['4/15/2007', 'MNO567', 'Debra Doe', 'Customer Service', 'Female'],
];
const sampleColumnNames = ['Hired', 'EmployeeNum', 'Name', 'Department', 'Gender'];

const expectedOutput = {
  Hired: { type: 'date/time' },
  EmployeeNum: { type: 'text' },
  Name: { type: 'text' },
  Department: { type: 'text' },
  Gender: {
    type: 'multiple choice',
    choices: ['Male', 'Female'],
  },
};

describe('Analyze file', () => {
  it('Should return a javascript object listing the column names, their type and choices, if applicable', () => {
    assert.deepEqual(
      analyzeFile.listColumnNamesWithTypes(sampleMatrix, sampleColumnNames),
      expectedOutput,
    );
  });
});
