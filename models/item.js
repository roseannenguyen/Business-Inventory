const inventory = require("./inventory");

module.exports = function(sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            len: [1]
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            len: [1]
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        createdAt: {
            type: DataTypes.DATE(3),
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
            field: 'created_at',
          },
          updatedAt: {
            type: DataTypes.DATE(3),
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
            field: 'updated_at',
          },
    }, {
        freezeTableName: true
    });

    // Item.associate = function(models) {
    //     Item.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };
    return Item;
}