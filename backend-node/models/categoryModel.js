const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define(
        "Category",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: { type: DataTypes.STRING(255), allowNull: false },
            information: { type: DataTypes.TEXT },
            category_id: { type: DataTypes.INTEGER },
            area_id: { type: DataTypes.INTEGER },
        },
        { tableName: "Category", timestamps: false }
    );
};
