/** @format */
import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
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
      <section className='my-4 mx-0 py-0 px-1'>
        <section className='join join-vertical text-center items-center flex flex-col'>
          <div className='prose prose-xl text-center'>
            <h1 className='join-item mr-6 flex flex-row   mb-8 mt-12'>
              <FaSignInAlt className='mt-1.5' />{' '}
              <span className='pl-2'>Login</span>
            </h1>
            <h3 className='join-item'>Build Your Collection</h3>
          </div>

          <form onSubmit={onSubmit}>
            <div className='mt-6 '>
              <input
                required
                type='email'
                className='input input-bordered input-accent join-item w-full'
                id='email'
                name='email'
                value={email}
                placeholder='Email'
                onChange={onChange}
              />
            </div>
            <div className='mb-4 mt-2'>
              <input
                required
                type='password'
                className='input input-bordered input-accent join-item w-full'
                id='password'
                name='password'
                value={password}
                placeholder='Password'
                onChange={onChange}
              />
            </div>
            <button
              type='submit'
              className='btn join-item btn-block btn-primary'
            >
              Submit
            </button>
            <span classname='join-item'>
              Not logged in? Click here to{' '}
              <Link
                to='/register'
                className='link hover:link-info'
              >
                Sign Up!
              </Link>{' '}
            </span>
          </form>
        </section>
      </section>
    </>
  )
}
export default Login
