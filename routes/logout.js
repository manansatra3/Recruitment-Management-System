const express = require("express");
const router = express.Router();


router.get('/', async (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.render("logout");
    });
    res.render('logout')
});


module.exports = router;