USE business_inventory;

INSERT INTO item (name, quantity, price, body)
VALUES ("Apple", 3, 5, "Great Apple");

INSERT INTO user (email, password)
VALUES ("Jalexarroyo@gmail.com", "123");

INSERT INTO inventory (UserId, ItemId)
VALUES (1,1);

INSERT INTO item (name, quantity, price, body)
VALUES ("Banana", 2, 4, "Great Banana");

INSERT INTO user (email, password)
VALUES ("@gmail.com", "1234");

INSERT INTO inventory (UserId, ItemId)
VALUES (2,2)

SELECT item.name, item.quantity
FROM item
INNER JOIN inventory
ON item.id = inventory.ItemId
INNER JOIN user
ON user.id = inventory.UserId
WHERE user.id = 2