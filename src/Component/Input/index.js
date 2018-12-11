import React from 'react'
import classes from './style.module.scss'

const Input = ({ value, label, setValue }) => (
  <div className={classes.container}>
    <input type='text' required
      className={classes.input}
      onChange={(e) => setValue(e.target.value)}
      onMouseDown={(e) => { e.stopPropagation() }}
      onKeyDown={(e) => { e.stopPropagation() }}
      value={value}
    />
    <label className={classes.label}>{label}</label>
  </div>
)

const TextArea = ({ value, label, setValue }) => (
  <div className={classes.container}>
    <textarea className={classes.textarea} rows='2' required
      onKeyDown={(e) => { e.stopPropagation() }}
      onMouseDown={(e) => { e.stopPropagation() }}
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
    <label className={classes.label}>{label}</label>
  </div>
)

export { Input, TextArea }
