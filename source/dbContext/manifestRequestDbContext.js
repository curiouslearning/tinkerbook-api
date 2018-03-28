const db = require('../util/db');

class ManifestRequestDbContext
{
    ManifestRequest(ipAddress, fileRequested) {
        return new Promise((resolve, reject) => {
            db.pool.query('CALL tinkrbook_api_manifest_request(?, ?)',
                [ipAddress, fileRequested],
                (err, results) => {
                    if (err) {
                        reject({"error" : err.message});
                    }
                    else resolve(results);
            });
        });
    }
}

module.exports = ManifestRequestDbContext;
