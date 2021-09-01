const userRepo = require("../repositories/user.repository");
const { GET_SUCCESS, GET_FAILED, POST_SUCCESS, POST_FAILED } = require("../constants/constant");

const saveSignUpDetails = async params => {
    try {
        let response = await userRepo.checkEmailID(params);
        let userDetails;

        if (response === null || response.length === 0) {
            userDetails = await userRepo.saveSignUpDetails(params);
        } else {
            return { status: 409, message: POST_FAILED };
        }

        if (userDetails !== null) {
            return { status: 1, message: POST_SUCCESS, data: userDetails };
        } else {
            return { status: 0, message: POST_FAILED };
        }
    } catch (err) {
        console.log(err);
    }
};

const getloginDetails = async params => {
    try {
        const response = await userRepo.getloginDetails(params);
        if (response) {
            return { status: 1, message: GET_SUCCESS, token: response };
        } else {
            return { status: 0, message: GET_FAILED };
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    saveSignUpDetails,
    getloginDetails,
};
