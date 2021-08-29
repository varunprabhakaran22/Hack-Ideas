const hackathonsModel = require("../models/hackathons.model");

const getHackathonsData = async params => {
    try {
        const snapshot = await hackathonsModel.get();
        let hackathonsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return hackathonsData;
    } catch (e) {
        console.log(e);
    }
};

const getHackathons = async hackathonsIds => {
    try {
        const snapshot = await hackathonsModel.where("hackathons_id", "in", hackathonsIds).get();
        let hackathonsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return hackathonsData;
    } catch (e) {
        console.log(e);
    }
};

const createHackathonsData = async params => {
    try {
        return await hackathonsModel.add(params);
    } catch (e) {
        console.log(e);
    }
};

const updateHackathonsData = async params => {
    console.log("updatehackathonsData params", params);
    let hackathons;
    try {
        await hackathonsModel
            .where("hackathons_id", "==", params.hackathons_id)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update(params);
                    hackathons = { ...doc.data(), ...params, id: doc.id };
                });
            })
            .catch(err => {
                console.log(err);
            });
    } catch (e) {
        console.log(e);
    }
    return hackathons;
};

const deleteHackathonsData = async params => {
    let hackathons;
    try {
        await hackathonsModel
            .where("hackathons_id", "==", params.hackathons_id)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.delete();
                    hackathons = doc.id;
                });
            })
            .catch(err => {
                console.log(err);
            });
    } catch (e) {
        console.log(e);
    }
    return hackathons;
};

module.exports = {
    getHackathonsData,
    createHackathonsData,
    updateHackathonsData,
    deleteHackathonsData,
    getHackathons,
};

// Demo Json
// {
//     "hackathons_id" :1,
//     "uid":1,
//     "images" :"",
//     "description" : "Tap the rain water between the walls" ,
//     "hackathons_name" : "Traapping Rain Water",
//     "timestamp" :1625224522,
//     "votes" :[1,2,3,4,5],
//     "tags" :"ML
// }
