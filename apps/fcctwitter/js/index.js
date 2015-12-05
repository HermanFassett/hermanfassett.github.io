$(document).on("click", "#search-btn", function() {
  var baseurl = "https://api.twitter.com/1.1/search/tweets.json?q=";
  var cred = "AAAAAAAAAAAAAAAAAAAAAMAyjAAAAAAAmM14m5DJ1lpPBmUVQuD%2BqMBu7AU%3DjCMYtcqepuWVRUxYdLItQcOj1NqzM1u7UPXh6xCai6g3dduT9K";
  var query = $("#search-txt").val();
  $.ajax({
    type: "GET",
    url: baseurl + query,
    dataType: "json",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + cred);
    },
    success: function(data, status) {
      console.log("Success!!");
      console.log(data);
      console.log(status);
    },
    error: function(xhr, desc, err) {
      console.log(xhr);
      console.log("Desc: " + desc + "\nErr: " + err);
    }
  }).done(function(data) {
    console.log(data);
  });
});
