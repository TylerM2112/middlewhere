module.exports = {
    //Yelp API Search Call using passed in middlepoint.
    search: (req, res) => {
        const yelp = require('yelp-fusion');
        const client = yelp.client(process.env.YELP_APIKEY);
      
        client.search({
            term: '',
            radius: 40000,
            limit: 50,
            offset: 51,
            sort_by: "distance",
            latitude: `${+req.body.middlepoint[0]}`,
            longitude: `${+req.body.middlepoint[1]}`,
            
        })
        .then(response => { res.status(200).json(response.jsonBody) })
        .catch(err => {
            console.log("yelpController.search",err);
            res.status(500).send(err);
          });
     }
}