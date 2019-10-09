const { ipcRenderer } = require('electron')
const uuid = require('uuid/v4')
const textbox = document.getElementById('chat')
const render = document.getElementById('render')
const sessionID = uuid()

ipcRenderer.send('startDialogflow')

window.onkeypress = (event) => {
  if (event.keyCode === 13 && textbox.value !== '') {
    window.scrollBy(0, 100)
    ipcRenderer.send('send', [sessionID, textbox.value])
    render.innerHTML += `<div class="row">
    <div class="col-sm-1">
    </div>
    <div class="message col-sm-11">
        <hr />
          <div class="name"><b>User</b></div>
          <div class="content">${textbox.value}</div>
      </div>
  </div>`
    textbox.value = ''
    window.scrollBy(0, 100)
  }
}

ipcRenderer.on('response', (_event, arg) => {
  window.scrollBy(0, 100)
  render.innerHTML += `<div class="row">
  <div class="col-sm-1">
    <img src="./img/profile.png" height="100px">
  </div>
  <div class="message col-sm-11">
      <hr />
        <div class="bot-name"><b>봇냥이</b></div>
        <div class="content">${arg}</div>
    </div>
</div>`
  window.scrollBy(0, 100)
})
