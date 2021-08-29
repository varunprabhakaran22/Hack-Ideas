const hackathonsServices = require("../../services/hackathons.service");
// const { checkToken } = require("../../../utils/jwt");

const getHackathonsData = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await hackathonsServices.getHackathonsData({
        ...params,
        ...queryParams,
        ...bodyParams,
    });
    return res.status(200).send(response);
};

const createHackathonsData = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await hackathonsServices.createHckathonsData({
        ...params,
        ...queryParams,
        ...bodyParams,
    });
    return res.status(200).send(response);
};

const updateHackathonsData = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await hackathonsServices.updateHackathonsData({
        ...params,
        ...queryParams,
        ...bodyParams,
    });
    return res.status(200).send(response);
};

const deleteHackathonsData = async (req, res) => {
    const params = req.params;
    const queryParams = req.query;
    const bodyParams = req.body;
    const response = await hackathonsServices.deleteHackathonsData({
        ...params,
        ...queryParams,
        ...bodyParams,
    });
    return res.status(200).send(response);
};

module.exports = {
    getHackathonsData,
    createHackathonsData,
    updateHackathonsData,
    deleteHackathonsData,
    // getHackathons,
};
