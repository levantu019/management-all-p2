const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define(
        "Target_Category",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            target_id: { type: DataTypes.INTEGER, allowNull: false },
            category_id: { type: DataTypes.INTEGER, allowNull: false },
        },
        { tableName: "Target_Category", timestamps: false }
    );
};
