exports.testesReq = (req, res) => {
    console.log(req.params);
    res.send(req.params)
};