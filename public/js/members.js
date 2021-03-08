$(document).ready(function () {
  const itemName = $("#item");
  const itemQuantity = $("#quantity");
  const itemPrice = $("#price");
  const itemDescription = $("#body");
  const submitBtn = $("#submit");
  const invTable = $("tbody");

  $('#submit').show();
  $('#save-edit').hide()
  $('#tableHeader').show()

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
    let newTr = $("<tr>");
    $(newTr).attr("data-id", data.id);
    console.log(data)
    newTr.append("<td>" + data.name + "</td>");
    newTr.append("<td>" + data.quantity + "</td>");
    newTr.append("<td>" + data.price + "</td>");
    newTr.append("<td>" + data.body + "</td>");
    newTr.append("<td class='hidden-print'><a style='cursor:pointer;color:green' role='button' class ='edit-item'>Edit Item</a></td>");
    newTr.append("<td class='hidden-print'><a style='cursor:pointer;color:red' role='button' class ='delete-item'>Delete Item</a></td>");
    invTable.append(newTr)
    return newTr;
  }

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
    let currentItem = $(this)
      .parent()
      .parent()
      .data("id");
    deletePost(currentItem);
  }


  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    let currentItems = $(this)
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
    let item = $(`tr[data-id='${id}'] td:nth-child(1)`).text();
    let quantity = $(`tr[data-id='${id}'] td:nth-child(2)`).text();
    let price = $(`tr[data-id='${id}'] td:nth-child(3)`).text();
    let body = $(`tr[data-id='${id}'] td:nth-child(4)`).text();
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

 
  getItems();
  
  var taskInput = document.getElementById("new-task"); //new-task
  var addButton = document.getElementsByTagName("button")[0]; //first button
  var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
  var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

  //New Task List Item
  var createNewTaskElement = function (taskString) {
    //Create List Item
    var listItem = document.createElement("li");

    //input (checkbox)
    var checkBox = document.createElement("input"); // checkbox
    //label
    var label = document.createElement("label");
    //input (text)
    var editInput = document.createElement("input"); // text
    //button.edit
    var editButton = document.createElement("button");
    //button.delete
    var deleteButton = document.createElement("button");

    //Each element needs modifying

    checkBox.type = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    label.innerText = taskString;

    //Each element needs appending
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
  }

  //Add a new task
  var addTask = function () {
    console.log("Add task...");
    //Create a new list item with the text from #new-task:
    var listItem = createNewTaskElement(taskInput.value);
    //Append listItem to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
  }

  //Edit an existing task
  var editTask = function () {
    console.log("Edit task...");

    var listItem = this.parentNode;

    var editInput = listItem.querySelector("input[type=text");
    var label = listItem.querySelector("label");

    var containsClass = listItem.classList.contains("editMode");

    //if the class of the parent is .editMode
    if (containsClass) {
      //Switch from .editMode
      //label text become the input's value
      label.innerText = editInput.value;
    } else {
      //Switch to .editMode
      //input value becomes the label's text
      editInput.value = label.innerText;
    }

    //Toggle .editMode on the list item
    listItem.classList.toggle("editMode");

  }

  //Delete an existing task
  var deleteTask = function () {
    console.log("Delete task...");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;

    //Remove the parent list item from the ul
    ul.removeChild(listItem);
  }

  //Mark a task as complete
  var taskCompleted = function () {
    console.log("Task complete...");
    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
  }

  //Mark a task as incomplete
  var taskIncomplete = function () {
    console.log("Task incomplete...");
    //Append the task list item to the #incomplete-tasks
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
  }

  var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("Bind list item events");
    //select taskListItem's children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

    //bind editTask to edit button
    editButton.onclick = editTask;

    //bind deleteTask to delete button
    deleteButton.onclick = deleteTask;

    //bind checkBoxEventHandler to checkbox
    checkBox.onchange = checkBoxEventHandler;
  }



  //Set the click handler to the addTask function
  addButton.addEventListener("click", addTask);
  //addButton.addEventListener("click", ajaxRequest);

  //cycle over incompleteTasksHolder ul list items
  for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    //bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
  }

  //cycle over completedTasksHolder ul list items
  for (var i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list item's children (taskIncomplete)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
  }

});

