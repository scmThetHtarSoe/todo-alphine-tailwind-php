const todoApp = () => ({
  message: "",
  getLists: [],
  leftLists: [],

  init() {
    $getAllLists = this.getLists;
    this.itemsUnCompleteCount;

    $.ajax({
      url: "/api/allLists.php",
      type: "GET",
      success: function (response) {
        $allLists = response.data;
        $allLists.forEach(function (val) {
          this.$getAllLists.push({
            id: val.id,
            text: val.texts,
            status: val.status,
            uni_id: val.unquid_id,
          });
        });
      },
    });
    this.leftLists = this.getLists;
  },

  addTodo() {
    if (this.message.trim() != "") {
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
    }
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
    $getAllItems = this.getLists;
    $.ajax({
      url: "/api/allLists.php",
      type: "GET",
      success: function (response) {
        $allLists = response.data;
        $allLists.forEach(function (val) {
          this.$getAllItems.push({
            id: val.id,
            text: val.texts,
            status: val.status,
            uni_id: val.unquid_id,
          });
        });
      },
    });
    this.leftLists = this.getLists;
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
    this.leftLists = this.getLists;
  },
  get itemsUnCompleteCount() {
    let itemLength = this.leftLists.filter((getList) => getList.status == 0);
    return itemLength.length;
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
      this.getLists.filter((data) => (data.status = 1));
      $.ajax({
        url: "/api/checkAll.php",
        method: "POST",
        data: $(this).serialize(),
      });
    } else {
      this.getLists.filter((data) => (data.status = 0));
      $.ajax({
        url: "/api/uncheckAll.php",
        method: "POST",
        data: $(this).serialize(),
      });
    }
  },

  forupdate() {
    return {
      isEditing: false,
      editUnedit(el, idx) {
        this.isEditing = !this.isEditing;

        if (this.isEditing) {
          this.$nextTick(() => {
            this.$refs.input.focus();
          });
        }
      },
      editing(el, idx) {
        var tasklistId = idx;
        var val = el.value;
        this.isEditing = false;
        if (val.trim() != "") {
          $.ajax({
            url: "/api/update.php",
            type: "POST",
            data: {
              tasklistId: tasklistId,
              gettexts: val,
            },
          });
        } else {
          this.getLists = [];
          this.init();
        }
      },
    };
  },
});
