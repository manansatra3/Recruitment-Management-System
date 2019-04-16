const express = require("express");
const router = express.Router();
const data = require("../data");

router.get('/submitApplication', (req, res)=> {
    console.log(__dirname)
    res.sendFile('./submitApplication');
});
module.exports = router;