module.exports = function(sequelize, DataTypes) {
    var Inventory = sequelize.define("Inventory", {
        createdAt: {
            type: DataTypes.DATE(3),
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
            field: 'created_at',
          },
          updatedAt: {
            type: DataTypes.DATE(3),
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
            field: 'updated_at',
          },
    }, {
        freezeTableName: true
    });

     Inventory.associate = function(models) {
            Inventory.belongsTo(models.User, {
                foreignKey: {
                    allowNull: false
                }
            }),
        Inventory.belongsTo(models.Item, {
            foreignKey: {
                allowNull: false
            }
        });
    }


 return Inventory;
}