const settings = {
    defaults: {
        // database: {
        //     host: "qa.criol67pfjrn.us-west-2.rds.amazonaws.com",
        //     user: "tablet_api",
        //     password: "cF6xPbQX2x8G2qB",
        //     database: "tms"
        // }
        database: {
            host: "glpprimaryinstance.criol67pfjrn.us-west-2.rds.amazonaws.com",
            user: "terwin",
            password: "hnRKTJpNDP4ZCYL",
            database: "development_tablet_connection_config"
        }
    }
};

module.exports = Object.assign({}, settings.defaults, settings[process.env.NODE_ENV]);