/** @format */
import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    // reset the state
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='flex flex-col justify-center  my-4 mx-0 py-0 px-1'>
        <h1 className='mr-6 flex flex-row justify-center align-center text-4xl mb-8 mt-12 font-bold text-secondary dark:text-fuschia-custom'>
          <FaSignInAlt className='mt-1.5' />{' '}
          <span className='pl-2'>Login</span>
        </h1>
        <h3 className='sub-heading'>Build Your Collection</h3>
      </section>

      <section className='w-4/5 my-0 mx-auto'>
        <form onSubmit={onSubmit}>
          <div className='mt-6 '>
            <input
              type='text'
              className=''
              id='email'
              name='email'
              value={email}
              placeholder='Email'
              onChange={onChange}
            />
          </div>
          <div className='mb-4 mt-2'>
            <input
              type='password'
              className=' '
              id='password'
              name='password'
              value={password}
              placeholder='Password'
              onChange={onChange}
            />
          </div>
          <div>
            <button
              type='submit'
              className='btn'
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}
export default Login
