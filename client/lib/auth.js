if (localStorage.getItem('token')) {
  $("#beforeLogin").hide()
  $("#createRepoForm").show()
  $(".showAgain").show()
} else {
  $("#beforeLogin").show()
  $("#createRepoForm").hide()
  $(".showAgain").hide()
}

if (localStorage.getItem('token')) {
  $("#signIn").hide() && $("#signOut").show()
} else {
  $("#signOut").hide() && $("#signIn").show()
}

$("#signOut").click(() => {
  $.ajax({
    url: 'http://localhost:4000/api/gsignout',
    type: 'POST',
    data: { token: localStorage.getItem('token') }
  })
    .done((data) => {
      localStorage.removeItem('token')
      $("#signOut").hide()
      $("#signIn").show()
      $("#beforeLogin").show()
      $("#createRepoForm").hide()
      $(".showAgain").hide()
    })
    .fail(() => {
      console.log(`err`)
    })

})

function onSignIn(googleUser) {
  if (localStorage.getItem('token')) {
    $("#signIn").hide() && $("#signOut").show()
  }
  else {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
      url: 'http://localhost:4000/api/gsignin',
      type: 'POST',
      data: { id_token: id_token }
    })
      // ngecek datanya masuk apa ga
      .done((data) => {
        localStorage.setItem('token', data.data)
        $("#signOut").show()
        $("#signIn").hide()
        $("#beforeLogin").hide()
        $(".showAgain").show()
      })
      .fail(() => {
        console.log(`err`)
      })
  }
}