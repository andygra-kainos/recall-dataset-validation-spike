# recall-dataset-validation-spike

Set of business rules that can be applied to the dataset.
The spike just looked at identification of validation issues.

Some data could be fixed on the fly
- dates in YY format could be qualified to YYYY

## Business rules
Business rules are in the rules folder.
Additional rules can be added in the form
```
'use strict';
module.exports = {
  rules: [
    {
      "name": 'rule name / description',
      "condition": () => {},
      "consequence": () => {}
    }
  ]};
```

## Data set
The data set is expected to be in the data folder.
The expected filename is RecallsFile.csv
as per the downloaded asset.

## Run validation
To run
```
$ npm run data:validate
```

## Todo
Always more to do, never enough validation.
* output results to a results folder
* output results in a standard report format