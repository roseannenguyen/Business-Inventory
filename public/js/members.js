// This file just does a GET request to figure out which user is logged in
// and updates the HTML on the page
const itemName = $("#item");
const itemQuantity = $("#quantity");
const itemPrice = $("#price");
const itemDescription = $("#body");
const submitBtn = $("#submit");
var invTable = $("#inventoryTable");
function addBody(data) {
var tr = `<tr>\
                    <td>\
                     <h2>${data.name}</h2>\
                    </td>\
                  <td>\
                                    <h2>${data.quantity}</h2>\
                    </td>\
                    <td>\
                                    <h2>${data.price}</h2>\
                    </td>\
                    \
                    <td>\
<button type=\"button\" class=\"close\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\
<textarea placeholder=\"Optional Description of Item\">${data.body}</textarea>\
                    </td>\
                </tr>`;
                invTable.append(tr);
                return tr;
}

$.get("/api/user_data").then(data => {
  $(".member-name").text(data.email);
});

$.get("/api/items", function(data) {
for (let i = 0; i < data.length; i++) {
  const element = data[i];
  addBody(element);
  
}
});

submitBtn.on("click", event => {
$.post("/api/items", {
  name: itemName.val().trim(),
  quantity: itemQuantity.val().trim(),
  price: itemPrice.val().trim(),
  body:itemDescription.val().trim()
});
})

$(document).ready(function () {

  $('.close').on('click', function (e) {
    e.preventDefault();
    $(this).parent().parent().remove();
  });

  $('#submit').click(function () {
    var item = $('input[name=item]').val();
    var quantity = $('input[name=quantity]').val();
    var price = $('input[name=price]').val();
    var body = $('input[name=body]').val();

    
    $('#table tbody').append(tr);

    $("input[type=text]").val("");
    $("input[type=number]").val("");

  });
});

$(function () {
  $('#orderModal').modal({
    keyboard: true,
    backdrop: "static",
    show: false,

  }).on('show', function () {
    var getIdFromRow = $(event.target).closest('tr').data('id');
    //make your ajax call populate items or what even you need
    $(this).find('#orderDetails').html($('<b> Order Id selected: ' + getIdFromRow + '</b>'))
  });
});
