$(document).ready(function () {
  console.log('halooo')
  getEmails()

  $('#submit').click(function () {
    if ($('#email').val() === '') {
      window.location = 'http://127.0.0.1:8080/new.html'
    } else {
      $.ajax({
        url: 'http://localhost:3000/api/todo',
        type: 'POST',
        data: {
          todo: $('#todo').val(),
          email: $('#email').val()
        },
        success: function (data) {
          window.location = 'http://127.0.0.1:8080'
        }
      })
    }
  })
})

function getEmails () {
  $.get('http://localhost:3000/api/users', (users) => {
    users.forEach(function (user) {
      $('#email').append(`<option value=${user.id}>${user.email}</option>`)
    })
  })
}
