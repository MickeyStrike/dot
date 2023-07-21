import React, { FC } from 'react'
import Image from 'next/image'
import Button from './button'

interface ICard {
  title: string,
  imgSrc: string,
  handleClick: (id: number) => void,
  id: number
}

const Card:FC<ICard> = ({ title, imgSrc, handleClick, id }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className='flex flex-row items-center justify-center align-center h-[300px]'>
        <Image width={200} height={200} src={imgSrc} alt={title} />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div className='px-6 py-4'>
        <Button
          onClick={() => handleClick(id)}
          type='button'
          text='Buy Now'
          className=' p-2 bg-blue-500 text-white hover:bg-blue-600 hover:text-white'
        />
      </div>
    </div>
  )
}

export default Card;
