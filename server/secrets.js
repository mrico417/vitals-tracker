module.exports = {
    jwtSecret: process.env.JWT_SECRET || "hellofromtheweb!",
    dataAdminSecret: process.env.DATA_ADMIN_SECRET || "youcannotknow$"
};
