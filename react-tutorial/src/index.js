import React from 'react'
import ReactDOM from 'react-dom'
import ApiApp from './Api'
import TableApp from './App'
import './index.css'


ReactDOM.render(<ApiApp />, document.getElementById('api_root'))
ReactDOM.render(<TableApp />, document.getElementById('table_root'))