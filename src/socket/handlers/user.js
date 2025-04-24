const axios = require('axios');

module.exports = (io, socket) => {
  socket.on('registrar_usuario', async (data) => {
    try {
      const res = await axios.post('http://usuarios-service:80/users', data);
      socket.emit('registro_exitoso', res.data);
    } catch (error) {
      socket.emit('registro_error', error.response?.data || { error: 'Error al registrar usuario' });
    }
  });

  socket.on('login_usuario', async (data) => {
    try {
      const res = await axios.post('http://usuarios-service:80/login', data);
      socket.emit('login_exitoso', res.data);
    } catch (error) {
      socket.emit('login_error', error.response?.data || { error: 'Error al iniciar sesión' });
    }
  });

  socket.on('refresh_token', async (data) => {
    try {
      const res = await axios.post('http://usuarios-service:80/refresh', {}, {
        headers: { Authorization: `Bearer ${data.refreshToken}` }
      });
      socket.emit('refresh_exitoso', res.data);
    } catch (error) {
      socket.emit('refresh_error', error.response?.data || { error: 'Error al refrescar token' });
    }
  });

  socket.on('obtener_usuario', async (data) => {
    try {
      const res = await axios.get('http://usuarios-service:80/users/me', {
        headers: { Authorization: `Bearer ${data.token}` }
      });
      socket.emit('usuario_obtenido', res.data);
    } catch (error) {
      socket.emit('obtener_usuario_error', error.response?.data || { error: 'Error al obtener usuario' });
    }
  });
};
