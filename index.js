//Load up window level variables
var checkListArray = [];

//load up localStorage
document.addEventListener("DOMContentLoaded", function localStorageList() {
  if (localStorage.getItem("localArray") !== null) {
    //DOM requirements
    let checkLi = "";
    let checkUl = document.getElementById("checkListUl");
    checkListArray = JSON.parse(localStorage.getItem("localArray"));

    //setup li string for each array item, then add them all to ul.
    checkListArray.forEach(function (checklist) {
      checkLi += '<li class="checkLi">' + checklist + "</li>";
    });
    checkUl.innerHTML = checkLi;

    //activate the highlight function
    active();
  } else if (localStorage.getItem("localArray") == null) {
    localStorage.setItem("localArray", checkListArray);
  }
});

//Call active() function to highlight the currently clicked list item
function active() {
  let checkUl = document.getElementById("checkListUl");
  let checkHighlight = checkUl.getElementsByClassName("checkLi");
  for (let i = 0; i < checkHighlight.length; i++) {
    checkHighlight[i].addEventListener("click", function () {
      let current = document.getElementsByClassName("currentList");
      if (current.length > 0) {
        current[0].className = current[0].className.replace(" currentList", "");
      }
      this.className += " currentList";
    });
  }

  //Dynamically change the #main title to whatever is highlighted with the currentList class
  function dynamicTitle() {
    let checkCurrent = document.getElementById("checkListUl").getElementsByClassName("currentList")[0];
      checkCurrent.addEventListener("click", function () {
        let listItem = document.querySelector(".currentList").innerText;
        let title = document.getElementById("checkListTitle");
        title.innerText = listItem;
      });
  }
  //activate the dynamic function
  dynamicTitle();
}

// New Checklist Button
function newCheckList() {
  let newCheckListBox = document.getElementById("newCheckListBox");
  let checkText = document.getElementById("checkListTxtBoxID");
  checkText.value = "";
  newCheckListBox.classList.toggle("showGrid");
}

//Function to add new check lists
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
  let checkTitle = document.getElementById("checkListTitle");

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
    checkTitle.innerText = checkListName;

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

    // LocalStorage to save current checkList
    function localS() {
      //set into localArray key.
      let newStoredArray = JSON.stringify(checkListArray);
      localStorage.setItem("localArray", newStoredArray);
    }
    active();
    localS();
  }
}

//function to delete check lists and its localStorage
function deleteCheckList() {
  let checkUl = document.getElementById("checkListUl");
  let query = document.querySelector(".currentList");
  let listItem = query.innerText;
  let index = checkListArray.indexOf(listItem);
  let checkTitle = document.getElementById("checkListTitle");
  //remove the item from checkListArray
  checkListArray.splice(index, 1);
  //Update the localStorage
  localStorage.setItem("localArray", JSON.stringify(checkListArray));
  //Remove the li child element from the ul element using the id checkListUl
  checkUl.removeChild(query);
  //if a checkList item is deleted, remove the innerText from title
  checkTitle.innerText = "";
}
