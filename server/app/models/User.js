


module.exports = (sequelize, DataTypes) => {
    return sequelize.define("user", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            isEmail: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING
        },
        photoUrl: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};