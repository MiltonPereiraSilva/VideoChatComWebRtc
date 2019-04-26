var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function(requisicao, resposta) {
    resposta.sendFile(__dirname + '/index.html');
});

var mensagens = [];

io.on('connection', function(socket) {
    if (mensagens.length) {
        socket.emit('mensagensRecebidas', mensagens);
    }

    socket.on('mensagemEnviada', mensagem => {
        mensagens.push(mensagem);
        socket.broadcast.emit('mensagemRecebida', mensagem);
    });

    socket.on('conviteEnviado', convite => {
        mensagens.push(convite);
        socket.broadcast.emit('conviteRecebido', convite);
    })
})