const https = require("https");
const cacheService = require("../views/cache");
const API_KEY = "ap0aqmo79sih";

class myapiService {
  resizeCache(newSize) {
    cacheService.resize(newSize);
  }
  clearCache() {
    cacheService.clear();
  }

  async getRecentObservations(regionCode) {
    let observationData = cacheService.get(regionCode);
    if (observationData) {
      return { data: observationData, source: "cache" };
    }
    observationData = await this.fetchRecentObservations;
    cacheService.set(regionCode, observationData);
    return { data: observationData, source: "api" };
  }

  fetchRecentObservations(regionCode) {
    const options = {
      headers: { "X-eBirdApiToken": API_KEY },
    };
    return new Promise((resolve, reject) => {
      const ebirdUrl = `https://api.ebird.org/v2/data/obs/${regionCode}/recent`;
      https
        .get(ebirdUrl, options, (resp) => {
          let data = "";
          resp.on("data", (chunk) => {
            data += chunk;
          });
          resp.on("end", () => {
            const ebirdData = JSON.parse(data);
            resolve(ebirdData);
          });
        })
        .on("error", (err) => {
          reject("Error fetching data from ebird");
        });
    });
  }
}
module.exports = new myapiService();
