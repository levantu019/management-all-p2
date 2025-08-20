const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    return sequelize.define(
        "File_Store",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            file: { type: DataTypes.STRING(500), allowNull: false },
            area_warehouse_id: { type: DataTypes.INTEGER },
            category_warehouse_id: { type: DataTypes.INTEGER },
            target_warehouse_id: { type: DataTypes.INTEGER },
            information_id: { type: DataTypes.INTEGER },
            image_id: { type: DataTypes.INTEGER },
        },
        { tableName: "File_Store", timestamps: false }
    );
};
