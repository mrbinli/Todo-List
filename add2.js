allInputs.innerHTML += `
<form>
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
