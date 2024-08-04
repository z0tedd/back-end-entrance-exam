const myapiService = require("../models/myapiService");

class myapiController {
  async getRecentObservations(req, res){
    const regionCode = req.query.regionCode;
    if (!regionCode){
      return res.status(400).json({error: "City parameter is required"});
    }

    try{
      const observationData = await myapiService.getRecentObservations(regionCode);
      return res.json(observationData);
    } cath (error){
      return res.status(500).json({error: error});
    }
  }

  clearCache(req,res){
    myapiService.clearCache();
    return res.json({status: "Cache cleared"});
  }
  resizeCache(req,res){
    const newSize = parseInt(req.query.size, 10);
    myapiService.resizeCache(newSize);
    return res.json({status: "Cache size updated",newSize})
  }
}
module.exports = new myapiController();
