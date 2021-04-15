// LocalStorage
var checkLocStor = localStorage;

// New Checklist Button
function newCheckList() {
  document.getElementById("newCheckListBox").classList.toggle("showGrid");
}
// Add an event listener to hide newChecklistbox when mouse is clicked
// outside of the box.

//Load checkListArray local storage and print array in check list panel - check list.
var checkListArray = [];
function newCheckListItem() {
  //set up the conditions of what the check list name can be
  let checkListName = document.getElementById("checkListTxtBoxID").value;
  let checkRegExp = /\s/;
  let conditionalOne =
    checkListName === "" || checkRegExp.exec(checkListName) !== null; // Create an regexp array that covers whitespace and no repeating checkListNames
  let conditionalTwo = checkListArray.includes(checkListName);
  //DOM requirements
  let checkUl = document.getElementById("checkListUl");
  let checkLi = document.createElement("li");
  //begin the actual function
  if (conditionalOne) {
    window.alert(
      "Please choose another name. Only complete words with no spaces are accepted."
    );
  } else if (conditionalTwo) {
    window.alert(
      "There is already a list with that name. Please choose another."
    );
  } else {
    checkListArray.push(checkListName);
    checkUl.appendChild(checkLi);
    checkLi.classList.add("checkLi");
    checkLi.innerText = checkListName;
    //"show" the currently highlighted checkList
    if (checkListArray.length > 1) {
      let checkListId = document.getElementById("checkListUl");
      let checkHighlight = checkListId.getElementsByClassName("checkLi");
      let checkLength = checkListArray.length - 1;
      for (let i = 0; i < checkHighlight.length; i++) {
        checkHighlight[i].classList.remove("currentList");
      }
      //getElementsByClassName only shows a list of the matching elements, not the element itself
      //We use [] to specify which of the matching elements to work on
      //.length begins from 1, so -1 from checkListArray will match the integer for checkHighLight array.
      checkHighlight[checkLength].classList.add("currentList");
    } else {
      checkLi.classList.add("currentList");
    }
    //clear the contents of the checkListTxtBox and hide it again
    document.getElementById("checkListTxtBoxID").value = "";
    document.getElementById("newCheckListBox").classList.remove("showGrid");
    //Call active() function
    active();
  }
}
function active() {
  let checkListId = document.getElementById("checkListUl");
  let checkHighlight = checkListId.getElementsByClassName("checkLi");
  for (let i = 0; i < checkHighlight.length; i++) {
    checkHighlight[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("currentList");
      if (current.length > 0) {
        current[0].className = current[0].className.replace(
          " currentList",
          ""
        );
      }
      this.className += " currentList";
    });
  }
}