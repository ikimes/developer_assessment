# developer_assessment

## Endpoint Branch

Uses express js and ejs. 

## Getting started
1. Pull this repository.
2. `npm install` just in case.
3. In the terminal, type `node ./bin/www`
4. The server is on http://localhost:3000/

## Api Documentation
http://localhost:3000/people
  will return the whole json object
  
http://localhost:3000/person/?first=firstName&last=lastName
  will return a json object of that singular person. If no person is found, return error response
