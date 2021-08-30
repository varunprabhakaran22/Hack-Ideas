const userModel = require("../models/user.model");
const jwtSecret = require("../keys/jwt.keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const getloginDetails = async params => {
    try {
        let userDetails = await checkEmailID(params);
        let response = {};
        if (userDetails !== null || userDetails.length !== 0) {
            const match = await bcrypt.compare(params.data.password, userDetails[0].password);
            if (match) {
                try {
                    let jwtkey = jwtSecret.secret;
                    const token = jwt.sign(
                        {
                            email: userDetails[0].email,
                            name: userDetails[0].name,
                        },
                        jwtkey,
                        {
                            expiresIn: "5h",
                        }
                    );
                    return (response.token = token);
                } catch (err) {
                    return (response.token = null);
                }
            } else {
                return (response.token = null);
            }
        }
    } catch (err) {
        console.error(err);
    }
};

const saveSignUpDetails = async params => {
    console.log("signUp", params);
    try {
        const hashedPassword = await bcrypt.hash(params.data.password, 10);
        if (hashedPassword) {
            let userDetails = {
                email: params.data.email_id,
                password: hashedPassword,
                name: params.data.name,
                uid: uuidv4(),
            };
            console.log("userDetails", userDetails);
            return await userModel.add(userDetails);
        }
    } catch (e) {
        console.log(e);
    }
};

const checkEmailID = async params => {
    try {
        const response = await userModel.where("email", "==", params.data.email_id).get();
        let snapshot = response.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return snapshot;
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    saveSignUpDetails,
    checkEmailID,
    getloginDetails,
};

// Demo JSON
// {
//     "uid":1,
//     "name":"",
//     "email":"",
//     "password":""
// }
