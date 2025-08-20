const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define(
        "Warehouse_class",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: { type: DataTypes.STRING(255), allowNull: false },
            description: { type: DataTypes.TEXT },
        },
        { tableName: "Warehouse_class", timestamps: false }
    );
};
