const app = require('express')()
const http = require('http').createServer(app)
const cors = require('cors')
const req = require('express/lib/request')
const res = require('express/lib/response')
const { Socket } = require('socket.io')
const PORT = 3000

//Create Server Side socket
const io = require('socket.io')(http)

app.use(cors())

//Default Express GET
app.get("/", (req, res) => {
    res.send("<h1>Welcome to Socker Programming</h1>")
})

//Get index.html
app.get("/index.html", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

//Accept client request
io.on('connection', (socket) => {
    console.log('Connection created....')
    //console.log(socket.id)
    //console.log(socket)

    //Send welcome message
    socket.emit('welcome', `Welcome to Chat. Your ID is ${socket.id}`)

    //New message from client
    socket.on('message', (data) => {
        //These will send to current client
        //socket.emit('newMessage', data)

        //These will send to all the client including sender
        const msg = {
            sender: socket.id,
            message: data
        }
       //io.sockets.emit('newMessage', msg)

       //These will send to all the client except sender
       socket.broadcast.emit('newMessage', msg)
    })

    //Join New room
    socket.on('join', (roomName) => {
        socket.join(roomName)
        //Send all client 
        const msg = {
            sender: socket.id,
            message: 'Joined the room successfully'
        }
        io.sockets.emit('newMessage', msg)
    })

    socket.on('room_message', (data) => {
        //console.log(data)
        const msg = {
            sender: socket.id,
            message: data.message
        }
        //Direct message/1-to-1 message using socket ID
        //socket.broadcast.to('socketidtosend').emit('message', msg)
        //io.to('socketidtosend').emit('message', msg)

        //To all client in room
        socket.broadcast.to(data.room).emit('newMessage', msg)
    })

    //Dicsonected
    socket.on('disconnect', () => {
        console.log(`${socket.id} Client Disconnected...`)
    })
})

//Start HTTP server
http.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`)
})





 