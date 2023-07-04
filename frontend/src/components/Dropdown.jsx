/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/** @format */

import { useEffect } from 'react'
import { themeChange } from 'theme-change'

// todo - set theme on button hover for each button in dropdown

// TEST - is theme persistent?

function Dropdown() {
  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <div className='dropdown dropdown-end mx-4 mb-4'>
      <span
        tabIndex={0}
        className='btn m-1'
      >
        Themes
      </span>
      <ul
        tabIndex={0}
        className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow'
      >
        <li>
          <button
            type='button'
            data-set-theme='cupcake'
            data-act-class='ACTIVECLASS'
          >
            light
          </button>
        </li>
        <li>
          <button
            type='button'
            data-set-theme='dark'
            data-act-class='ACTIVECLASS'
          >
            dark
          </button>
        </li>
        <li>
          <button
            type='button'
            data-set-theme='coffee'
            data-act-class='ACTIVECLASS'
          >
            coffee
          </button>
        </li>
        <li>
          <button
            type='button'
            data-set-theme='dracula'
            data-act-class='ACTIVECLASS'
          >
            dracula
          </button>
        </li>
        <li>
          <button
            type='button'
            data-set-theme='luxury'
            data-act-class='ACTIVECLASS'
          >
            luxury
          </button>
        </li>{' '}
        <li>
          <button
            type='button'
            data-set-theme='retro'
            data-act-class='ACTIVECLASS'
          >
            retro
          </button>
        </li>{' '}
        <li>
          <button
            type='button'
            data-set-theme='business'
            data-act-class='ACTIVECLASS'
          >
            business
          </button>
        </li>{' '}
        <li>
          <button
            type='button'
            data-set-theme='halloween'
            data-act-class='ACTIVECLASS'
          >
            halloween
          </button>
        </li>
        <li>
          <button
            type='button'
            data-set-theme='aqua'
            data-act-class='ACTIVECLASS'
          >
            aqua
          </button>
        </li>{' '}
        <li>
          <button
            type='button'
            data-set-theme='cyberpunk'
            data-act-class='ACTIVECLASS'
          >
            cyberpunk
          </button>
        </li>{' '}
        <li>
          <button
            type='button'
            data-set-theme='night'
            data-act-class='ACTIVECLASS'
          >
            night
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Dropdown
