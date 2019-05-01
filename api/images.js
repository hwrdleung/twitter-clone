require("dotenv").config();
const User = require('../models/User');
const express = require('express');
const router = express.Router();
const ServerResponse = require('./serverResponse');
const verifyToken = require('./verifyToken');
const { Storage } = require("@google-cloud/storage");
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;

const storage = new Storage({
    projectId: FIREBASE_PROJECT_ID,
    keyFilename: "./keyfile.json"
});

const bucket = storage.bucket("gs://twitter-clone-35d55.appspot.com/");

router.post('/uploadImage', verifyToken, (req, res) => {
    console.log('client request for img upload')
    let userId = req._id._id.toString();
    let type = req.body.type;
    // If token isValid, upload image to firebase.  Create folder and filename with user Id
    // Find user in database and set profileImgUrl to new firebase image url
    // save and return user to client
    let base64EncodedImageString = req.body.base64.replace(
        /^data:image\/\w+;base64,/,
        ""
    );

    let imageBuffer = new Buffer(base64EncodedImageString, "base64");
    let file = bucket.file(`${userId}/${userId}-${type.toLowerCase()}.png`);
    let imgUrl = '';

    file.save(imageBuffer, { metadata: { contentType: "image/png" }, validation: "md5" })
        .then(error => {
            if (error) console.log(error);

            return file.getSignedUrl({ action: "read", expires: "03-09-2491" });
        }).then(signedUrls => {
            imgUrl = signedUrls[0];

            return User.findOne({ _id: req._id });
        }).then(user => {
            switch (type) {
                case 'PROFILE': user.profileImgUrl = imgUrl;
                    break;
                case 'SPLASH': user.splashImgUrl = imgUrl;
                    break;
            }

            return user.save();
        }).then(user => {
            if (!user) {
                res.json(new ServerResponse(false, 'System error: failed to save new image.'));
            } else {
                res.json(new ServerResponse(true, 'New image saved', user));
            }
        }).catch(error => console.log(error));
});

module.exports = router;