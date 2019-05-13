const express = require("express");
const router = express.Router();

isAuth = (req, res, next) => {
    // console.log(req.session.authority)
    if (req.session.authority == undefined || req.session.authority == false) {
        res.render('errorPage', { e: { statusCode: "401", error: "You are not logged in, please login", redirect: "/" } })
    }
    else {
        next();
    }
};

router.use(isAuth);




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