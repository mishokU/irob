module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        profileId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });

    return Role;
};