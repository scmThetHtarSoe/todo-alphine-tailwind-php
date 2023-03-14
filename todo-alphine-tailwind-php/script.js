$(document).ready(function () {
  //---------------------create----------------
  $(document).on("submit", "#todoForm", function (event) {
    event.preventDefault();
    if ($("#list-text").val() == "" || $("#list-text").val().trim() == "") {
      $("#errMsg").text("Plese Enter List!");
      return false;
    } else {
      $("#submit").attr("disabled", "disabled");
      $.ajax({
        url: "http://" + getUrl + "/create.php",
        method: "POST",
        data: $(this).serialize(),
        success: function (data) {
          $("#submit").attr("disabled", false);
          $("#todoForm")[0].reset();
          console.log(data);
          $(".getallLists").append(
            '<li class="list-group-item">' +
              '<input type="checkbox" id="getCheckbox"  class="getCheckbox"/>' +
              '<span id="for-span-' +
              data.id +
              '" class="ml-4 for-span">' +
              data.texts +
              "</span>" +
              '<button class="cross" data-id=' +
              data.id +
              ">&times;</button>" +
              "</li>"
          );
          getText();
        },
      });
    }
  });
  //---------------------create----------------

  //--------------------checkbox--------------
  $(document).on("click", "#getCheckbox", function () {
    var tasklistId = $(this).siblings(".cross").data("id");
    var getSpan = $(this).siblings(".for-span");
    $.ajax({
      url: "http://" + getUrl + "/updateStatus.php",
      method: "POST",
      data: {
        tasklistId: tasklistId,
      },
      success: function (data) {
        if (getSpan.hasClass("line-through")) {
          getSpan.removeClass("line-through");
          getSpan.siblings("#getCheckbox").attr("checked", false);
        } else {
          getSpan.addClass("line-through");
          getSpan.siblings("#getCheckbox").attr("checked", true);
        }
        getText();
      },
    });
  });
  //--------------------checkbox--------------

  //--------------------cross--------------
  $(document).on("click", ".cross", function () {
    var tasklistId = $(this).data("id");
    var getli = $(this).parent(".list-group-item");
    $.ajax({
      url: "http://" + getUrl + "/delete.php",
      method: "POST",
      data: {
        tasklistId: tasklistId,
      },
      success: function (data) {
        getli.fadeOut();
        getText();
      },
    });
  });
  //--------------------cross--------------

  $.ajax({
    url: "http://" + getUrl + "/allLists.php",
    type: "GET",
    success: function (response) {
      $allLists = response.data;
      $allLists.forEach(function (val) {
        if (val.status == 0) {
          $(".getallLists").append(
            '<li class="list-group-item">' +
              '<input type="checkbox" id="getCheckbox"  class="getCheckbox"/>' +
              '<span id="for-span-' +
              val.id +
              '" class="ml-4 for-span">' +
              val.texts +
              "</span>" +
              '<button class="cross" data-id=' +
              val.id +
              ">&times;</button>" +
              "</li>"
          );
        } else {
          $(".getallLists").append(
            '<li class="list-group-item">' +
              '<input type="checkbox" id="getCheckbox"  class="getCheckbox" checked/>' +
              '<span id="for-span-' +
              val.id +
              '" class="ml-4 for-span line-through">' +
              val.texts +
              "</span>" +
              '<button class="cross" data-id=' +
              val.id +
              ">&times;</button>" +
              "</li>"
          );
        }
      });
    },
  });

  //----------all btn --------------
  $(document).on("click", "#all", function () {
    $.ajax({
      url: "http://" + getUrl + "/allLists.php",
      type: "GET",
      success: function (response) {
        $allLists = response.data;
        $(".getallLists").html("");
        $allLists.forEach(function (val) {
          if (val.status == 0) {
            $(".getallLists").append(
              '<li class="list-group-item">' +
                '<input type="checkbox" id="getCheckbox"  class="getCheckbox"/>' +
                '<span id="for-span-' +
                val.id +
                '" class="ml-4 for-span">' +
                val.texts +
                "</span>" +
                '<button class="cross" data-id=' +
                val.id +
                ">&times;</button>" +
                "</li>"
            );
          } else {
            $(".getallLists").append(
              '<li class="list-group-item">' +
                '<input type="checkbox" id="getCheckbox"  class="getCheckbox" checked/>' +
                '<span id="for-span-' +
                val.id +
                '" class="ml-4 for-span line-through">' +
                val.texts +
                "</span>" +
                '<button class="cross" data-id=' +
                val.id +
                ">&times;</button>" +
                "</li>"
            );
          }
        });
      },
    });
  });
  //----------all btn --------------

  //--------all not done btn --------------
  $(document).on("click", "#notdone", function () {
    $.ajax({
      url: "http://" + getUrl + "/active.php",
      method: "GET",
      success: function (response) {
        $allLists = response.data;
        $(".getallLists").html("");
        $allLists.forEach(function (val) {
          $(".getallLists").append(
            '<li class="list-group-item">' +
              '<input type="checkbox" id="getCheckbox"  class="getCheckbox"/>' +
              '<span id="for-span-' +
              val.id +
              '" class="ml-4 for-span">' +
              val.texts +
              "</span>" +
              '<button class="cross" data-id=' +
              val.id +
              ">&times;</button>" +
              "</li>"
          );
        });
      },
    });
  });
  //--------all not done btn --------------

  //--------all done btn --------------
  $(document).on("click", "#done", function () {
    $.ajax({
      url: "http://" + getUrl + "/completed.php",
      method: "GET",
      success: function (response) {
        $allLists = response.data;
        $(".getallLists").html("");
        $allLists.forEach(function (val) {
          $(".getallLists").append(
            '<li class="list-group-item">' +
              '<input type="checkbox" id="getCheckbox"  class="getCheckbox" checked/>' +
              '<span id="for-span-' +
              val.id +
              '" class="ml-4 for-span line-through">' +
              val.texts +
              "</span>" +
              '<button class="cross" data-id=' +
              val.id +
              ">&times;</button>" +
              "</li>"
          );
        });
      },
    });
  });
  //--------all done btn --------------

  //--------check all btn --------------
  $(document).on("click", "#checkAll", function () {
    $.ajax({
      url: "http://" + getUrl + "/checkAll.php",
      method: "POST",
      data: $(this).serialize(),
      success: function (data) {
        $getCheckbox = $(".getCheckbox");
        $getCheckbox.prop("checked", true);
        if ($getCheckbox.is(":checked")) {
          $getCheckbox.siblings(".for-span").addClass("line-through");
        }
        getText();
        $("#checkAll").html("Uncheck All");
        $("#checkAll").attr("id", "uncheckAll");
      },
    });
  });
  //--------check all btn --------------

  //--------uncheck all btn --------------
  $(document).on("click", "#uncheckAll", function () {
    $.ajax({
      url: "http://" + getUrl + "/uncheckAll.php",
      method: "POST",
      data: $(this).serialize(),
      success: function (data) {
        $getCheckbox = $(".getCheckbox");
        $getCheckbox.prop("checked", false);
        if (!$getCheckbox.is(":checked")) {
          $getCheckbox.siblings(".for-span").removeClass("line-through");
        }
        getText();
        $("#uncheckAll").html("Check All");
        $("#uncheckAll").attr("id", "checkAll");
      },
    });
  });
  //--------uncheck all btn --------------

  //-----------clear all done btn -----------
  $(document).on("click", "#cleardone", function () {
    $.ajax({
      url: "http://" + getUrl + "/clearCompleted.php",
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
  });
  //-----------clear all done btn -----------

  $(document).on("dblclick", ".for-span", function () {
    var tasklistId = $(this).siblings(".cross").data("id");
    var getVal = $(this).text();
    var input = `<form method="post" id="editForm" class="editForm"><input type="text" name="gettexts" class="form-control-edit" value="${getVal}"><button type="submit" class="hidden">Edit</button></form>`;
    $(this).text("");
    $(this).append(input);
    $(".form-control-edit").focus();
    $(this)
      .children(".editForm")
      .children(".form-control-edit")
      .blur(function (event) {
        event.preventDefault();
        var val = $(".form-control-edit").val();
        $.ajax({
          url: "http://" + getUrl + "/update.php",
          type: "POST",
          data: {
            tasklistId: tasklistId,
            gettexts: val,
          },
          success: function (response) {
            if (val.trim() != "") {
              $("#editForm").parent(".list-group-item .for-span").text(val);
            } else {
              $("#editForm").parent(".list-group-item .for-span").text(getVal);
            }
          },
        });
      });
  });

  function getText() {
    $.ajax({
      url: "http://" + getUrl + "/active.php",
      type: "GET",
      success: function (response) {
        $("#zero").html(response.data.length);
        if (response.data.length == "0") {
          $("#checkAll").html("Uncheck All");
          $("#checkAll").attr("id", "uncheckAll");
        } else {
          $("#uncheckAll").html("Check All");
          $("#uncheckAll").attr("id", "checkAll");
        }
      },
    });
  }
  getText();
});
