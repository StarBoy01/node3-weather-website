const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    messageOne.textContent = "loading Results"
    messageTwo.textContent = ""
    const location = searchElement.value
    const url = "/weather?location=" + location
    fetch(url).then((response) =>{
    response.json().then((data)=>{
        if (data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = "You searched for the wearher in " + data.location
            messageTwo.textContent = "Your Result: " + data.forcast
        }
    })
})
})
