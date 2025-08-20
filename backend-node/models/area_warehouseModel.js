const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define(
        "Area_Warehouse",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: { type: DataTypes.STRING(255), allowNull: false },
            type: {
                type: DataTypes.ENUM("high", "medium", "low"),
                allowNull: false,
                defaultValue: "medium",
            },
            date_default: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            date_optional: { type: DataTypes.DATE },
            description: { type: DataTypes.TEXT },
            warehouse_class_id: { type: DataTypes.INTEGER },
            area_id: { type: DataTypes.INTEGER },
        },
        { tableName: "Area_Warehouse", timestamps: false }
    );
};
