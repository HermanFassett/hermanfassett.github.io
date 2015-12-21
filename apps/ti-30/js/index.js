var expression = "";
var calculated = false;
$(document).ready(function(){
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
