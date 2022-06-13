const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showTask = async () => {

  console.log('called showtask',id)
  try {
    const {
      data: { task },
    } = await axios.get(`/api/v1/tasks/${id}`)

    const { taskID, completed, name } = task
    // console.log(task.data.args)
    // console.log(id);
    taskIDDOM.innerHTML = taskID
    taskNameDOM.value = name
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }
   
    // return task
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // code
  console.log("DOMContentLoaded")
  showTask()
});




editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {

    
    const taskName = taskNameDOM.value
    const taskCompleted = taskCompletedDOM.checked

    const {
      data: { task },

   
    } = await axios.patch(`/api/v1/tasks/${id}`, {
      
      name: taskName,
      completed: taskCompleted,
    })

    console.log(task)

    const { taskID, completed, name,_id } = task

    console.log("inside patch",task)

    editBtnDOM.textContent= _id
    taskNameDOM.value = name
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }
    // task.data();
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited task`
    formAlertDOM.classList.add('text-success')
    // return task
  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
