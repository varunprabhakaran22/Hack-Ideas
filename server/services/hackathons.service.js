const hackathonsRepo = require("../repositories/hackathons.repository");
const {
    GET_SUCCESS,
    GET_FAILED,
    POST_SUCCESS,
    POST_FAILED,
    DELETE_SUCCESS,
    DELETE_FAILED,
    UPDATE_SUCCESS,
    UPDATE_FAILED,
} = require("../constants/constant");

const getHackathonsData = async () => {
    console.log("calledd hackathons service");
    try {
        const response = await hackathonsRepo.getHackathonsData();
        if (response) {
            return { status: 1, message: GET_SUCCESS, data:response };
        } else {
            return { status: 0, message: GET_FAILED };
        }
    } catch (err) {
        console.log(err);
    }
};

const createHackathon = async params => {
    console.log("calledd hackathons service");
    try {
        const response = await hackathonsRepo.createHackathon(params);
        console.log("response", response);
        if (response) {
            return { status: 1, message: POST_SUCCESS, data: response };
        } else {
            return { status: 0, message: POST_FAILED };
        }
    } catch (err) {
        console.log(err);
    }
};

const updateHackathonsData = async params => {
    console.log("calledd hackathons service");
    try {
        const response = await hackathonsRepo.updateHackathonsData(params);
        console.log("response", response);
        if (response) {
            return { status: 1, message: UPDATE_SUCCESS, data: response };
        } else {
            return { status: 0, message: UPDATE_FAILED };
        }
    } catch (err) {
        console.log(err);
    }
};

/* 
    @deleteIndex Methods  - Delete the data from algolia index

*/
const deleteHackathonsData = async params => {
    console.log("calledd hackathons service");
    try {
        const response = await hackathonsRepo.deleteHackathonsData(params);
        console.log("deleteres", response);
        if (response) {
            return { status: 1, message: DELETE_SUCCESS, data: response };
        } else {
            return { status: 0, message: DELETE_FAILED };
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getHackathonsData,
    createHackathon,
    updateHackathonsData,
    deleteHackathonsData,
    // getHackathons,
};
