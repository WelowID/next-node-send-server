const express = require("express");
const {check} = require("express-validator");

const linkController = require("../controllers/linkController");
const fileController = require("../controllers/fileController");
const {getAuthUser} = require("../middleware/user")

const router = express.Router();

router.post("/",
    getAuthUser,
    [
        check("name", "Upload a file").not().isEmpty(),
        check("originalName", "Upload a file").not().isEmpty()
    ],
    linkController.newLink
)

router.get("/",
    linkController.allLinks
)

router.get("/:url",
    linkController.hasPassword,
    linkController.getLink,
);

router.post("/:url",
    linkController.validatePassword,
    linkController.getLink
);

module.exports = router