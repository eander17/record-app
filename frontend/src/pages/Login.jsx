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
      <section className='mx-0 my-4 px-1 py-0'>
        <section className='join-vertical join flex flex-col items-center text-center'>
          <div className='prose prose-xl text-center'>
            <h1 className='join-item mb-8 mr-6 mt-12   flex flex-row'>
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
                className='input-bordered input-accent input join-item w-full'
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
                className='input-bordered input-accent input join-item w-full'
                id='password'
                name='password'
                value={password}
                placeholder='Password'
                onChange={onChange}
              />
            </div>
            <button
              type='submit'
              className='btn-primary btn-block join-item btn'
            >
              Submit
            </button>
            <span className='join-item'>
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
