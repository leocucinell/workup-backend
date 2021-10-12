const bcrypt = require("bcrypt");
const { Users } = require("../models")

/* SECTION: Middleware */

/* SECTION: Routes */
//Create User - POST
const createUser = async (req, res, next) => {
    /*
        - Check the database for the specs of the user you are about to create
        - if they already exist: Send a warning to the api user
        - else: continue

        - salt and hash the password that is sent with bcrypt

        - create the user within the database: use callback to check if error has occured

        - reutrn a successful status code and message
    */
    try{
        const doesUserExist = await Users.exists({$or:[{email: req.body.email}, {username: req.body.username}]});
        if(doesUserExist){
            return res.status(406).json({
                msg: "User already exists",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;

        const createdUser = await Users.create(req.body, (err, savedUser) => {
            if(err){
                return res.status(400).json({
                    msg: "Error saving user, check all form fields"
                })
            }
        });

        res.status(200).json({
            msg: "successfully created user",
        })

    } catch(e) {
       res.status(400).json({
           msg: "error creating user"
       });
    }
}

//Authenticate a User - GET
const authenticateUser = async (req, res, next) => {
    try {
        /*
            - get the user with the provided username || passwowrd
            - get the password from that user, 
            - check the hashed password with the bcrypt.compare method
            - if bcrypt passes, set the session for the logged in user
        */
        const foundUser = Users.findOne({$or:[{email: req.body.email}, {username: req.body.username}]});
        if(!foundUser){
            return res.status(406).json({
                msg: "User does not exist",
            });
        }

        bcrypt.compare( req.body.password, foundUser.password, (err, result) => {
            if(err){
                return res.status(406).json({
                    msg: "Password incorrect",
                });
            }
            req.session.currentUser = {
                currentUser: foundUser
            }
        });

        return res.status(200).json({
            msg: "user session created",
            currentUser: foundUser
        });

    } catch(e) {
        res.status(400).json({
            msg: "error authenticating user"
        });
    }
}

//Get a User - GET
const getUser = async (req, res, next) => {
    try{
        const foundUser = await Users.findById(req.params.id);
        if(!foundUser){
            res.status(400).json({
                msg: "User does not exist"
            });
        }

        res.status(200).json({
            msg: "found user",
            user: foundUser
        });

    } catch(e) {
        res.status(400).json({
            msg: "Error getting specified user"
        })
    }
}

//Update a User - PUT: Might need to use express sessions or store a web token to check if correct user
const updateUser = async (req, res, next) => {
    try{
        const updatedUser = await Users.findByIdAndUpdate(
            req.params.id,
            {
                username: req.body.username,
                email: req.body.email,
                address: req.body.address,
                mainCity: req.body.city
            },
            {
                new: true
            }
        );
        return res.status(200).json({
            msg: "successfully updated user",
            updatedUser
        });
    } catch(err) {
        res.status(400).json({
            msg: "error updating user"
        })
    }
}

//add jobPosting = PUT: Api Users will create the job first, then send this information
const addjobPosting = async (req, res, next) => {
    try{
        const updatedUser = await Users.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    "jobPostings": {
                        id: req.body.jobId
                    }
                }
            }
        );
        return res.status(200).json({
            msg: "added job to jobPostings list",
        });
    } catch(err) {
        res.status(400).json({
            msg: "error adding friend to user"
        })
    }
}

//Delete a User - DELETE
const deleteUser = async (req, res, next) => {
    try{
        const deletedUser = await Users.findByIdAndDelete(req.params.id);
        res.status(200).json({
            msg: "successfully deleted user",
            deletedUser
        })
    } catch(err) {
        res.status(400).json({
            msg: "error deleting user"
        })
    }
}

/* SECTION: Exports */
module.exports = {
    createUser,
    authenticateUser,
    getUser,
    addjobPosting,
    deleteUser,
    updateUser
}