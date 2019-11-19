const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            // console.log(data)
            // const info = JSON.parse(data)
            const info = data

            if (info.error) {
                messageOne.textContent = info.error
            } else {
                messageOne.textContent = info.location
                messageTwo.textContent = info.forecast
            }
        })
    })
})