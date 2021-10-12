const { Jobs } = require("../models");

/* SECTION: Middleware */

/* SECTION: Routes */
//create job - POST
const createJob = async (req, res, next) => {
    /*
        grab and check if there is a current user within the session obj
        if there is no user session, dont create and explain to user
        else create and pass the user as author: {username, id}
    */
    try{
        if(!req.session.currentUser){
            res.status(400).json({
                msg: "error: no user logged in!"
            });
        }
        const createdJob = await Jobs.create({
            title: req.body.title,
            description: req.body.description,
            author: {
                username: req.session.currentUser.username,
                id: req.session.currentUser.id
            },
            streetAddress: req.body.streetAddress,
            city: req.body.city,
            date: req.body.date.body,
            spots: req.body.spots,
            filled_spots: [],
            jobPurpose: req.body.jobPurpose
        }, (err, savedJob) => {
            if(err){
                res.status(400).json({
                    msg: "error creating job"
                });
            }
        });

        res.status(200).json({
            msg: "successfully created job",
            job: createdJob
        });

    } catch(e) {
        res.status(400).json({
            msg: "error authenticating user"
        });
    }
}
//read job - GET
const getJob = (req, res, next) => {
    try{
        const foundJob = Jobs.findById(req.body.id);
        if(!foundJob){
            res.status(400).json({
                msg: "Error retrieving specified job"
            });
        }

        res.status(200).json({
            msg: "Found Job",
            job: foundJob
        });

    } catch(e){
        res.status(400).json({
            msg: "Error getting specified job"
        });
    }
}

//update job - PUT
const updateJob = (req, res, next) => {

}

//delete job - DELETE
const deleteJob = (req, res, next) => {
    
}

/* SECTION: Exports */
module.exports = {
    createJob,
    getJob,
    updateJob,
    deleteJob
}