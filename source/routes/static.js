const express = require('express'),
      router = express.Router(),
      fs = require('fs'),
      path = require('path'),
      ip = require('ip'),
      ManifestRequestRepository = require('../repository/manifestRequest');

router.get('/manifest/v1/manifest', (req, res) => {
    // node currently throws error if file isnt found

    let jsonPath = path.join(__dirname, '../../public/v1/example_tinkr_manifest.json');
    let readManifest = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    // using req alternatively we can pass jsonPath or filePath in for local path
    return new ManifestRequestRepository().ManifestRequest(ip.address(), req.originalUrl).then(()=>{
        res.json(readManifest)
    });
});

router.get('/manifest/v1/cdn/my_first_grade_tinkr_book-1.rtf', (req, res) => {
    let filePath = path.join(__dirname, '../../public/v1/cdn/my_first_grade_tinkr_book-1.rtf');
    // using req alternatively we can pass jsonPath or filePath in for local path
    return new ManifestRequestRepository().ManifestRequest(ip.address(), req.originalUrl).then(()=>{
        // node currently throws error if file isnt found
        res.send(fs.readFileSync(filePath, 'utf8'))

        /*
            alternatively we can use res.download to download instead of showing raw rtf code or
            writing something complex to parse it
         */
    });
});

module.exports = router;
