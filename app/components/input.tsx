import React, { FC } from 'react'

export interface IOnChangeParams {
  name: string,
  value: string
}

interface PropsInput {
  onChange: (onChangeParams: IOnChangeParams) => void,
  placeholder: string,
  type: 'text' | 'password',
  className?: string,
  value: undefined | string,
  name: string
}

const Input:FC<PropsInput> = ({ onChange, placeholder, type, className, value, name }) => {
  return (
    <input
      value={value}
      className={'md:ml-4 bg-transparent focus:outline-none w-96 max-md:w-full' + className}
      type={type}
      placeholder={placeholder}
      onChange={(e) => {
        onChange({name, value: e.target.value})
      }}
    />
  )
}

export default Input;
