
$(document).ready(function(){
  function btnClick(e) {
    $("#display").text($("#display").text() + $(e).text());
  }
  $("#btn0,#btn1,#btn2,#btn3,#btn4,#btn5,#btn6,#btn7,#btn8,#btn9").click(function(){
    btnClick(this)
  });
  $("#btnEqual").click(function() {alert("hi");});
  $("#btnDot").click(function(){});
  $("#btnAdd").click(function(){});
  $("#btnMinus").click(function(){});
  $("#btnC").click(function(){
    $("#display").text("0");
  })
  $("#btnDiv").click(function(){});
  $("#btnMult").click(function(){});
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
      case 51:
      case 99:
        $("#btn3").click();
        break;
      case 52:
      case 100:
        $("#btn4").click();
        break;
      case 53:
      case 101:
        $("#btn5").click();
        break;
      case 54:
      case 102:
        $("#btn6").click();
        break;
      case 55:
      case 103:
        $("#btn7").click();
        break;
      case 56:
      case 104:
        $("#btn8").click();
        break;
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
        $("#btnPlus").click();
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
      case 56:
        if (e.shiftKey)
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
