const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define(
        "Report",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: { type: DataTypes.STRING(255), allowNull: false },
            date: { type: DataTypes.DATE, allowNull: false },
            number: { type: DataTypes.STRING(100), allowNull: false },
            account_id: { type: DataTypes.INTEGER },
            target_id: { type: DataTypes.INTEGER },
            category_id: { type: DataTypes.INTEGER },
        },
        { tableName: "Report", timestamps: false }
    );
};
