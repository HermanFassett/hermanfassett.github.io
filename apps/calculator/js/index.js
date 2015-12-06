var currentType = "dec";
var value = new Number(0);
var bitCount = 64;
$(document).ready(function() {
  update();
});
$(document).on("click", "[type='radio']", function() {
  var type = $(this).val();
  if (type.match(/[qdwb]/)) {
    switch(type) {
      case "q":
        bitCount = 64;
        break;
      case "d":
        bitCount = 32;
        break;
      case "w":
        bitCount = 16;
        break;
      case "b":
        bitCount = 8;
        break;
    }
  }
  var val;
  if (value.constructor === Binary)
    val = value.value;
  else val = value.toBinary().value;
  val = val.substr((val.length-bitCount < 0) ? 0 : val.length-bitCount);
  value = new Binary(val);
  if (type !== currentType && type.length > 1) {
    currentType = type;
  }
  $(".letter-box").find("input").each(function(i, e) {
    $(e).prop("disabled", false);
  });
  $(".number-box").find("input").each(function(i, e) {
    $(e).prop("disabled", false);
  });
  switch (currentType) {
    case "hex":
      value = value.toHex();
      break;
    case "dec":
      value = value.toDecimal() || value;
      $(".letter-box").find("input").each(function(i, e) {
        $(e).prop("disabled", true);
      });
      break;
    case "oct":
      value = value.toOctal();
      $(".letter-box").find("input").each(function(i, e) {
        $(e).prop("disabled", true);
      });
      $(".number-box").find("input").each(function(i, e) {
        if (e.value > 7)
          $(e).prop("disabled", true);
      });
      break;
    case "bin":
      if (value.constructor !== Binary)
        value = value.toBinary();
      $(".letter-box").find("input").each(function(i, e) {
        $(e).prop("disabled", true);
      });
      $(".number-box").find("input").each(function(i, e) {
        if (e.value > 1)
          $(e).prop("disabled", true);
      });
      break;
  }
  var output = value.toString();
  if (output.length === 0 || output == 0) output = "0";
  else output = output.slice(output.search(/[^0]/));
  $("#display").text(output);
  update();
});
$(document).on("click", "input", function() {
  var text = $(this).val();
  if (text.length === 1 && text.match(/[A-F\d]/)) {
    $("#display").text($("#display").text() + text);
    value.concat(text);
    if (value.constructor === Number) value = new Number(value.concat(text));
  }
  switch(text) {
    case "\u2190":
      $("#display").text(value.unshift());
      if (value.constructor === Number) value = new Number(value.unshift());
      break;
    case "C\u00ad":
      $("#display").text("0");
      value = Number(0);
      break;
  }
  update();
});
function update() {
  $("#display").bigText({
    verticalAlign: "top",
    horizontalAlign: "right"
  });
  var val = value.value;
  if (value.constructor !== Binary) {
    val = value.toBinary().value;
  }
  val = val.substr(val.indexOf("1")) || val;
  while (val.length < bitCount) {
    val = "0" + val;
  }
  val = val.substr(val.length-bitCount, bitCount);
  var len = val.length;
  var firstByte = val.substr(len-8, 8);
   $(".b").text(firstByte.substr(0,4) + " " +   firstByte.substr(4,4));
  if (bitCount >= 16) {
    var secondByte = val.substr(len-16, 8);
    $(".w").text(secondByte.substr(0,4) + " " + secondByte.substr(4,4));
  }
  else $(".w").text("0000 0000");
  if (bitCount >= 32) {
    var nextBytes = val.substr(len-32, 16);
    $(".d").each(function(i, e) {
      $(e).text(nextBytes.substr(8*i,4) + " " + nextBytes.substr(8*i+4,4));
    });
  }
  else $(".d").each(function(i, e) {$(e).text("0000 0000")});
  if (bitCount >= 64) {
    var nextBytes = val.substr(len-64, 32);
    $(".q").each(function(i, e) {
      $(e).text(nextBytes.substr(8*i,4) + " " + nextBytes.substr(8*i+4,4));
    });
  }
  else $(".q").each(function(i, e) {$(e).text("0000 0000")});
}
