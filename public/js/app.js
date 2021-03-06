const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne =  document.querySelector('#message-one')
const messageTwo =  document.querySelector('#message-two')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    fetch(`/weather?city=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = data.forecast
                messageTwo.textContent = data.name
            }
        })
    })
})

