const todoApp = () => ({
  message: "",
  getLists: [],
  leftItem: "",
  oldText: "",
  //   uni_id: Date.now(),
  //   uni_id: Math.floor(Math.random() * 1000),
  isEditing: false,
  // isEditing: "",
  toggleEditingState(idx) {
    this.isEditing = !this.isEditing;
    // this.isEditing = this.isEditing === idx ? null : idx;

    if (this.isEditing) {
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    }
  },
  disableEditing() {
    this.isEditing = false;
  },

  init() {
    $s = this.getLists;

    $.ajax({
      url: "/api/allLists.php",
      type: "GET",
      success: function (response) {
        $allLists = response.data;
        $allLists.forEach(function (val) {
          this.$s.push({
            id: val.id,
            text: val.texts,
            status: val.status,
            uni_id: val.unquid_id,
          });
        });
      },
    });
  },

  addTodo() {
    var list = {
      uni_id: Date.now(),
      texts: this.message,
    };
    this.getLists.push({
      uni_id: Date.now(),
      text: this.message,
      status: 0,
    });
    this.message = "";
    $.ajax({
      url: "/api/create.php",
      type: "POST",
      data: list,
    });
    this.leftItem = this.getLists.filter((data) => data.status != 1).length;
  },
  del(index, idx) {
    this.getLists.splice(index, 1);
    var tasklistId = idx;
    $.ajax({
      url: "/api/delete.php",
      method: "POST",
      data: {
        tasklistId: tasklistId,
      },
    });
    this.leftItem = this.getLists.filter((data) => data.status != 1).length;
  },
  check(idx) {
    $.ajax({
      url: "/api/updateStatus.php",
      method: "POST",
      data: {
        tasklistId: idx,
      },
    });
  },

  showAll() {
    this.getLists = [];
    $s = this.getLists;
    $.ajax({
      url: "/api/allLists.php",
      type: "GET",
      success: function (response) {
        $allLists = response.data;
        $allLists.forEach(function (val) {
          this.$s.push({
            id: val.id,
            text: val.texts,
            status: val.status,
          });
        });
        // this.gettext();
        this.leftItem = this.getLists.filter((data) => data.status != 1).length;
      },
    });
    console.log(this.getLists);
  },
  showActive() {
    this.getLists = [];
    $active = this.getLists;
    $.ajax({
      url: "/api/active.php",
      type: "GET",
      success: function (response) {
        $allLists = response.data;
        $allLists.forEach(function (val) {
          this.$active.push({
            id: val.id,
            text: val.texts,
            status: val.status,
          });
        });
      },
    });
  },
  showCompleted() {
    this.getLists = [];
    $active = this.getLists;
    $.ajax({
      url: "/api/completed.php",
      type: "GET",
      success: function (response) {
        $allLists = response.data;
        $allLists.forEach(function (val) {
          this.$active.push({
            id: val.id,
            text: val.texts,
            status: val.status,
          });
        });
      },
    });
  },

  clearCompleted() {
    this.getLists = this.getLists.filter((data) => data.status != true);
    $.ajax({
      url: "/api/clearCompleted.php",
      type: "POST",
    });
  },

  checkAll(el) {
    if (el.innerText == "Check All") {
      this.getLists.map((data) => (data.status = 1));
      el.innerText = "Uncheck All";
      $.ajax({
        url: "/api/checkAll.php",
        method: "POST",
        data: $(this).serialize(),
      });
    } else {
      this.getLists.map((data) => (data.status = 0));
      el.innerText = "Check All";
      $.ajax({
        url: "/api/uncheckAll.php",
        method: "POST",
        data: $(this).serialize(),
      });
    }
    this.leftItem = this.getLists.filter((data) => data.status != 1).length;
  },

  editfun(el, idx) {
    el.classList.add("editinputs");
    el.nextElementSibling.classList.remove("editinputs");
    var getVal = el.textContent;
    $(".form-control-edit").focus();
    this.oldText = getVal;
  },

  removeInput(index, idx) {
    var getEditInput = document.querySelectorAll(".form-control-edit");
    this.updatefun(getEditInput[index], idx);
  },

  get itemsUnCompleteCount() {
    let itemLength = this.getLists.filter((getList) => getList.status == 0);
    return itemLength.length;
  },

  updatefun(el, idx) {
    el.parentNode.previousElementSibling.classList.remove("editinputs");
    el.parentNode.classList.add("editinputs");
    var oldVal = this.oldText;
    var tasklistId = idx;

    el.addEventListener("blur", function (event) {
      event.preventDefault();
      var val = el.value;
      console.log(val);
      if (val.trim() != "") {
        $.ajax({
          url: "/api/update.php",
          type: "POST",
          data: {
            tasklistId: tasklistId,
            gettexts: val,
          },
          success: function (response) {
            el.parentNode.previousElementSibling.innerText = val;
          },
        });
      } else {
        el.parentNode.previousElementSibling.innerText = oldVal;
      }
    });
  },
});
