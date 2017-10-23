const assert = require('assert');
const columnTypes = require('../src/column-types');

const idValues = ['ABC', '', 'GHI', 'JKL', ''];
const dateValues = [
  'November 20',
  '1/15/2016',
  '2/14/2013',
  '3/14/2012',
  '4/15/2007',
];
const departmentValues = [
  'Accounting',
  'Human Resources',
  'Accounting',
  'Customer Service',
  'Human Resources',
  'Accounting',
];
const expectedIdTypes = { text: 3, null: 2 };
const expectedDateTypes = { 'date/time': 4, text: 1 };
const expectedDepartmentFrequency = {
  Accounting: 3,
  'Customer Service': 1,
  'Human Resources': 2,
};
const expectedDateFrequency = {
  'November 20': 1,
  '1/15/2016': 1,
  '2/14/2013': 1,
  '3/14/2012': 1,
  '4/15/2007': 1,
};
const expectedDepartmentsList = [
  'Accounting',
  'Human Resources',
  'Customer Service',
];

describe('Column types', () => {
  it('Correctly identifies the types of the entries in a column', () => {
    // getColumnTypesAndWordFreq returns two values, typesObj is the first
    const typesObj = columnTypes.getColumnTypesAndWordFreq(idValues)[0];
    assert.deepEqual(typesObj, expectedIdTypes);
  });

  it('Recognizes date/time entries', () => {
    const typesObj = columnTypes.getColumnTypesAndWordFreq(dateValues)[0];
    assert.deepEqual(typesObj, expectedDateTypes);
  });

  it('Groups the column entries by frequency', () => {
    // wordFreq is the second value returned
    const wordFreq = columnTypes.getColumnTypesAndWordFreq(departmentValues)[1];
    assert.deepEqual(wordFreq, expectedDepartmentFrequency);
  });

  it('Orders the column types, from most to least frequent, in array format', () => {
    assert.deepEqual(
      columnTypes.orderColumnTypes(expectedDepartmentFrequency),
      expectedDepartmentsList,
    );
  });

  it('Returns the first item from the ordered list, which is the most frequent type', () => {
    assert.equal(
      columnTypes.getMostFrequentType(expectedDepartmentsList),
      'Accounting',
    );
  });

  it('Determines if a column is multiple choice, using the frequency of the entries', () => {
    assert.equal(
      columnTypes.isMultipleChoice(expectedDepartmentFrequency, departmentValues.length),
      true,
    );
  });

  it('Does not identify columns with many unique entries as being multiple choice', () => {
    assert.equal(
      columnTypes.isMultipleChoice(expectedDateFrequency, dateValues.length),
      false,
    );
  });

  it('Assigns the proper type to a column, either multiple choice or the most frequent type', () => {
    assert.deepEqual(
      columnTypes.assignType(false, expectedDateFrequency, 'date/time'),
      { type: 'date/time' },
    );
  });

  it('Assigns the proper type... if multiple choice, it also returns the available choices', () => {
    assert.deepEqual(
      columnTypes.assignType(true, expectedDepartmentFrequency, 'text'),
      {
        type: 'multiple choice',
        choices: [
          'Accounting',
          'Customer Service',
          'Human Resources',
        ],
      },
    );
  });
});
