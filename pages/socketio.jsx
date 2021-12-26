import { useEffect } from 'react'
import * as React from "react";
import io from 'socket.io-client'

export default () => {
  const [value, setValue] = React.useState("default")
  useEffect(() => {
    fetch('/api/socketio').finally(() => {
      const socket = io()

      socket.on('connect', () => {
        console.log('connect')
        socket.emit('hello')
      })

      socket.on('hello', data => {
        console.log(data)
      })

      socket.on('a user connected', () => {
        console.log('a user connected')
      })

      socket.on('get_log', data => {
        console.log("a raised_exception", data)
        setValue(data)
      })

      socket.on('disconnect', () => {
        console.log('disconnect')
      })
    })
  }, []) // Added [] as useEffect filter so it will be executed only once, when component is mounted

  return <h1>{value}</h1>
}