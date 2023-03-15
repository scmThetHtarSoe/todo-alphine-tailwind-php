const todoApp = () => ({
  message: "",
  getLists: [],
  leftItem: "",
  oldText: "",

  init() {
    $s = this.getLists;
    $l = this.leftItem;
    console.log($l);
    // const getLeftItem = $s.filter((data) => data.status != 1).length;
    // this.leftItem = getLeftItem;

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
            // $("#checkAll").attr("id", "uncheckAll");
          } else {
            $("#checkAll").html("Check All");
            // $("#uncheckAll").attr("id", "checkAll");
          }
        },
      });
    }
  },
  addTodo() {
    $s = this.getLists;
    $(document).on("submit", "#todoForm", function (event) {
      event.preventDefault();
      if ($("#list-text").val() == "" || $("#list-text").val().trim() == "") {
        $("#errMsg").text("Plese Enter List!");
        return false;
      } else {
        // $("#submit").attr("disabled", "disabled");
        $.ajax({
          url: "/api/create.php",
          type: "POST",
          data: $(this).serialize(),
          success: function (data) {
            // $("#submit").attr("disabled", false);
            $("#todoForm")[0].reset();
            // this.$s.push({
            //   id: data.id,
            //   text: data.texts,
            //   status: 0,
            // });
            // console.log(data);
            $(".list-group").append(
              '<li class="list-group-item">' +
                '<input type="checkbox" id="getCheckbox" @click="check(event.target,' +
                data.id +
                ')"  class="getCheckbox"/>' +
                '<span id="for-span-' +
                data.id +
                '" class="ml-4 for-span">' +
                data.texts +
                "</span>" +
                '<button id="remove" class="cross" data-id=' +
                data.id +
                ">&times;</button>" +
                "</li>"
            );
          },
        });
      }
    });
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
                '" class="ml-4 for-span">' +
                val.texts +
                "</span>" +
                '<button id="remove" class="cross" data-id=' +
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
                '" class="ml-4 for-span line-through">' +
                val.texts +
                "</span>" +
                '<button id="remove" class="cross" data-id=' +
                val.id +
                ">&times;</button>" +
                "</li>"
            );
          }
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
              '<button id="remove" class="cross" data-id=' +
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
              '<button id="remove" class="cross" data-id=' +
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
          }
          // gettext();

          $.ajax({
            url: "/api/active.php",
            type: "GET",
            success: function (response) {
              $("#zero").html(response.data.length);
              this.$l = response.data.length;
              // console.log(response.data.length);
              if (response.data.length == "0") {
                el.innerText = "Uncheck All";
                // $("#checkAll").html("Uncheck All");
                // $("#checkAll").attr("id", "uncheckAll");
              } else {
                el.innerText = "Check All";
                // $("#uncheckAll").html("Check All");
                // $("#uncheckAll").attr("id", "checkAll");
              }
            },
          });
          // $("#checkAll").attr("id", "uncheckAll");
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
          }
          // el.innerText = "Check All";
          // gettext();
          $.ajax({
            url: "/api/active.php",
            type: "GET",
            success: function (response) {
              $("#zero").html(response.data.length);
              this.$l = response.data.length;
              if (response.data.length == "0") {
                // el.innerText = "Uncheck All";
                $("#checkAll").html("Uncheck All");
                // $("#checkAll").attr("id", "uncheckAll");
              } else {
                // el.innerText = "Check All";
                $("#checkAll").html("Check All");
                // $("#uncheckAll").attr("id", "checkAll");
              }
              // console.log(response.data.length);
              // if (response.data.length == "0") {
              //   $("#checkAll").html("Uncheck All");
              //   $("#checkAll").attr("id", "uncheckAll");
              // } else {
              //   $("#uncheckAll").html("Check All");
              //   $("#uncheckAll").attr("id", "checkAll");
              // }
            },
          });
          // $("#uncheckAll").html("Check All");
          // $("#uncheckAll").attr("id", "checkAll");
        },
      });
    }

    // $.ajax({
    //   url: "http://localhost/todolists-php-alphine/todolists-php-alphine/api/checkAll.php",
    //   method: "POST",
    //   data: $(this).serialize(),
    //   success: function (data) {
    //     $getCheckbox = $(".getCheckbox");
    //     $getCheckbox.prop("checked", true);
    //     if ($getCheckbox.is(":checked")) {
    //       $getCheckbox.siblings(".for-span").addClass("line-through");
    //     }
    //     // getText();
    //     // $("#checkAll").html("Uncheck All");
    //     // $("#checkAll").attr("id", "uncheckAll");
    //   },
    // });

    // this.datas =
    //   JSON.parse(localStorage.getItem("todos")) == null
    //     ? []
    //     : JSON.parse(localStorage.getItem("todos"));
    // if (el.innerText == "Check All") {
    //   this.datas.map((data) => (data.status = true));
    //   el.classList.remove("done");
    //   el.innerText = "Uncheck All";
    // } else {
    //   this.datas.map((data) => (data.status = false));
    //   el.classList.add("done");
    //   el.innerText = "Check All";
    // }
    // this.updateLocalStorage();
    // this.leftItem = this.datas.filter((data) => data.status != true).length;
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
        // gettext();
        $.ajax({
          url: "/api/active.php",
          type: "GET",
          success: function (response) {
            $("#zero").html(response.data.length);
            this.$l = response.data.length;
            // console.log(response.data.length);
            // if (response.data.length == "0") {
            //   $("#checkAll").html("Uncheck All");
            //   $("#checkAll").attr("id", "uncheckAll");
            // } else {
            //   $("#uncheckAll").html("Check All");
            //   $("#uncheckAll").attr("id", "checkAll");
            // }
          },
        });
      },
    });
  },
  check(el, idx) {
    var tasklistId = idx;
    // var getSpan = el.siblings(".text");
    $.ajax({
      url: "/api/updateStatus.php",
      method: "POST",
      data: {
        tasklistId: tasklistId,
      },
      success: function (data) {
        // gettext();
        $.ajax({
          url: "/api/active.php",
          type: "GET",
          success: function (response) {
            $("#zero").html(response.data.length);
            this.$l = response.data.length;
            // console.log(response.data.length);
            if (response.data.length == "0") {
              $("#checkAll").html("Uncheck All");
              // $("#checkAll").attr("id", "uncheckAll");
            } else {
              $("#checkAll").html("Check All");
              // $("#uncheckAll").attr("id", "checkAll");
            }
          },
        });
        // if (getSpan.hasClass("line-through")) {
        //   getSpan.removeClass("line-through");
        //   getSpan.siblings("#getCheckbox").attr("checked", false);
        // } else {
        //   getSpan.addClass("line-through");
        //   getSpan.siblings("#getCheckbox").attr("checked", true);
        // }
      },
    });

    // this.leftItem = this.datas.filter((data) => data.status != true).length;
    // if (this.leftItem != 0) {
    //   document.getElementById("checkAll").innerHTML = "Check All";
    // } else {
    //   document.getElementById("checkAll").innerHTML = "Uncheck All";
    // }
    // this.updateLocalStorage();
    // this.leftItem = this.datas.filter((data) => data.status != true).length;
  },

  editfun(el, idx) {
    el.classList.add("editinputs");
    el.nextElementSibling.classList.remove("editinputs");
    this.$root.querySelector("#task_edit-" + idx.toString()).focus();
    $s = this.getLists;

    var oldVal = $s.filter(function (data) {
      return data.id == idx;
    });
    var getVal = oldVal[0].text;
    this.oldText = getVal;
  },

  updatefun(el, idx) {
    el.parentNode.previousElementSibling.classList.remove("editinputs");
    el.parentNode.classList.add("editinputs");
    //
    //     var value = JSON.parse(localStorage.getItem("todos"));
    //     var oldVal = value.filter(function (data) {
    //       return data.id == idx;
    //     });
    //
    //     var getoldVal = oldVal[0].text;
    var getVal = this.oldText;
    var tasklistId = idx;

    el.addEventListener("blur", function (event) {
      event.preventDefault();
      var val = $(".form-control-edit").val();
      $.ajax({
        url: "/api/update.php",
        type: "POST",
        data: {
          tasklistId: tasklistId,
          gettexts: val,
        },
        success: function (response) {
          if (val.trim() != "") {
            // $("#editForm").parent(".list-group-item .for-span").text(val);
            el.parentNode.previousElementSibling.innerText = val;
          } else {
            // $("#editForm").parent(".list-group-item .for-span").text(getVal);
            el.parentNode.previousElementSibling.innerText = getVal;
          }
        },
      });
      // if (el.value.trim() === "") {
      //   console.log(getoldVal);
      //   console.log(el);
      //   el.parentNode.previousElementSibling.innerText = getoldVal;
      //   el.value = getoldVal;
      // }
    });
    // this.updateLocalStorage();
  },
});
