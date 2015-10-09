var expression = "";
var calculated = false;
$(document).ready(function(){
  function funcClick(e) {
    var i = expression.charAt(expression.length - 1);
    var j = $("#display").text();
    if (i != "+" && i != "-" && i != "/" && i != "*" && j != "" && j != "0") {
      if (calculated) {
        expression = $("#display").text();
      }
      calculated = true;
      expression += $(e).text();
      $("#display").text($(e).text());
    }
  }
  function btnClick(e) {
    if (calculated || $("#display").text() === "0") {
      $("#display").text("");
      calculated = false;
    }
    if ($("#display").text().replace(".","").length < 8) {
      $("#display").text($("#display").text() + $(e).text());
      expression += $(e).text();
    }
  }
  $("#btn0,#btn1,#btn2,#btn3,#btn4,#btn5,#btn6,#btn7,#btn8,#btn9").click(function(){
    btnClick(this)
  });
  $("#btnEqual").click(function() {
    $("#display").text(eval(expression));
    calculated = true;
    expression = "";
  });
  $("#btnDot").click(function(){
    if (!$("#display").text().includes("."))
      btnClick(this);
  });
  $("#btnAdd").click(function(){
    funcClick(this);
  });
  $("#btnMinus").click(function(){
    funcClick(this);
  });
  $("#btnDiv").click(function(){
    funcClick(this);
  });
  $("#btnMult").click(function(){
    funcClick(this);
  });
  $("#btnC").click(function(){
    $("#display").text("0");
    expression = "";
  })
  $(document).keyup(function(e) {
    var key = String.fromCharCode(e.keyCode);
    switch(e.which) {
      // 0
      case 48:
      case 96:
        $("#btn0").click();
        break;
      // 1
      case 49:
      case 97:
        $("#btn1").click();
        break;
      // 2
      case 50:
      case 98:
        $("#btn2").click();
        break;
      // 3
      case 51:
      case 99:
        $("#btn3").click();
        break;
      // 4
      case 52:
      case 100:
        $("#btn4").click();
        break;
      // 5
      case 53:
      case 101:
        $("#btn5").click();
        break;
      // 6
      case 54:
      case 102:
        $("#btn6").click();
        break;
      // 7
      case 55:
      case 103:
        $("#btn7").click();
        break;
      // 8 and mult
      case 56:
        if (!e.shiftKey)
          $("#btn8").click();
        else
          $("#btnMult").click();
        break;
      // 8
      case 104:
        $("#btn8").click();
        break;
      // 9
      case 57:
      case 105:
        $("#btn9").click();
        break;
      // Enter key
      case 13:
        $("#btnEqual").click();
        break;
      // C and Numpad clear keys
      case 46:
      case 67:
        $("#btnC").click();
        break;
      // + key
      case 187:
      case 107:
        $("#btnAdd").click();
        break;
      // - key
      case 189:
      case 109:
        $("#btnMinus").click();
        break;
      // * key
      case 107:
        $("#btnMult").click();
        break;
      // / key
      case 111:
      case 191:
        $("#btnDiv").click();
        break;
        // . key
      case 190:
      case 110:
        $("#btnDot").click();
        break;
    }
  });
});
