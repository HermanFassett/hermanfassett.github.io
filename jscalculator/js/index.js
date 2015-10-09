
$(document).ready(function(){
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
      // Enter key
      case 13:
        $("#btnEqual").click();
        break;
      // C key
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
function btnClick(e) {
  alert("Hi");
}
