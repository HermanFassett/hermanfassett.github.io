$(document).ready(function() {
  var rows = 3;
  var columns = 3;
  $("#btn-ok").click(function() {
    $(".dialog").css("display", "none");
  });
  $(document).keydown(function(e) {
    if (e.ctrlKey && e.keyCode === 13) {
      var rows = $(".row");
      var matrix = [];
      for (var i = 0; i < rows.children().length; i++) {
        matrix.push(rows.children().eq(i).text());
      }
      rref(matrix);
    }
    else if (e.ctrlKey && e.keyCode === 81) {
      $(".dialog").css("display", "block");
    }
  })
  $(document).on("keydown", ".element", function(e) {
    switch (e.keyCode) {
      case 13:
        addRow();
        e.preventDefault();
        break;
      case 32:
        addColumn();
        $(this).next().focus();
        e.preventDefault();
        break;
    }
    fixWidth($(this).parent());
  });
  $(document).on("keyup", ".element", function(e) {
    switch (e.keyCode) {
      case 46:
        if (columns > 1 && !e.ctrlKey) {
          deleteColumn(this);
        }
        else if(rows > 1 && e.ctrlKey) {
          deleteRow(this);
        }
        break;
      case 37:
        $(this).prev().focus();
        break;
      case 39:
        $(this).next().focus();
        break;
      case 40:
        $(this).parent().next().focus();
        break;
    }
  });
  function addElement(row) {
    $(row).append("<div class='element' contenteditable></div>");
  }
  function addColumn() {
    var index = $(".element:focus").index() + 1;
    columns++;
    var rows = $(".row");
    for (var i = 0; i < rows.length; i++) {
      addElement(rows[i]);
    }
  }
  function deleteColumn(elem) {
    $(elem).prev().focus();
    var rows = $(".row");
    for (var i = 0; i < rows.length; i++)
      $(rows[i]).children().eq($(elem).index()).remove();
    $(elem).remove();
    columns--;
  }
  function addRow() {
    $(".matrix").append("<div class='row'></div>");
    var rows = $(".row");
    for (var i = 0; i < columns; i++)
      addElement(rows[rows.length - 1]);
    rows++;
  }
  function deleteRow(elem) {
    var parentIndex = $(elem).parent().index();
    $($(".row")[parentIndex]).remove();
    (parentIndex === 0) ? parentIndex = 0 : parentIndex--;
    $($(".row")[parentIndex]).children().eq($(elem).index()).focus();
    rows--;
  }
  function fixWidth(parent) {
    var rows = $(".row"), index = $(parent).index(), row = rows[index];
    for (var i = 0; i < $(row).children().length; i++) {
      for (var j = 0; j < rows.length; j++) {
        $(rows[j]).children().eq(i).width($(row).children().eq(i).width());
      }
    }
  }
  var identity = function() {
    // i = index, j = current row, k = current index of row
    for (var arr=[], i=0, j=0, k=1; i<rows*columns; i++, k++) {
      if (i%rows === 0) {
        j++;
        k = 1;
      }
      if (k === j) arr.push(1);
      else arr.push(0);
    }
    return arr;
  }
  function rref(matrix) {
    var IDENTITY = identity();
    console.log(IDENTITY);
    if (matrix === IDENTITY) console.log(true);
  }
});
