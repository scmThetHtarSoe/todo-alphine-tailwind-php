const todoApp = () => ({
  message: "",
  getLists: [],
  leftItem: "",
  oldText: "",

  init() {
    $s = this.getLists;
    $l = this.leftItem;

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
      },
    });

    gettext();

    function gettext() {
      $.ajax({
        url: "/api/active.php",
        type: "GET",
        success: function (response) {
          $("#zero").html(response.data.length);
          this.$l = response.data.length;
          console.log(response.data.length);
          if (response.data.length == "0") {
            $("#checkAll").html("Uncheck All");
          } else {
            $("#checkAll").html("Check All");
          }
        },
      });
    }
  },
  addTodo() {
    var texts = this.message;
    $s = this.getLists;
    if ($("#list-text").val() == "" || $("#list-text").val().trim() == "") {
      $("#errMsg").text("Plese Enter List!");
      return false;
    } else {
      $.ajax({
        url: "/api/create.php",
        type: "POST",
        data: { texts: texts },
        success: function (data) {
          console.log(data.texts);
          $("#todoForm")[0].reset();
          var idx = $(".list-group-item:last").index();
          $(".list-group").append(
            `<li class="list-group-item">
            <input type="checkbox" id="getCheckbox" class="getCheckbox" @click="check(event.target,${data.id})">
            <span :class="${data.done} ? 'completed text for-span ml-4' : 'text for-span ml-4'"  @dblclick="editfun(event.target,${data.id})">${data.texts}</span>
            <div @click.outside="removeInput(${idx},${data.id})" class="editinputs getallinputs">
                <input type="text"  class="form-control-edit" @click="updatefun(event.target,${data.id})"/>
            </div>
            <span @click="del(event.target,${data.id})" id="remove" class="cross" data-id="${data.id}">&times;</span>
            </li>`
          );

          $.ajax({
            url: "/api/active.php",
            type: "GET",
            success: function (response) {
              $("#zero").html(response.data.length);
            },
          });
        },
      });
    }
  },

  showAll() {
    $s = this.getLists;
    $s = [];
    const getLeftItem = $s.filter((data) => data.status != 1).length;
    this.leftItem = getLeftItem;
    $.ajax({
      url: "/api/allLists.php",
      type: "GET",
      success: function (response) {
        $allLists = response.data;
        $(".list-group").html("");
        $allLists.forEach(function (val) {
          var getChecked = val.status ? "checked" : "";
          $(".list-group").append(
            `<li class="list-group-item">
            <input type="checkbox" id="getCheckbox" class="getCheckbox" @click="check(event.target,${val.id})" ${getChecked}>
            <span :class="${val.status} ? 'completed text for-span ml-4' : 'text for-span ml-4'"  @dblclick="editfun(event.target,${val.id})">${val.texts}</span>
            <div class="editinputs getallinputs">
                <input type="text"  class="form-control-edit" @click="updatefun(event.target,${val.id})"/>
            </div>
            <span @click="del(event.target,${val.id})" id="remove" class="cross" data-id="${val.id}">&times;</span>
            </li>`
          );
        });

        $.ajax({
          url: "/api/active.php",
          type: "GET",
          success: function (response) {
            $("#zero").html(response.data.length);
          },
        });
      },
    });
  },
  showActive() {
    $.ajax({
      url: "/api/active.php",
      method: "GET",
      success: function (response) {
        $allLists = response.data;
        $(".list-group").html("");
        $allLists.forEach(function (val) {
          $(".list-group").append(
            `<li class="list-group-item">
            <input type="checkbox" id="getCheckbox" class="getCheckbox" @click="check(event.target,${val.id})">
            <span :class="${val.status} ? 'completed text for-span ml-4' : 'text for-span ml-4'"  @dblclick="editfun(event.target,${val.id})">${val.texts}</span>
            <div class="editinputs getallinputs">
                <input type="text"  class="form-control-edit" @click="updatefun(event.target,${val.id})"/>
            </div>
            <span @click="del(event.target,${val.id})" id="remove" class="cross" data-id="${val.id}">&times;</span>
            </li>`
          );
        });
      },
    });
  },

  showCompleted() {
    $.ajax({
      url: "/api/completed.php",
      method: "GET",
      success: function (response) {
        $allLists = response.data;
        $(".list-group").html("");
        $allLists.forEach(function (val) {
          $(".list-group").append(
            `<li class="list-group-item">
            <input type="checkbox" id="getCheckbox" class="getCheckbox" @click="check(event.target,${val.id})" checked>
            <span :class="${val.status} ? 'completed text for-span ml-4' : 'text for-span ml-4'"  @dblclick="editfun(event.target,${val.id})">${val.texts}</span>
            <div class="editinputs getallinputs">
                <input type="text"  class="form-control-edit" @click="updatefun(event.target,${val.id})"/>
            </div>
            <span @click="del(event.target,${val.id})" id="remove" class="cross" data-id="${val.id}">&times;</span>
            </li>`
          );
        });
      },
    });
  },

  clearCompleted() {
    $.ajax({
      url: "/api/clearCompleted.php",
      type: "POST",
      data: $(this).serialize(),
      success: function (data) {
        $getCheckbox = $(".getCheckbox");
        $getCheckbox.each(function () {
          if ($(this).is(":checked")) {
            $(this).parent(".list-group-item").fadeOut();
          }
        });
      },
    });
  },

  checkAll(el) {
    if (el.innerText == "Check All") {
      $.ajax({
        url: "/api/checkAll.php",
        method: "POST",
        data: $(this).serialize(),
        success: function (data) {
          $getCheckbox = $(".getCheckbox");
          $getCheckbox.prop("checked", true);
          if ($getCheckbox.is(":checked")) {
            $getCheckbox.siblings(".text").addClass("completed");
          } else {
            $getCheckbox.siblings(".text").removeClass("completed");
          }

          $.ajax({
            url: "/api/active.php",
            type: "GET",
            success: function (response) {
              $("#zero").html(response.data.length);
              this.$l = response.data.length;
              if (response.data.length == "0") {
                el.innerText = "Uncheck All";
              } else {
                el.innerText = "Check All";
              }
            },
          });
        },
      });
    } else {
      $.ajax({
        url: "/api/uncheckAll.php",
        method: "POST",
        data: $(this).serialize(),
        success: function (data) {
          $getCheckbox = $(".getCheckbox");
          $getCheckbox.prop("checked", false);
          if (!$getCheckbox.is(":checked")) {
            $getCheckbox.siblings(".text").removeClass("completed");
          } else {
            $getCheckbox.siblings(".text").addClass("completed");
          }

          $.ajax({
            url: "/api/active.php",
            type: "GET",
            success: function (response) {
              $("#zero").html(response.data.length);
              this.$l = response.data.length;
              if (response.data.length == "0") {
                $("#checkAll").html("Uncheck All");
              } else {
                $("#checkAll").html("Check All");
              }
            },
          });
        },
      });
    }
  },

  del(el, idx) {
    var tasklistId = idx;
    var getli = $(el).parent(".list-group-item");
    $.ajax({
      url: "/api/delete.php",
      method: "POST",
      data: {
        tasklistId: tasklistId,
      },
      success: function (data) {
        getli.fadeOut();
        $.ajax({
          url: "/api/active.php",
          type: "GET",
          success: function (response) {
            $("#zero").html(response.data.length);
            this.$l = response.data.length;
          },
        });
      },
    });
  },
  check(el, idx) {
    var tasklistId = idx;
    $.ajax({
      url: "/api/updateStatus.php",
      method: "POST",
      data: {
        tasklistId: tasklistId,
      },
      success: function (data) {
        $.ajax({
          url: "/api/active.php",
          type: "GET",
          success: function (response) {
            $("#zero").html(response.data.length);
            this.$l = response.data.length;
            if (response.data.length == "0") {
              $("#checkAll").html("Uncheck All");
            } else {
              $("#checkAll").html("Check All");
            }
          },
        });
        if (!$(el).is(":checked")) {
          $(el).siblings(".text").removeClass("completed");
        } else {
          $(el).siblings(".text").addClass("completed");
        }
      },
    });
  },

  oldValues: [],

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

  updatefun(el, idx) {
    el.parentNode.previousElementSibling.classList.remove("editinputs");
    el.parentNode.classList.add("editinputs");
    var oldVal = this.oldText;
    var tasklistId = idx;

    el.addEventListener("blur", function (event) {
      event.preventDefault();
      var val = $(el).val();
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
