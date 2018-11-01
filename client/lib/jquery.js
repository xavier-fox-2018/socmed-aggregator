(function() {

  $("#createRepoForm").hide()
  $("#createRepoToggle").click(() => {
    $("#all").children().fadeOut(200).hide()
    $("#createRepoForm").delay(200).fadeIn(200)
  })

  $("#showBack").click(() => {
    $("#createRepoForm").fadeOut(200)
    $(".showAgain").delay(200).fadeIn(200)
  })

  $("#search").keyup((text) => {
    $('.eachData').each(function (i, obj) {
      let eachObj = $(obj).text().split('\n')[1].trim()
      eachObj.indexOf($("#search").val()) !== -1 ?
      $(this).fadeIn(150) :
      $(this).fadeOut(150)
    });
  })

  // ? CREATING REPOSITORY
  $("#submitCreateRepo").click(() => {
    // console.log(JSON.stringify(dataToPost))

    $.ajax({
      method: "POST",
      url: "http://localhost:4000/api/repo",
      data: {
        "name": $("#inputName").val(),
        "description": $("#inputDescription").val(),
        "homepage": $("#inputHomepage").val(),
        "private": $("#inputPrivate").prop("checked")
      }
    })
      .done(function () {
          alert("Success");
      })
      .fail(function () {
        alert("error");
      })
  })

  // ? ALL USERS
  $("#7h30x, #dmtrxw, #abdulmukmin, #senecamanu").click(function() {
    // clearing everything first
    $("#repos").empty()
    $("#eachRepo").empty()
    $("#UserImg").empty()
    
    $.getJSON(`http://localhost:4000/api/${this.id}`)
      .done(function (data) {
        // insert profile picture
        $("#userImg").replaceWith(`<img src="${data[0].owner.avatar_url}" class="rounded mx-auto float-right" width="40" height="40">`)
        for (let i in data) {
          // EACH DATA
          let eachData = `
          <div id="${data[i].id}" class="${data[i].owner.login} eachData">
            <h1 id="eachDataTitle">${data[i].name}</h1>
            <p>${data[i].owner.login}</p>
            <p>${data[i].description}</p>
            <p><a href="${data[i].languages_url}">${data[i].language} (see more)</a></p>
            <p><a href="${data[i].stargazers_url}" target="blank">💫  ${data[i].stargazers_count}</a> | <a href="#" target="blank">👁  ${data[i].watchers}</a> | <a href="${data[i].html_url}"  target="blank">Github</a></p>
            <hr>
          </div>
        `

          $("#repos").append(eachData)
          $(`#${data[i].id}`).click(function () {
            $('#eachRepo').children().hide()
            $(`#${data[i].id}f`).fadeIn()
          })

          let eachFull = `
          <div id="${data[i].id}f">
            <h1>${data[i].name} <img src="${data[i].owner.avatar_url}" class="rounded mx-auto float-right" height="100" width="100"></h1>
            <br>
            <h4>${data[i].owner.login} </h4>
            <hr>
            <h5>Description:</h5>
            <p>${data[i].description}</p>
            <br>
            <p><a href="${data[i].languages_url}">${data[i].language} (see more)</a></p>
            <p><a href="${data[i].stargazers_url}" target="blank">💫  ${data[i].stargazers_count}</a> | <a href="#" target="blank">👁  ${data[i].watchers}</a> | <a href="${data[i].html_url}"  target="blank">Github</a></p>
          </div>
        `
          $("#eachRepo").append(eachFull)
          $(`#${data[i].id}f`).hide()

        }

      });
  })

  $("#senecamanu").click();
})();
