const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define(
        "Image",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: { type: DataTypes.STRING(255) },
            datetime: { type: DataTypes.DATE, allowNull: false },
            resolution: { type: DataTypes.STRING(100) },
            description: { type: DataTypes.TEXT },
            target_id: { type: DataTypes.INTEGER },
        },
        { tableName: "Image", timestamps: false }
    );
};
