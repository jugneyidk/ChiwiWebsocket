const axios = require('axios');

module.exports = (io, socket) => {

  socket.on('enviar_mensaje', async (data) => {
    try {
      const res = await axios.post('http://chats-service-mongo:80/messages', data, {
        headers: { Authorization: `Bearer ${data.token}` }
      });

      socket.emit('mensaje_enviado', res.data);
      const receptorId = data.receiverId;
      io.emit(`nuevo_mensaje_${receptorId}`, res.data.content);

    } catch (error) {
      socket.emit('mensaje_error', error.response?.data || { error: 'Error al enviar mensaje' });
    }
  });

  socket.on('listar_mensajes_conversacion', async (data) => {
    try {
      const res = await axios.get(`http://chats-service-mongo:80/conversations/${data.conversationId}/messages`, {
        headers: { Authorization: `Bearer ${data.token}` },
        data: { limit: data.limit || 15, beforeDate: data.beforeDate || null }
      });
      socket.emit('mensajes_listados', res.data);
    } catch (error) {
      socket.emit('mensajes_error', error.response?.data || { error: 'Error al obtener mensajes' });
    }
  });

  socket.on('obtener_conversacion', async (data) => {
    try {
      const res = await axios.get(`http://chats-service-mongo:80/conversations/${data.conversationId}`, {
        headers: { Authorization: `Bearer ${data.token}` }
      });
      socket.emit('conversacion_obtenida', res.data);
    } catch (error) {
      socket.emit('conversacion_error', error.response?.data || { error: 'Error al obtener conversación' });
    }
  });

  socket.on('listar_conversaciones', async (data) => {
    try {
      const res = await axios.get('http://chats-service-mongo:80/conversations', {
        headers: { Authorization: `Bearer ${data.token}` }
      });
      socket.emit('conversaciones_listadas', res.data);
    } catch (error) {
      socket.emit('conversaciones_error', error.response?.data || { error: 'Error al listar conversaciones' });
    }
  });

  socket.on('crear_conversacion', async (data) => {
    try {
      const res = await axios.post('http://chats-service-mongo:80/conversations', data, {
        headers: { Authorization: `Bearer ${data.token}` }
      });
      socket.emit('conversacion_creada', res.data);
      
      const receptorId = data.userId;
      io.emit(`nueva_conversacion_${receptorId}`, res.data);

      if ('initialMessage' in res.data)
        io.emit(`nuevo_mensaje_${receptorId}`, res.data.initialMessage);
      
    } catch (error) {
      socket.emit('crear_conversacion_error', error.response?.data || { error: 'Error al crear conversación' });
    }
  });

};
