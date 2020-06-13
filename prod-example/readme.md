# App Template

## Usage

`npm i`  
`npm start`

### pm2 commands

[Full Cheatsheet](https://devhints.io/pm2)

`pm2 log`  
`pm2 stop all`  
`pm2 delete all`

## Profiling

### Clinic.js

[Docs](https://clinicjs.org/documentation/)

`npm i -g clinic`  
`clinic doctor --autocannon [ / ] -- node src/server.js`  
`clinic doctor --autocannon [ -c 100 / ] -- node src/server.js`  
`clinic flame --autocannon [ / ] -- node src/server.js`  
`clinic bubbleprof --autocannon [ -c 100 / ] -- node src/server.js`

### Apache benchmark

`ab -c 1 -n 1`  
`ab -c 1 -n 1 http://localhost:3000/`  
`ab -c 10 -n 100 http://localhost:3000/`
