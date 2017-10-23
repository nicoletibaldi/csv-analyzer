const assert = require('assert');
const columnTypes = require('../src/column-types');
// orderColumnTypes, getMostFrequentType, isMultipleChoice, assignMultipleChoiceType

const idValues = ['ABC', '', 'GHI', 'JKL', ''];
const dateValues = ['November 20', '1/15/2016', '2/14/2013', '3/14/2012', '4/15/2007'];
const departmentValues = [
  'Accounting',
  'Human Resources',
  'Accounting',
  'Customer Service',
  'Human Resources',
];

const expectedIdTypes = { text: 3, null: 2 };
const expectedDateTypes = { 'date/time': 4, text: 1 };
const expectedDepartmentFrequency = {
  Accounting: 2,
  'Human Resources': 2,
  'Customer Service': 1,
};


describe('Column types', () => {
  it('Correctly identifies the types of the entries in a column', () => {
    assert.deepEqual(
      columnTypes.getColumnTypesAndWordFreq(idValues).typeObj,
      expectedIdTypes,
    );
  });

  it('Recognizes date/time entries', () => {
    assert.deepEqual(
      columnTypes.getColumnTypesAndWordFreq(dateValues).typeObj,
      expectedDateTypes,
    );
  });

  it('Groups the column entries by frequency', () => {
    assert.deepEqual(
      columnTypes.getColumnTypesAndWordFreq(departmentValues).wordFreq,
      expectedDepartmentFrequency,
    );
  });
});
