// This file just does a GET request to figure out which user is logged in
// and updates the HTML on the page
const itemName = $("#item");
const itemQuantity = $("#quantity");
const itemPrice = $("#price");
const itemDescription = $("#body");
const submitBtn = $("#submit");

$.get("/api/user_data").then(data => {
  $(".member-name").text(data.email);
});

submitBtn.on("click", event => {
  $.post("/api/items", {
    name: itemName.val().trim(),
    quantity: itemQuantity.val().trim(),
    price: itemPrice.val().trim(),
    body: itemDescription.val().trim()
  });
})


window.onhashchange = function () {
  update();
};

document.getElementById('download-btn').onclick = function () {
  update(true);
};
function update(shouldDownload) {
  var funcStr = window.location.hash.replace(/#/g, '') || 'basic';
  var doc = window.examples[funcStr]();

  doc.setProperties({
    title: 'Example: ' + funcStr,
    subject: 'A jspdf-autotable example pdf (' + funcStr + ')'
  });

  if (shouldDownload) {
    doc.save('table.pdf');
  } else {
    //document.getElementById("output").src = doc.output('datauristring');
    document.getElementById("output").data = doc.output('datauristring');
  }
};