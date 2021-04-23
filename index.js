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

    //Apply the highlight to the recent stored active item and call active()
    let oldStoredCurrent = localStorage.getItem("currentItem");
    if (oldStoredCurrent !== null) {
      let newCurrentItem = document.getElementsByClassName("checkLi");
      let itemIndex = checkListArray.indexOf(oldStoredCurrent);
      newCurrentItem[itemIndex].classList.add("currentList");

      //Apply contentEditable and editList-style class to #editList element *
      let query = JSON.stringify(
        document.querySelector(".currentList").innerText
      );
      let oldStoredContent = localStorage.getItem(JSON.parse(query));
      let content = document.getElementById("editList");
      content.setAttribute("contentEditable", "true");
      content.classList.add("editList-style");
      if (oldStoredContent !== null) {
        content.innerText = oldStoredContent;
      }
    }

    //set the title in #main
    let title = document.getElementById("checkListTitle");
    title.innerText = oldStoredCurrent;

    //Call active() function and the nested dynamicTitle() function
    active();
  } else if (localStorage.getItem("localArray") == null) {
    localStorage.setItem("localArray", checkListArray);
  }
});

/* //If there are no check Items, hide the save button
document.addEventListener("DOMContentLoaded", function hideSave() {
  if (document.querySelector(".currentList") == null) {
    document.getElementById("save-btn").style.display = "none";
  } else {
    document.getElementById("save-btn").style.display = "inline-block";
  }
}); */

//Call active() function to highlight the currently clicked list item and make the content editable by the user
function active() {
  let checkUl = document.getElementById("checkListUl");
  let checkHighlight = checkUl.getElementsByClassName("checkLi");
  for (let i = 0; i < checkHighlight.length; i++) {
    checkHighlight[i].addEventListener("click", function () {
      let current = document.getElementsByClassName("currentList");
      let content = document.getElementById("editList");
      if (current.length > 0) {
        current[0].className = current[0].className.replace(" currentList", "");
        content.setAttribute("contentEditable", "false");
        content.classList.remove("editList-style");
        content.innerText = "";
      }
      this.className += " currentList";
      content.setAttribute("contentEditable", "true");
      content.classList.add("editList-style");

      //load any saved content related to the relevent checkLi item from localStorage
      let oldStoredContent = localStorage.getItem(this.innerText);
      content.innerHTML = oldStoredContent;

      //store newStoredCurrent to localStorage key "currentItem"
      let newStoredCurrent = current[0].innerText;
      localStorage.setItem("currentItem", newStoredCurrent);
    });
  }
  //Dynamically change the #main title to whatever is highlighted with the currentList class
  function dynamicTitle() {
    for (i = 0; i < checkListArray.length; i++) {
      let checkCurrent = document.getElementsByClassName("checkLi")[i];
      checkCurrent.addEventListener("click", function () {
        let listItem = document.querySelector(".currentList").innerText;
        let title = document.getElementById("checkListTitle");
        title.innerText = listItem;
      });
    }
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
    checkListName === "" || checkRegExp.exec(checkListName) !== null; // Create an regexp that covers whitespace and no repeating checkListNames
  let conditionalTwo = checkListArray.includes(checkListName);

  //DOM requirements
  let checkUl = document.getElementById("checkListUl");
  let checkLi = document.createElement("li");
  let checkTitle = document.getElementById("checkListTitle");
  let checkEdit = document.getElementById("editList");

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
    checkEdit.classList.add("editList-style");
    checkEdit.setAttribute("contentEditable", "true");
    checkEdit.innerText = "";
    //make checkEdit focused/clicked to automatically start typing;

    //"show" the currently highlighted checkList
    if (checkListArray.length > 1) {
      let checkListId = document.getElementById("checkListUl");
      let checkHighlight = checkListId.getElementsByClassName("checkLi");
      let checkLength = checkListArray.length - 1;
      for (let i = 0; i < checkHighlight.length; i++) {
        checkHighlight[i].classList.remove("currentList");
      }
      localStorage.removeItem("currentItem");
      localStorage.setItem("currentItem", checkListName);

      //getElementsByClassName only shows a list of the matching elements, not the element itself
      //We use [] to specify which of the matching elements to work on
      //.length begins from 1, so -1 from checkListArray will match the integer for checkHighLight element array.
      checkHighlight[checkLength].classList.add("currentList");
    } else {
      checkLi.classList.add("currentList");
      localStorage.setItem("currentItem", checkListName);
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

function saveContent() {
  let saveEditList = document.getElementById("editList");
  let content = saveEditList.innerText;
  let item = document.querySelector(".currentList").innerText;
  if (
    (content !== null || content !== undefined) &&
    (item !== null || item !== undefined)
  ) {
    localStorage.setItem(item, content);
    alert("Saved!");
  } else {
    alert("Cannot save!");
  }
}

//function to delete check lists and its localStorage
function deleteCheckList() {
  let item = document.querySelector(".currentList");
  //Check to see if nothing is highlighted
  if (item !== null) {
    let checkUl = document.getElementById("checkListUl");
    let listItem = item.innerText;
    let checkTitle = document.getElementById("checkListTitle");
    //remove the item from checkListArray
    let index = checkListArray.indexOf(listItem);
    checkListArray.splice(index, 1);
    //Update the localStorage
    localStorage.setItem("localArray", JSON.stringify(checkListArray));
    localStorage.removeItem("currentItem");
    localStorage.removeItem(item.innerText);
    //Remove the li child element from the ul element using the id checkListUl
    checkUl.removeChild(item);
    //if a checkList item is deleted, remove the innerText from title
    checkTitle.innerText = "";
    //remove contentEditable from #editList
    let content = document.getElementById("editList");
    content.setAttribute("contentEditable", "false");
    content.classList.remove("editList-style");
    content.innerHTML = "";
  } else {
    alert("There is nothing to delete");
  }
}
