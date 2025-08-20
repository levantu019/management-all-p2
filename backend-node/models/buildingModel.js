const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define(
        "Building",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: { type: DataTypes.STRING(255), allowNull: false },
            coordinate: { type: DataTypes.GEOMETRY("POINT", 4326) },
            description: { type: DataTypes.TEXT },
            target_id: { type: DataTypes.INTEGER },
        },
        { tableName: "Building", timestamps: false }
    );
};
