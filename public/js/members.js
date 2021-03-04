$(document).ready(function () {

  const itemName = $("#item");
  const itemQuantity = $("#quantity");
  const itemPrice = $("#price");
  const itemDescription = $("#body");
  const submitBtn = $("#submit");
  const invTable = $("#inventoryTable");

  $(document).on("click", ".edit-item", handlePostEdit);
  $(document).on("click", ".delete-item", handleDeleteButtonPress);

  function addBody(data) {
    var newTr = $("<tr>");
    newTr.append("<td>" + data.name + "</td>");
    newTr.append("<td>" + data.quantity + "</td>");
    newTr.append("<td>" + data.price + "</td>");
    newTr.append("<td>" + data.body + "</td>");
    newTr.append("<td><a style='cursor:pointer;color:green' class='edit-item'>Edit Item</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-item'>Delete Item</a></td>");
    invTable.append(newTr)
    return newTr;
  }

  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
  function getItems() {
    invTable.empty();
    $.get("/api/items", function (data) {
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        addBody(element);

      }
    });
  }

  submitBtn.on("click", event => {
    event.preventDefault();
    $.post("/api/items", {
      name: itemName.val().trim(),
      quantity: itemQuantity.val().trim(),
      price: itemPrice.val().trim(),
      body: itemDescription.val().trim()
    }).then(getItems);
  });

  function handleDeleteButtonPress(data) {
    var data = $(this).parent("td").parent("tr").data("items");
    var id = data.id;
    $.ajax({
      method: "DELETE",
      url: "/api/items/" + id
    })
      .then(getItems)
  }

  function handlePostEdit(ItemId) {
    var items = $(this)
      .parent()
      .parent()
      .data("items");
    window.location.href = "/api/item/id=" + items.id;
  }

  getItems();


});
