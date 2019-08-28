# developer_assessment

## Endpoint Branch

Uses express js and ejs. 

## Getting started
1. Pull this repository.
2. `npm install` just in case.
3. In the terminal, type `node ./bin/www`
4. The server is on http://localhost:3000/

## Api Documentation
1. http://localhost:3000/people
  will return the whole json object
  
2. http://localhost:3000/person/?first=firstName&last=lastName
  will return a json object of that singular person. If no person is found, return error response

### TODO
Inside of public/js/index.js I originally modified the data from the local csv file as I wasn't sure if I would end up getting the endpoint working. Since I am now using a server, I should be getting the csv from a response rather than loading from the local file but I left it since I ran out of time to work on this. 
