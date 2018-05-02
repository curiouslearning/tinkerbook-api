const express = require('express'),
      router = express.Router(),
      fs = require('fs'),
      path = require('path'),
      ip = require('ip'),
      ManifestRequestRepository = require('../repository/manifestRequest'),
      request = require('request-promise'),
      settings = require('../settings'),
      isNil = require('lodash/isNil');

router.get('/manifest/v1/manifest', (req, res) => {
    // node currently throws error if file isnt found

    let jsonPath = path.join(__dirname, '../../public/v1/example_tinkr_manifest.json');
    let readManifest = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    // using req alternatively we can pass jsonPath or filePath in for local path
    return new ManifestRequestRepository().ManifestRequest(ip.address(), req.originalUrl).then(()=>{
        res.json(readManifest)
    });
});

router.get('/manifest/v1/cdn/tinkerbook-maniefst', async (req, res) => {

    try {
        await ManifestRequestRepository().ManifestRequest(ip.address(), req.originalUrl);
    } catch(err) {
        console.log(err);
    }

    let options = {
        uri: settings.tinkrbookManifestEndpoint,
        json: true
    };

    const results = await request(options);

    if(isNil(results)) return res.send({error: 'Unable to get manifest from CDN'});

    return res.send(results);
});

module.exports = router;
