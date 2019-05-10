const express = require("express");
const router = express.Router();


router.get('/', async (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.render("logout");
        return;
    });
    //who did this? this is ....... I do not want to say.....
    //res.render('logout')
});


module.exports = router;