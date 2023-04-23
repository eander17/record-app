// socketMiddleware.js

import socket from '../socket' // Import your socket instance

const socketMiddleware = (store) => (next) => (action) => {
  if (action.type === 'socket/emit') {
    const { event, payload } = action;
    socket.emit(event, payload);
  }

  if (action.type === 'socket/on') {
    const { event, handler } = action;
    socket.on(event, handler);
  }

  return next(action);
};

export default socketMiddleware;
