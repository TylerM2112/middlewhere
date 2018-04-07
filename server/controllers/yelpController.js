module.exports = {
    //Yelp API Search Call using passed in middlepoint.
    search: (req, res) => {
        console.log("HELP")
        
        const yelp = require('yelp-fusion');
        const client = yelp.client(process.env.YELP_APIKEY);
        client.search({
            term: '',
            radius: 40000,
            latitude: `${+req.body.middlepoint[0]}`,
            longitude: `${+req.body.middlepoint[1]}`,
            
        }).then(response => {
            // console.log(response.jsonBody)
            res.status(200).json(response.jsonBody);
        }).catch(error => {
            console.log("Yelp API Error", error);
          });
     }
}