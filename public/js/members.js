$(document).ready(function () {
  const itemName = $("#item");
  const itemQuantity = $("#quantity");
  const itemPrice = $("#price");
  const itemDescription = $("#body");
  const submitBtn = $("#submit");
  const invTable = $("#inventoryTable");
  const editEl = $("#edit-item");
  const deleteEl = $("#delete-item");

  $('#submit').show();
  $('#save-edit').hide()

  function getItems() {
    invTable.empty();
    $.get("/api/items", function (data) {
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        addBody(element);

      }
    });

  }


  $(document).on("click", ".edit-item", handlePostEdit);
  $(document).on("click", ".delete-item", handlePostDelete);

  function addBody(data) {
    var newTr = $("<tr>");
    $(newTr).attr("data-id", data.id);
    console.log(data)
    newTr.append("<td>" + data.name + "</td>");
    newTr.append("<td>" + data.quantity + "</td>");
    newTr.append("<td>" + data.price + "</td>");
    newTr.append("<td>" + data.body + "</td>");
    newTr.append("<td><a style='cursor:pointer;color:green' class ='edit-item'>Edit Item</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class ='delete-item'>Delete Item</a></td>");
    invTable.append(newTr)
    return newTr;
  }

  // save button

  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.business_name);
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

  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/items/" + id
    })
      .then(function () {
        getItems();
      });
  }

  function handlePostDelete() {
    var currentItem = $(this)
      .parent()
      .parent()
      .data("id");
    deletePost(currentItem);
  }


  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    var currentItems = $(this)
      .parent()
      .parent()
      .data("id");
    // window.location.href = "/api/items/?id=" + currentItems;
    editPost(currentItems);
  }

  function editPost(id) {
    $('#submit').hide();
    $('#save-edit').show();
    $('#save-edit').attr('data-id', id);
    var item = $(`tr[data-id='${id}'] td:nth-child(1)`).text();
    var quantity = $(`tr[data-id='${id}'] td:nth-child(2)`).text();
    var price = $(`tr[data-id='${id}'] td:nth-child(3)`).text();
    var body = $(`tr[data-id='${id}'] td:nth-child(4)`).text();
    $('#item').val(item);
    $('#quantity').val(quantity);
    $('#price').val(price);
    $('#body').val(body);

  }

  $('#save-edit').on('click', function (e) {
    e.preventDefault();
    console.log('edit submtted', $(this))
    $.ajax(
      {
        type: "PUT",
        url: "/api/items/" + $(this).data('id'),
        contentType: 'application/json',
        data: JSON.stringify({
          name: itemName.val().trim(),
          quantity: itemQuantity.val().trim(),
          price: itemPrice.val().trim(),
          body: itemDescription.val().trim()
        })
      })
      .then(function () {
        getItems();
        clearForm();
        location.reload();
      });
  })

  function clearForm() {
    itemName.val('')
    itemQuantity.val('')
    itemPrice.val('')
    itemDescription.val('')
  }

  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/items",
      data: post
    })
      .then(function() {
        window.location.href = "/members";
      });
  }
  getItems();


});
