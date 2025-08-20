const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define(
        "Account",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: { type: DataTypes.STRING(100), allowNull: false },
            position: { type: DataTypes.STRING(100) },
            username: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
            },
            password: { type: DataTypes.STRING(255), allowNull: false },
        },
        { tableName: "Account", timestamps: false }
    );
};
