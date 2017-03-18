// function check() {
//     document.getElementById("myCheck").checked = true
// }
$(document).ready(() => {
  loadTodoData()
})

let loadTodoData = () => {
  $.ajax({
    url: 'http://localhost:3000/api/todos',
    type: 'GET',
    success: (response) => {
      $('#memo').empty()
      var count = 1
      var status = ''
      var buttonBaper = ''
      response.forEach((memo) => {
        if (memo.status == 0) {
          status = 'uncompleted'
          buttonBaper = 'completed'
        } else {
          status = 'completed'
          buttonBaper = 'uncompleted'
        }
        $('#memo').append(`<tr id="row-${memo.id}">
        <td>${count}</td>
        <td>${memo.todo}</td>
        <td>${memo.User.email}</td>
        <td id='status-${memo.id}'><button class="btn-${status}" id='btn-${memo.id}' onclick="${buttonBaper}Todo(${memo.id})">${status}</button></td>
        <td><button class="btn-delete" onclick="removeTodo(${memo.id})">Delete</button>
        <button class="btn-edit" onclick="editTodo(${memo.id})">Edit</button></td></tr>`)
        count++
      })
    }
  })
}

let editTodo = (id) => {
  $.ajax({
    url: `http://localhost:3000/api/todo/${id}`,
    type: 'GET',
    success: (response) => {
      console.log(response)
      window.location = `http://127.0.0.1:8080/edit.html?id=${id}&email=${response.UserId}&todo=${response.todo}&status=${response.status}`
    }
  })
}

let completedTodo = (id) => {
  $.ajax({
    url: `http://localhost:3000/api/todo/${id}`,
    type: 'PUT',
    data: {status: 1},
    success: () => {
      $(`#status-${id}`).empty()
      $(`#status-${id}`).html(`<button class="btn-completed" onclick="uncompletedTodo(${id})">completed</button>`)
    }
  })
}

let uncompletedTodo = (id) => {
  $.ajax({
    url: `http://localhost:3000/api/todo/${id}`,
    type: 'PUT',
    data: {status: 0},
    success: () => {
      $(`#status-${id}`).empty()
      $(`#status-${id}`).html(`<button class="btn-uncompleted" onclick="completedTodo(${id})">uncompleted</button>`)
    }
  })
}

let removeTodo = (id) => {
  swal({
    title: 'Are you sure?',
    text: 'You will not be able to recover this imaginary file!',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, delete it!',
    closeOnConfirm: false
  },
    function () {
      $.ajax({
        url: `http://localhost:3000/api/todo/${id}`,
        type: 'DELETE',
        success: () => {
          $(this).parent().parent('tr').remove()
          loadTodoData()
        }
      })
      swal('Deleted!', 'Your imaginary file has been deleted.', 'success')
    })
}
