data = require("./data");
const application = data.application;

async function test(){
   var applicationUpgradeResult = await application.setApplicationStatus("5cd50de5a6ad9e116e0a3d1e","succeed succeed");
    console.log(applicationUpgradeResult);
}

test();