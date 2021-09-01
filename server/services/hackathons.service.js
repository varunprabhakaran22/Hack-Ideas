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
    try {
        const response = await hackathonsRepo.createHackathon(params);
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
    try {
        const response = await hackathonsRepo.updateHackathonsData(params);
        if (response) {
            return { status: 1, message: UPDATE_SUCCESS, data: response };
        } else {
            return { status: 0, message: UPDATE_FAILED };
        }
    } catch (err) {
        console.log(err);
    }
};

const deleteHackathonsData = async params => {
    try {
        const response = await hackathonsRepo.deleteHackathonsData(params);
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
};
