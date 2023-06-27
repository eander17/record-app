/** @format */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

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
    const emptyFields =
      name === '' ||
      email === '' ||
      password === '' ||
      password2 === ''

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else if (emptyFields) {
      toast.error('Please fill in all fields')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='my-4 mx-0 py-0 px-1 mt-24'>
        <section className='join join-vertical text-center items-center flex flex-col'>
          <div className='prose prose-xl text-center'>
            <h1 className='flex flex-row mr-6 join-item'>
              <FaUser className='' />
              <span className='ml-2 mt-2'>Register</span>
            </h1>
            <span className=''>Please Create an Account</span>
          </div>

          <form
            onSubmit={onSubmit}
            className='join join-vertical '
          >
            <div className='mb-4 mt-2'>
              <input
                required
                type='text'
                className='join-item input input-bordered input-accent w-full'
                id='name'
                name='name'
                value={name}
                placeholder='Enter your name'
                onChange={onChange}
              />
            </div>
            <div className='mb-4 mt-2'>
              <input
                required
                type='email'
                className='join-item input input-bordered input-accent w-full'
                id='email'
                name='email'
                value={email}
                placeholder='Enter your email'
                onChange={onChange}
              />
            </div>
            <div className='mb-4 mt-2'>
              <input
                required
                type='password'
                className='join-item input input-bordered input-accent w-full'
                id='password'
                name='password'
                value={password}
                placeholder='Enter password'
                onChange={onChange}
              />
            </div>
            <div className='mb-4 mt-2'>
              <input
                required
                type='password'
                className='join-item input input-bordered input-accent w-full'
                id='password2'
                name='password2'
                value={password2}
                placeholder='Confirm password'
                onChange={onChange}
              />
            </div>
            <button
              type='submit'
              className='btn join-item btn-block btn-primary'
            >
              Submit
            </button>
            <span className='join-item'>
              Already have an account?{' '}
              <Link
                to='/login'
                className='link hover:link-info'
              >
                Login
              </Link>
            </span>
          </form>
        </section>
      </section>
    </>
  )
}
export default Register
