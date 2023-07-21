"use client";

import React, { FormEvent, useState } from 'react'
import Input, { IOnChangeParams } from '../components/input'
import Button from '../components/button';
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { postLogin } from '@/services/frontend-services';

export interface DataForm {
  username: string,
  password: string
}

export default function Login() {

  const router = useRouter()

  const [dataForm, setDataForm] = useState<DataForm>({
    password: '',
    username: ''
  })

  const handleLogin = async (event?: FormEvent<HTMLFormElement>) => {
    try {
      if(event) event.preventDefault();
      const { data } = await postLogin(dataForm)
      console.log(data.message)
      if(data.message) {
        Swal.fire({
          title: 'Success!',
          text: 'Berhasil Login!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
      router.push('/products')
    } catch (err) {
      console.log(err, 'ini err')
      Swal.fire({
        title: 'Error!',
        text: 'Username / Password salah',
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }

  const changeInput = ({ name, value }: IOnChangeParams) => {
    setDataForm((prev) => ({ ...prev, ...{ [name]: value } }))
  }

  return (
    <div className='mx-auto max-w-xl h-screen flex justify-center items-center'>
      <div className='rounded-md border p-4'>
        <div className='font-bold'>Sign In</div>
        <div className='font-bold'>Hai, Welcome Back!</div>
        <div className='my-4'>
          <form onSubmit={handleLogin}>
            <div className='border p-2 rounded-md'>
              <Input
                name='username'
                placeholder='Username'
                type='text'
                value={dataForm.username}
                onChange={changeInput}
              />
            </div>
            <div className='border p-2 rounded-md mt-4'>
              <Input
                name='password'
                placeholder='Password'
                type='password'
                value={dataForm.password}
                onChange={changeInput}
              />
            </div>
            <Button
              text='Sign In'
              onClick={handleLogin}
              type='submit'
              className=' mt-8 p-2 bg-blue-500 text-white hover:bg-blue-600 hover:text-white'
            />
          </form>
        </div>
      </div>      
    </div>
  )
}
