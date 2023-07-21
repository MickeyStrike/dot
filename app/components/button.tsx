import React, { FC, FormEvent, FormEventHandler, MouseEvent } from 'react'

interface PropsButton {
  onClick: () => void,
  type: 'submit' | 'button',
  className?: string,
  text: string
}

const Button:FC<PropsButton> = ({ onClick, type, className, text }) => {

  const handleOnClick = () => {
    onClick()
  }

  const handleOnSubmit = (event: FormEvent<HTMLButtonElement>)  => {
    event.preventDefault();
    onClick()
  }

  return (
    <button
      type={type}
      className={'w-full font-semibold rounded-md max-xl:text-sm text-md p-1 px-3 border flex flex-row items-center justify-center gap-2 active:bg-slate-300' + className}
      onClick={() => type === 'button' ? handleOnClick() : undefined}
      onSubmit={(e) => type === 'submit' ? handleOnSubmit(e) : undefined }
    >
      {text}
  </button>
  )
}

export default Button;
