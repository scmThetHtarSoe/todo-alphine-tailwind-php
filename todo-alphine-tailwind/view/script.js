const todoApp = () => ({
  message: "",
  getLists: [],
  oldText: "",

  init() {
    $getAllLists = this.getLists;

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
      $.ajax({
        url: "/api/checkAll.php",
        method: "POST",
        data: $(this).serialize(),
      });
    } else {
      this.getLists.map((data) => (data.status = 0));
      $.ajax({
        url: "/api/uncheckAll.php",
        method: "POST",
        data: $(this).serialize(),
      });
    }
  },

  get itemsUnCompleteCount() {
    let itemLength = this.getLists.filter((getList) => getList.status == 0);
    return itemLength.length;
  },

  forupdate() {
    return {
      isEditing: false,
      oldText: "",
      editUnedit(el, idx) {
        this.isEditing = !this.isEditing;
        this.oldText = el.textContent;

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
