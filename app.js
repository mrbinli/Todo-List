let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper");

const time_line = new TimelineMax();
//要控制的對象，時間，控制對象原始狀態，控制對象動畫結束後的狀態.提早開始跑的時間
time_line
  .fromTo(
    hero,
    1.6,
    { height: "0%" },
    { height: "100%", ease: Power2.easeInOut }
  )
  .fromTo(
    hero,
    1.2,
    { width: "80%" },
    { width: "100%", ease: Power2.easeInOut },
    "-=0.2"
  )
  .fromTo(
    slider,
    1,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=2.8"
  )
  .fromTo(animation, 0.5, { opacity: 1 }, { opacity: 0 });

setTimeout(() => {
  animation.style.pointerEvents = "none";
}, 3000);
/*讓enter禁止使用 */
window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
  console.log(e);
});

//防止form內部button交出表單(預設行為)
let allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});
//改變評分顏色
//先偵測所有abcde(select屬性)
let allSelects = document.querySelectorAll("select");
allSelects.forEach((select) => {
  select.addEventListener("change", (e) => {
    // console.log(e);
    /*會出現change event
change { target: select.select, isTrusted: true, 
  srcElement: select.select, currentTarget: select.select, 
  eventPhase: 2, bubbles: true, cancelable: false, 
  returnValue: true, defaultPrevented: false,
   composed: false, … }*/
    console.log(e.target.value);
    setGPA();
    changeColor(e.target); //e.target就直接得到selcet標籤英文
  });
});
//改變credit之後gpa也更新
let credits = document.querySelectorAll(".classCredit");
credits.forEach((credit) => {
  credit.addEventListener("change", () => {
    setGPA();
  });
});

function changeColor(target) {
  if (target.value == "A" || target.value == "A-") {
    target.style.backgroundColor = "lightgreen";
    target.style.color = "black";
  } else if (
    target.value == "B+" ||
    target.value == "B" ||
    target.value == "B-"
  ) {
    target.style.backgroundColor = "rgb(123, 189, 243)";
    target.style.color = "black";
  } else if (
    target.value == "C+" ||
    target.value == "C" ||
    target.value == "C-"
  ) {
    target.style.backgroundColor = "rgb(129, 238, 183)";
    target.style.color = "black";
  } else if (
    target.value == "D+" ||
    target.value == "D" ||
    target.value == "D-"
  ) {
    target.style.backgroundColor = "rgb(241, 223, 122)";
    target.style.color = "black";
  } else if (target.value == "F") {
    target.style.backgroundColor = "rgb(243, 137, 137)";
    target.style.color = "black";
  } else {
    target.style.backgroundColor = "rgb(243, 137, 137)";
    target.style.color = "black";
  }
}
function convertor(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}
function setGPA() {
  console.log("正在執行set GPA...");
  //總共有幾排form 紀錄變數formLength
  let formLength = document.querySelectorAll("form").length;
  //共有幾學分 紀錄 credits
  let credits = document.querySelectorAll(".classCredit");
  //成績紀錄selects
  let selects = document.querySelectorAll("select");
  let sum = 0; //分子
  let creditSum = 0; //GPA

  //看看有沒有抓到值

  for (let i = 0; i < credits.length; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      creditSum += credits[i].valueAsNumber;
    }
  }

  for (let i = 0; i < formLength; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      sum += credits[i].valueAsNumber * convertor(selects[i].value);
    }
  }

  let result;
  if (creditSum == 0) {
    result = (0.0).toFixed(2);
  } else {
    result = (sum / creditSum).toFixed(2);
  }
  document.getElementById("result-gpa").innerText = result;
}

let addButton = document.querySelector(".plus-btn");
addButton.addEventListener("click", () => {
  //製作新表格
  let newform = document.createElement("form");
  let newDiv = document.createElement("div");
  newDiv.classList.add("grader");

  //製作各個元素的屬性

  // here is the select tag
  let newSelect = document.createElement("select");
  newSelect.classList.add("select");
  var opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);
  var opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);
  var opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);
  var opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);
  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);
  var opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);
  var opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);
  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);
  var opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);
  var opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);
  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);
  var opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);
  var opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);

  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);

  newSelect.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });

  let newButton = document.createElement("button");
  newButton.classList.add("trash-button");
  let newItag = document.createElement("i");
  newItag.classList.add("fas");
  newItag.classList.add("fa-trash");
  newButton.appendChild(newItag);

  //刪除新增的表格
  newButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        e.target.remove();
        setGPA();
      }
    );
  });
  /*type="text"
       placeholder="class category"
       class="classType"
       list="opt"*/
  let newInput1 = document.createElement("input");
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("list", "opt");
  newInput1.classList.add("classType");
  /*<input
      type="text"
      placeholder="class number"
      class="classNumber"  />*/
  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "text");
  newInput2.classList.add("classNumber");

  /*<input
     type="number"
     placeholder="credits"
     min="0"
     max="6"
     class="classCredit"
              />*/
  //更改這邊要更新gpa
  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "6");
  newInput3.classList.add("classCredit");
  newInput3.addEventListener("change", () => {
    setGPA();
  });
  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newButton);

  newform.appendChild(newDiv);
  document.querySelector(".allInput").appendChild(newform);

  //新增的表格從小到大
  newform.style.animation = "scaleUp 0.5s ease forwards";
});

//垃圾桶
// e.target.parentElement.parentElement是回到表格form的地方
// 如果click了，就執行remove，但如果直接用.remove()會沒有動畫效果
// 但用.add("remove")只是在class稱為remove，並在scss將它縮小到0而已
// 並沒有真的刪除，所以縮小完後要真的用.remove()，
let allTrash = document.querySelectorAll(".trash-button");
allTrash.forEach((trash) => {
  trash.addEventListener("click", (e) => {
    // e.target.parentElement.parentElement.classList.remove();
    e.target.parentElement.parentElement.classList.add("remove");
    //但直接在下面用會變成整個都刪除
    // e.target.parentElement.parentElement.classList.remove();
  });
});
//等到動畫結束才刪除，也就是等transition結束
allTrash.forEach((trash) => {
  let form = trash.parentElement.parentElement;
  form.addEventListener("transitionend", (e) => {
    e.target.remove();
    setGPA();
  });
});

// 排序演算法
let btn1 = document.querySelector(".sort-descending");
let btn2 = document.querySelector(".sort-ascending");
btn1.addEventListener("click", () => {
  handleSorting("descending"); // 大到小
});
btn2.addEventListener("click", () => {
  handleSorting("ascending"); // 小到大
});

function handleSorting(direction) {
  let graders = document.querySelectorAll("div.grader");
  let objectArray = [];

  for (let i = 0; i < graders.length; i++) {
    let class_name = graders[i].children[0].value; // class category
    let class_number = graders[i].children[1].value; // class number
    let class_credit = graders[i].children[2].value;
    let class_grade = graders[i].children[3].value;

    if (
      !(
        class_name == "" &&
        class_number == "" &&
        class_credit == "" &&
        class_grade == ""
      )
    ) {
      let class_object = {
        class_name,
        class_number,
        class_credit,
        class_grade,
      };
      objectArray.push(class_object);
    }
  }

  // 取得object array後，我們可以把成績String換成數字
  for (let i = 0; i < objectArray.length; i++) {
    objectArray[i].class_grade_number = convertor(objectArray[i].class_grade);
  }

  objectArray = mergeSort(objectArray);
  if (direction == "descending") {
    objectArray = objectArray.reverse();
  }

  // 根據object array的內容，來更新網頁
  //取得allInput內容並且用innerHTML清空它
  let allInputs = document.querySelector(".allInput");
  allInputs.innerHTML = "";

  //更新內容，將html的內容字串化``後更新
  for (let i = 0; i < objectArray.length; i++) {
    allInputs.innerHTML += `<form>
<div class="grader">
  <!-- 要設定list連接下面的datalist -->
  <input
    type="text"
    placeholder="class category"
    class="classType"
    list="opt"
    value=${objectArray[i].class_name}
  /><!--
  --><input
    type="text"
    placeholder="class number"
    class="classNumber"
    value=${objectArray[i].class_name}
  /><!--
  --><input
    type="number"
    placeholder="credits"
    min="0"
    max="6"
    class="classCredit"
    value=${objectArray[i].class_name}
  /><!--
  --><select name="select" class="select">
    <option value=""></option>
    <option value="A">A</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B">B</option>
    <option value="B-">B-</option>
    <option value="C+">C+</option>
    <option value="C">C</option>
    <option value="C-">C-</option>
    <option value="D+">D+</option>
    <option value="D">D</option>
    <option value="D-">D-</option>
    <option value="F">F</option></select
  ><!--
  --><button class="trash-button">
    <i class="fas fa-trash"></i>
  </button>
</div>
</form>`;
    //直接用成字串更改
  }

  // SELECT可直接用JS更改
  graders = document.querySelectorAll("div.grader");
  for (let i = 0; i < graders.length; i++) {
    graders[i].children[3].value = objectArray[i].class_grade;
  }
}

function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < a1.length && j < a2.length) {
    if (a1[i].class_grade_number > a2[j].class_grade_number) {
      result.push(a2[j]);
      j++;
    } else {
      result.push(a1[i]);
      i++;
    }
  }

  while (i < a1.length) {
    result.push(a1[i]);
    i++;
  }
  while (j < a2.length) {
    result.push(a2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length == 0) {
    return;
  }

  if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
  }
}
