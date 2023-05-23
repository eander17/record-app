/** @format */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
      <section className='flex flex-col mt-12'>
        <h1 className='flex flex-row justify-center align-center mr-6'>
          <FaUser className='mt-1.5' />
          <span className='px-1 text-midnight_blue'>Register</span>
        </h1>
        <h3 className=''>Please Create an Account</h3>
      </section>

      <section className='w-4/5 my-0 mx-auto'>
        <form
          onSubmit={onSubmit}
          className='flex flex-col justify-center items-center'
        >
          <input
            required
            type='text'
            className='my-1 mt-4'
            id='name'
            name='name'
            value={name}
            placeholder='Enter your name'
            onChange={onChange}
          />
          <input
            required
            type='text'
            className='my-1'
            id='email'
            name='email'
            value={email}
            placeholder='Enter your email'
            onChange={onChange}
          />
          <input
            required
            type='password'
            className='my-1'
            id='password'
            name='password'
            value={password}
            placeholder='Enter password'
            onChange={onChange}
          />
          <input
            required
            type='password'
            className='my-1 mb-4'
            id='password2'
            name='password2'
            value={password2}
            placeholder='Confirm password'
            onChange={onChange}
          />
          <button
            type='submit'
            className='btn'
          >
            Submit
          </button>
        </form>
      </section>
    </>
  )
}
export default Register
