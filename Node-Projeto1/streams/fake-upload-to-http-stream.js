import { Readable } from 'node:stream'
const api = ''


class OneToHundredStream extends Readable {
  index = 1

  _read(){
    const i = this.index++;

    setTimeout(() => {
      if(i <= 5) {
        const buff = Buffer.from(String(i))
        
        this.push(buff)
      } else {
        this.push(null)
      }
    }, 1000)
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half' // adicione essa linha
}).then(response => {
  return response.text()
}).then(data => {
  console.log(data)
})