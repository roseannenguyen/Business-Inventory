// This file just does a GET request to figure out which user is logged in
// and updates the HTML on the page
// $.get("/api/user_data").then(data => {
//   $(".member-name").text(data.email);
// });

$(document).ready(function () {

  $('.close').on('click', function (e) {
    e.preventDefault();
    $(this).parent().parent().remove();
  });

  $('#submit').click(function () {
    var item = $('input[name=item]').val();
    var quantity = $('input[name=quantity]').val();
    var price = $('input[name=price]').val();
    var description = $('input[name=description]').val();

    var tr = "<tr>\
                    <td>\
                     <h2> " + item + "</h2>\
                    </td>\
                  <td>\
                                    <h2> " + quantity + "</h2>\
                    </td>\
                    <td>\
                                    <h2> $" + price + "</h2>\
                    </td>\
                    \
                    <td>\
                    <button class=\"edit\" title=\"Edit\" data-toggle=\"tooltip\"><i class=\"material-icons\">"+"</i></button>\
     <button class=\"delete\" title=\"Delete\" data-toggle=\"tooltip\"> <i class=\"material-icons\">"+"</i></button>\
<button type=\"button\" class=\"close\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>\
<textarea placeholder=\"Optional Description of Item\">" + description + "</textarea>\
                    </td>\
                </tr>;";
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