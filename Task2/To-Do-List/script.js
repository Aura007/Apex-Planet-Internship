const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Function to add a new task
addBtn.addEventListener("click", function() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create new <li>
  const li = document.createElement("li");
  li.textContent = taskText;

  // Toggle completed on click
  li.addEventListener("click", function() {
    li.classList.toggle("completed");
  });

  // Create delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("delete-btn");

  delBtn.addEventListener("click", function() {
    li.remove();
  });

  // Append button inside li
  li.appendChild(delBtn);

  // Append li to list
  taskList.appendChild(li);

  // Clear input
  taskInput.value = "";
});

// Allow pressing Enter to add task
taskInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addBtn.click();
  }
});
