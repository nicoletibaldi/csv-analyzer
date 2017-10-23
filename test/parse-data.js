const assert = require('assert');
const parseData = require('../src/parse-data');

// ugh. using tabs inside this string causes them to appear in the matrix...
// sorry, fellow neat-freaks.
const sampleData =
`Date,ID,Name,Department,Gender,
11/20/2015,ABC123,"John H. Doe, Esq",Accounting,Male,
1/15/2016,DEF234,Jane M. Doe,Human Resources,Female,
2/14/2013,GHI345,Thomas M. Mann,Accounting,Male,
3/14/2012,JKL456,Joe Smith,Human Resources,Male,
4/15/2007,MNO567,Debra Doe,Customer Service,Female,`;

const expectedMatrix = [
  ['Date', 'ID', 'Name', 'Department', 'Gender'],
  ['11/20/2015', 'ABC123', '"John H. Doe, Esq"', 'Accounting', 'Male'],
  ['1/15/2016', 'DEF234', 'Jane M. Doe', 'Human Resources', 'Female'],
  ['2/14/2013', 'GHI345', 'Thomas M. Mann', 'Accounting', 'Male'],
  ['3/14/2012', 'JKL456', 'Joe Smith', 'Human Resources', 'Male'],
  ['4/15/2007', 'MNO567', 'Debra Doe', 'Customer Service', 'Female'],
];

const expectedColumnNames = ['Date', 'ID', 'Name', 'Department', 'Gender'];

const expectedColumnValues = ['ABC123', 'DEF234', 'GHI345', 'JKL456', 'MNO567'];

describe('Parse data', () => {
  it('Should create a matrix from comma separated entries', () => {
    assert.deepEqual(parseData.createMatrix(sampleData), expectedMatrix);
  });

  it('Should retrieve the column names (first row) of the matrix', () => {
    assert.deepEqual(
      parseData.getColumnNames(expectedMatrix),
      expectedColumnNames,
    );
  });

  it('Should return all entries from a given column as an array', () => {
    // pass in '1' to signify the item at index 1 in each array, which
    // is ID in this case
    assert.deepEqual(
      parseData.getColumnData(expectedMatrix, 1),
      expectedColumnValues,
    );
  });
});
