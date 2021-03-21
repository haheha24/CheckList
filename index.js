// New Checklist Button
function newCheckList() {
  document.getElementById("newCheckListBox").classList.toggle("showGrid");
}
// function hideNewCheckList() {
//  document.getElementById("newCheckListBox").addEventListener("click", myFunction);
// }
      // Add an event listener to hide newChecklistbox when mouse is clicked
      // outside of the box.

// Add a new Check list item under Check List Panel inside div checkList
// var inputEvent = input.addEventListener
function newCheckListItem() {
  let checkListName = document.getElementById("checkListTxtBoxID").value;
  let checkUl = document.getElementById("checkListUl");
  let checkLi = document.createElement("li");
  let checkA = document.createElement("a");
  let checkRegExp = (/\s/); // Create an regexp array that covers whitespace and
                            // no repeating checkListNames
  if (checkListName === "" || checkRegExp.exec(checkListName) !== null) {
    window.alert("Please choose another name")
  } else {
      checkUl.appendChild(checkLi);
      checkLi.classList.add("checkLi");
      checkLi.appendChild(checkA);
      checkA.innerHTML = checkListName;
      // set the attribute of checkA to whatever the main content is dynamically
  }
}
