// This file just does a GET request to figure out which user is logged in
// and updates the HTML on the page
$(document).ready(function () {
  const itemName = $("#item");
  const itemList = $("tbody");
  const itemQuantity = $("#quantity");
  const itemPrice = $("#price");
  const itemDescription = $("#body");
  const submitBtn = $("#submit");
  const invTable = $("#inventoryTable");
  let items;
  $(document).on("update", "#update-item", handleAuthorFormSubmit);
  getItems();
  $(document).on("click", ".delete-item", handleDeleteButtonPress);

  function handleAuthorFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!itemName.val().trim().trim()) {
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertItem({
      items: itemName
        .val()
        .trim()
    });
  }  

  function upsertItem(user) {
    $.post("/api/users", user)
      .then(getItems) => res.send();
  }




  function addBody(data) {
    var newTr = $("<tr>");
    newTr.append("<td>"+ data.name +"</td>");
    newTr.append("<td>" +data.quantity+"</td>");
    newTr.append("<td>" + data.price +"</td>");
    newTr.append("<td>"+data.body +"</td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Item</a></td>");
    return newTr;
  }

