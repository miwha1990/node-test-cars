# A car uploader service based on Node.js + Express
For initializing project you need to do following commands (run mongo service before)
```
npm install
node server.js
```

For filling database you need to GET next route

[http://localhost:8000/init](http://localhost:8000/init)

Then, on initiate server and every 1 minute CRON task will search
 for offers that are not uploaded to server API http://wispy-bird-8767.getsandbox.com/cars,
  and uploads them. 

