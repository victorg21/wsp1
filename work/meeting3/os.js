const os = require('os');
let netInfo = os.networkInterfaces();
let platform = os.platform();
console.log("platform=" +platform);
console.log(netInfo);
