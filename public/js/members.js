// This file just does a GET request to figure out which user is logged in
// and updates the HTML on the page
// $.get("/api/user_data").then(data => {
//   $(".member-name").text(data.email);
// });

// $(document).ready(function () {

//   $('.close').on('click', function (e) {
//     e.preventDefault();
//     $(this).parent().parent().remove();
//   });

//   $('#submit').click(function () {
//     var item = $('input[name=item]').val();
//     var quantity = $('input[name=quantity]').val();
//     var price = $('input[name=price]').val();
//     var body = $('input[name=body]').val();

//     var tr = "<tr>\
//                     <td>\
//                      <h2> " + item + "</h2>\
//                     </td>\
//                   <td>\
//                                     <h2> " + quantity + "</h2>\
//                     </td>\
//                     <td>\
//                                     <h2> $" + price + "</h2>\
//                     </td>\
//                     \
//                     <td>\
// <button type=\"button\" class=\"close\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\
// <textarea placeholder=\"Optional Description of Item\">" + body + "</textarea>\
//                     </td>\
//                 </tr>;";
//     $('#table tbody').append(tr);

//     $("input[type=text]").val("");
//     $("input[type=number]").val("");

//   });
// });

// $(function () {
//   $('#orderModal').modal({
//     keyboard: true,
//     backdrop: "static",
//     show: false,

//   }).on('show', function () {
//     var getIdFromRow = $(event.target).closest('tr').data('id');
//     //make your ajax call populate items or what even you need
//     $(this).find('#orderDetails').html($('<b> Order Id selected: ' + getIdFromRow + '</b>'))
//   });
// });

window.onhashchange = function() {
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