function getUrlParameter (name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  var results = regex.exec(location.search)
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

$(document).ready(function () {
  getTodo()
  getEmails()

  $('#submit').click(function () {
    console.log(getUrlParameter('id'))
    if ($('#email').val() === '') {
      window.location = 'http://127.0.0.1:8080/edit.html' + window.location.search
    } else {
      $.ajax({
        url: 'http://localhost:3000/api//todo/update/' + getUrlParameter('id'),
        type: 'PUT',
        data: {
          todo: $('#todo').val(),
          UserId: $('#email').val()
        },
        success: function (data) {
          window.location = 'http://127.0.0.1:8080'
        }
      })
    }
  })
})

var todo = getUrlParameter('todo')
function getTodo () {
  document.getElementById('todo').value = todo
}

function getEmails () {
  $.get('http://localhost:3000/api/users', (users) => {
    users.forEach(function (user) {
      if (user.id == getUrlParameter('email')) {
        $('#email').append(`<option value="${user.id}" selected="selected">${user.email}</option>`)
      } else {
        $('#email').append(`<option value=${user.id}>${user.email}</option>`)
      }
    })
  })
}
