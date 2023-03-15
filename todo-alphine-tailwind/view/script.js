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
        // console.log(response.data);
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
    console.log(this.message);

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
      // $("#submit").attr("disabled", "disabled");
      $.ajax({
        url: "/api/create.php",
        type: "POST",
        // data: $(this).serialize(),
        data: { texts: texts },
        success: function (data) {
          $("#todoForm")[0].reset();
          $(".list-group").append(
            '<li class="list-group-item">' +
              '<input type="checkbox" id="getCheckbox" @click="check(event.target,' +
              data.id +
              ')"  class="getCheckbox"/>' +
              '<span id="for-span-' +
              data.id +
              '" class="ml-4 for-span text"  @dblclick="editfun(event.target,' +
              data.id +
              ')">' +
              data.texts +
              "</span>" +
              '<div class="editinputs getallinputs">' +
              '<input type="text" :id="`task_edit-${' +
              data.id +
              '}`" class="form-control-edit" x-model="' +
              data.texts +
              '" @keyup.enter="updatefun(event.target,' +
              data.id +
              ')" />' +
              "</div>" +
              '<button @click="del(event.target,' +
              data.id +
              ')" id="remove" class="cross" data-id=' +
              data.id +
              ">&times;</button>" +
              "</li>"
          );

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
          if (val.status == 0) {
            $(".list-group").append(
              '<li class="list-group-item">' +
                '<input type="checkbox" id="getCheckbox" @click="check(event.target,' +
                val.id +
                ')"  class="getCheckbox"/>' +
                '<span id="for-span-' +
                val.id +
                '" class="ml-4 for-span text" @dblclick="editfun(event.target,' +
                val.id +
                ')">' +
                val.texts +
                "</span>" +
                '<div class="editinputs getallinputs">' +
                '<input type="text" :id="`task_edit-${' +
                val.id +
                '}`" class="form-control-edit" x-model="' +
                val.texts +
                '" @keyup.enter="updatefun(event.target,' +
                val.id +
                ')" />' +
                "</div>" +
                '<button @click="del(event.target,' +
                val.id +
                ')" id="remove" class="cross" data-id=' +
                val.id +
                ">&times;</button>" +
                "</li>"
            );
          } else {
            $(".list-group").append(
              '<li class="list-group-item">' +
                '<input type="checkbox" id="getCheckbox" @click="check(event.target,' +
                val.id +
                ')"  class="getCheckbox" checked/>' +
                '<span id="for-span-' +
                val.id +
                '" class="ml-4 for-span text completed" @dblclick="editfun(event.target,' +
                val.id +
                ')">' +
                val.texts +
                "</span>" +
                '<div class="editinputs getallinputs">' +
                '<input type="text" :id="`task_edit-${' +
                val.id +
                '}`" class="form-control-edit" x-model="' +
                val.texts +
                '" @keyup.enter="updatefun(event.target,' +
                val.id +
                ')" />' +
                "</div>" +
                '<button @click="del(event.target,' +
                val.id +
                ')" id="remove" class="cross" data-id=' +
                val.id +
                ">&times;</button>" +
                "</li>"
            );
          }
        });

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
  showActive() {
    $.ajax({
      url: "/api/active.php",
      method: "GET",
      success: function (response) {
        $allLists = response.data;
        $(".list-group").html("");
        $allLists.forEach(function (val) {
          $(".list-group").append(
            '<li class="list-group-item">' +
              '<input type="checkbox" id="getCheckbox" @click="check(event.target,' +
              val.id +
              ')"  class="getCheckbox"/>' +
              '<span id="for-span-' +
              val.id +
              '" class="ml-4 for-span">' +
              val.texts +
              "</span>" +
              '<button @click="del(event.target,' +
              val.id +
              ')" id="remove" class="cross" data-id=' +
              val.id +
              ">&times;</button>" +
              "</li>"
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
            '<li class="list-group-item">' +
              '<input type="checkbox" id="getCheckbox" @click="check(event.target,' +
              val.id +
              ')"  class="getCheckbox" checked/>' +
              '<span id="for-span-' +
              val.id +
              '" class="ml-4 for-span line-through">' +
              val.texts +
              "</span>" +
              '<button @click="del(event.target,' +
              val.id +
              ')" id="remove" class="cross" data-id=' +
              val.id +
              ">&times;</button>" +
              "</li>"
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
    var getSpan = $(el).siblings(".text");
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

  editfun(el, idx) {
    el.classList.add("editinputs");
    el.nextElementSibling.classList.remove("editinputs");
    $s = this.getLists;

    var oldVal = $s.filter(function (data) {
      return data.id == idx;
    });
    var getVal = oldVal[0].text.trim();
    this.oldText = getVal;
  },

  updatefun(el, idx) {
    el.parentNode.previousElementSibling.classList.remove("editinputs");
    el.parentNode.classList.add("editinputs");
    var oldVal = this.oldText;
    console.log(oldVal);
    var tasklistId = idx;

    el.addEventListener("blur", function (event) {
      event.preventDefault();
      var val = $(el).val().trim();
      $.ajax({
        url: "/api/update.php",
        type: "POST",
        data: {
          tasklistId: tasklistId,
          gettexts: val,
        },
        success: function (response) {
          if (val.trim() != "") {
            el.parentNode.previousElementSibling.innerText = val;
          } else {
            el.parentNode.previousElementSibling.innerText = oldVal;
          }
        },
      });
    });
  },
});
