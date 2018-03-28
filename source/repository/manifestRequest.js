const ManifestRequestDbContext = require('../dbContext/manifestRequestDbContext');


class ManifestRequestRepository
{
   ManifestRequest(ipAddress, fileRequested)
    {
        return new Promise((resolve, reject) => {
           return new ManifestRequestDbContext().ManifestRequest(ipAddress, fileRequested)
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    console.error(err);
                    reject(err);
                });
        });
    }
}
module.exports = ManifestRequestRepository;
