
// FETCH API SYNTAX 
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=!').then( (response) => {
//     response.json().then((data) => {
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data)
//         }
//     })
// })

window.onload = initAll 
function initAll(){
    setAllElements()
}

function setAllElements(){
    const weatherForm = document.querySelector('form')
    const messageOne = document.querySelector('#message-1')
    const messageTwo = document.querySelector('#message-2')
    
    weatherForm.addEventListener('submit', (event) => {
        event.preventDefault()
        
        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''
        
        const location = document.querySelector('input').value
 
        console.log(location)

        fetch('http://localhost:3000/weather?address='+location).then((response) => {
            response.json().then((data) => {
                    if(data.error){
                    messageOne.textContent = data.error
                }else{
                    messageOne.textContent = data.place
                    messageTwo.textContent = data.forecast
                }
            })
        })
    })
}