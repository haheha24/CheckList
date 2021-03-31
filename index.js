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


//Load checkListArray local storage and print array in check list panel - check list.
var checkListArray = [];

//
function newCheckListItem() {
  //set up the conditions of what the check list name can be
  let checkListName = document.getElementById("checkListTxtBoxID").value;
  let checkRegExp = (/\s/);
  let conditionalOne = checkListName === "" || checkRegExp.exec(checkListName) !== null; // Create an regexp array that covers whitespace and no repeating checkListNames
  let conditionalTwo = checkListArray.includes(checkListName);  
  //DOM requirements
  let checkUl = document.getElementById("checkListUl");
  let checkLi = document.createElement("li");
  let checkA = document.createElement("a");
  //begin the actual function
  if (conditionalOne) {
    window.alert("Please choose another name. Only complete words with no spaces are accepted.")
  } else if (conditionalTwo) {
    window.alert("There is already a list with that name")
  } else {
    checkListArray.push(checkListName);
    console.log(checkListArray);
    checkUl.appendChild(checkLi);
    checkLi.classList.add("checkLi");
    checkLi.appendChild(checkA);
    checkA.innerHTML = checkListName;
    checkA.setAttribute("href", "#");
    
    //clear the contents of the checkListTxtBox
    document.getElementById("checkListTxtBoxID").value = "";
    document.getElementById("newCheckListBox").classList.remove("showGrid");
/* 
          COMMIT AND ADD NOTES ABOUT CONDITIONALS, CHANGES TO THE IF FUNCTIONS, REMOVAL OF TXT AND HIDING THE BOX
*/
    // set the attribute of checkA to whatever the main content is dynamically
  }
  var checkLocStor = localStorage;
}

