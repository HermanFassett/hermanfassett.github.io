(function($) {
  var status = null;
  var loading = false;
  var accounts = ["freecodecamp", "streamerhouse", "storbeck", "monstercat", "noobs2ninjas", "MedryBW"];
  $(document).ready(function() {
    $('.modal-trigger').leanModal();
    try {
      var a = JSON.parse(localStorage["twitchtvaccountslist"]);
      if (a !== null && a.length) accounts = a;
      else accounts = ["hermanfassett"];
    }
    catch (err) {
        console.log(err)
    }
    changeStatus(); // First time load
    function changeStatus() {
      if ($("#online:checked").length === 1 && $("#offline:checked").length === 0) status = true;
      else if ($("#online:checked").length === 0 && $("#offline:checked").length === 1) status = false;
      else if ($("#online:checked").length === 0 && $("#offline:checked").length === 0)status = 0;
      else status = null;
      if (!loading) load(status, $("#search").val());
    }
    $("#online, #offline").click(function(e) {
      changeStatus();
    });
    $("#search").keyup(function(e) {
      changeStatus();
    });
    $("#add").click(function() {
      var account = $("#icon_prefix").val();
      if (accounts.indexOf(account) === -1)
        accounts.push($("#icon_prefix").val());
      else {
        accounts.splice(accounts.indexOf(account), 1);
      }
      localStorage["twitchtvaccountslist"] = JSON.stringify(accounts);
      changeStatus();
    });
  });
  var load = function(arg, keyword) {
    $("#users").html("");
    for (var i = 0; i < accounts.length; i++) {
      if (accounts[i].indexOf(keyword) !== -1 && arg !== 0)
        getStream(accounts[i], arg);
    }
  }
  var getStream = function(username, arg) {
    $("#loader").removeClass("hide");
    var logoUrl = "", channelUrl = "", streaming = "_off", description = " - Offline"; // Description (if streaming)
    loading = true;
    $.when(
      $.getJSON("https://api.twitch.tv/kraken/channels/" + username),
      $.getJSON("https://api.twitch.tv/kraken/streams/" + username)
    ).done(function(channel, stream) {
      logoUrl = channel[0].logo;
      channelUrl = channel[0].url;
      if (stream[0].stream !== null) {
        streaming = "";
        description = stream[0].stream.channel.status;
      }
      if ((arg && streaming === "") || (!arg && streaming === "_off") || arg === null) {
        $("#users").append('<li class="collection-item avatar">' +
                              '<i class="circle"><img src="' + logoUrl +'" style="max-width:100%"></i>' +
                              '<span class="title"><a href="' + channelUrl + '" target="_blank">' + username + '</a></span>' +
                              '<p>' + description + '</p>' +
                              '<a href="' + channelUrl + '" target="_blank" class="secondary-content">' +
                                '<i class="material-icons">videocam' + streaming + '</i>' +
                              '</a>' +
                            '</li>');
      }
      loading = false;
      $("#loader").addClass("hide");
    });
  }
})(jQuery)
