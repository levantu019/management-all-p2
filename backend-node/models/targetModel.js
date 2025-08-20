const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define(
        "Target",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: { type: DataTypes.STRING(255), allowNull: false },
            coordinate: { type: DataTypes.GEOMETRY("POINT", 4326) },
            boundary: { type: DataTypes.GEOMETRY("POLYGON", 4326) },
            date_created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
            type: {
                type: DataTypes.ENUM("static", "dynamic", "other"),
                allowNull: false,
            },
            icon: { type: DataTypes.STRING(255) },
            general_information: { type: DataTypes.TEXT },
            target_id: { type: DataTypes.INTEGER },
        },
        { tableName: "Target", timestamps: false }
    );
};
