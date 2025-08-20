const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define(
        "Information",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: { type: DataTypes.STRING(255), allowNull: false },
            date_default: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            date_optional: { type: DataTypes.DATE },
            description: { type: DataTypes.TEXT },
            coordinate: { type: DataTypes.GEOMETRY("POINT", 4326) },
            boundary: { type: DataTypes.GEOMETRY("POLYGON", 4326) },
            information_class_id: { type: DataTypes.INTEGER },
            target_id: { type: DataTypes.INTEGER },
            category_id: { type: DataTypes.INTEGER },
        },
        { tableName: "Information", timestamps: false }
    );
};
