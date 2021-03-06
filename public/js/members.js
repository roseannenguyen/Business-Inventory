$(document).ready(() => {
  const itemName = $("#item");
  const itemQuantity = $("#quantity");
  const itemPrice = $("#price");
  const itemDescription = $("#body");
  const submitBtn = $("#submit");
  const invTable = $("tbody");

  $("#submit").show();
  $("#save-edit").hide();
  $("#tableHeader").show();

  function getItems() {
    invTable.empty();
    $.get("/api/items", data => {
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        addBody(element);
      }
    });
  }

  $(document).on("click", ".edit-item", handlePostEdit);
  $(document).on("click", ".delete-item", handlePostDelete);

  function addBody(data) {
    const newTr = $("<tr>");
    $(newTr).attr("data-id", data.id);
    console.log(data);
    newTr.append("<td>" + data.name + "</td>");
    newTr.append("<td>" + data.quantity + "</td>");
    newTr.append("<td>" + "$" + data.price + "</td>");
    newTr.append("<td>" + data.body + "</td>");
    newTr.append(
      "<td class='hidden-print'><a style='cursor:pointer;color:green' role='button' class ='edit-item'>Edit Item</a></td>"
    );
    newTr.append(
      "<td class='hidden-print'><a style='cursor:pointer;color:red' role='button' class ='delete-item'>Delete Item</a></td>"
    );
    invTable.append(newTr);
    return newTr;
  }

  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.business_name);
  });
  function getItems() {
    invTable.empty();
    $.get("/api/items", data => {
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
    }).then(() => {
      getItems();
      clearForm();
    });
  });

  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/items/" + id
    }).then(() => {
      getItems();
    });
  }

  function handlePostDelete() {
    const currentItem = $(this)
      .parent()
      .parent()
      .data("id");
    deletePost(currentItem);
  }

  function handlePostEdit() {
    const currentItems = $(this)
      .parent()
      .parent()
      .data("id");

    editPost(currentItems);
  }

  function editPost(id) {
    $("#submit").hide();
    $("#save-edit").show();
    $("#save-edit").attr("data-id", id);
    const item = $(`tr[data-id='${id}'] td:nth-child(1)`).text();
    const quantity = $(`tr[data-id='${id}'] td:nth-child(2)`).text();
    const price = $(`tr[data-id='${id}'] td:nth-child(3)`).text();
    const body = $(`tr[data-id='${id}'] td:nth-child(4)`).text();
    console.log(price);
    $("#item").val(item);
    $("#quantity").val(quantity);
    $("#price").val(price.slice(1));
    $("#body").val(body);
  }

  $("#save-edit").on("click", function(e) {
    e.preventDefault();
    console.log("edit submtted", $(this));
    $.ajax({
      type: "PUT",
      url: "/api/items/" + $(this).data("id"),
      contentType: "application/json",
      data: JSON.stringify({
        name: itemName.val().trim(),
        quantity: itemQuantity.val().trim(),
        price: itemPrice.val().trim(),
        body: itemDescription.val().trim()
      })
    }).then(() => {
      getItems();
      clearForm();
      location.reload();
    });
  });

  function clearForm() {
    itemName.val("");
    itemQuantity.val("");
    itemPrice.val("");
    itemDescription.val("");
  }

  getItems();
});
