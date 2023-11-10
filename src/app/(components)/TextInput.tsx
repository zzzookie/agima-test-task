import React, { type ChangeEvent } from 'react'

interface TextInputProps {
  type?: string
  name: string
  value: string
  placeholder: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function TextInput ({ type = 'text', name, value, placeholder, handleChange }: TextInputProps): JSX.Element {
  return (
    <div className="form__group">
      <input
        type={type}
        value={value}
        onChange={handleChange}
        id={`form__${name}`}
        name={name}
        className={`form__${name}`}
        placeholder=" "
        required
      />
      <label htmlFor={`form__${name}`} className="form__input-label">{placeholder}</label>
    </div>
  )
}
