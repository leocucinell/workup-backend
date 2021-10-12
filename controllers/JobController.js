const { Jobs, Cities } = require("../models");

/* SECTION: Middleware */

/* SECTION: Routes */
//create job - POST
const createJob = async (req, res, next) => {
    /*
        grab and check if there is a current user within the session obj
        if there is no user session, dont create and explain to user
        else create and pass the user as author: {username, id}
    */
    let jobHolder;
    try{
        jobHolder = await Jobs.create({
            title: req.body.title,
            description: req.body.description,
            author: {
                username: req.body.author.username,
                id: req.body.author.userId
            },
            streetAddress: req.body.streetAddress,
            city: req.body.city,
            date: req.body.date,
            spots: req.body.spots,
            filled_spots: [],
            jobPurpose: req.body.jobPurpose
        });
    } catch(e){
        res.status(400).json({
            msg: "error creating job"
        });
    }

    try{
        const jobToAdd = await Cities.findByIdAndUpdate(
            req.body.city,
            {
                $push: {
                    "jobList": {
                        id: jobHolder.id,
                        title: req.body.title,
                        description: req.body.description
                    }
                }
            }
        );

        res.status(200).json({
            msg: "successfully created job",
            job: jobHolder
        });

    } catch(e) {
        res.status(400).json({
            msg: "error creating job"
        });
    }
}
//read job - GET
const getJob = async (req, res, next) => {
    try{
        const foundJob = await Jobs.findById(req.params.id);
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
const updateJob = async (req, res, next) => {
    try{
        const updatedJob = await Jobs.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                streetAddress: req.body.streetAddress,
                city: req.body.city,
                date: req.body.date,
                spots: req.body.spots,
                filled_spots: req.body.filled_spots,
                jobPurpose: req.body.jobPurpose
            },
            {
                new: true
            }
        );
        return res.status(200).json({
            msg: "successfully updated job",
            updatedJob
        });
    } catch(err) {
        res.status(400).json({
            msg: "error updating job"
        });
    }
}

//delete job - DELETE
const deleteJob = async (req, res, next) => {
    try{
        const deletedJob = await Jobs.findByIdAndDelete(req.params.id);
        if(!deletedJob){
            res.status(400).json({
                msg: "error deleting job"
            })
        }
        res.status(200).json({
            msg: "successfully deleted job",
            deletedJob
        });
    } catch(err) {
        res.status(400).json({
            msg: "error deleting job"
        });
    }
}

//Get list of jobs depending on city
const retrieveCityJobs = async (req, res, next) => {
    //Gets all the job items stored in a city: [{jobTitle, description, id}]
    try{
        const currentCity = await Cities.findOne({title: req.params.cityName});
        const cityList = currentCity.jobList
        if(!cityList){
            res.status(400).json({
                msg: "cannot find jobList",
            });
        }
        res.status(200).json({
            msg: "successfully deleted job",
            cityList
        });
    } catch(e){
        res.status(400).json({
            msg: "cannot find jobList",
        });
    }
}

/* SECTION: Exports */
module.exports = {
    createJob,
    getJob,
    updateJob,
    deleteJob,
    retrieveCityJobs
}