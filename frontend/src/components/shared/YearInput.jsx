import { useState } from 'react'

function YearInput({ placeholder }) {
  const [value, setValue] = useState('')
 

  const handleChange = (e) => {
    const inputValue = e.target.value

    // if (
    //   inputValue === '' ||
    //   (inputValue.length <= 4 &&
    //     !isNaN(inputValue) &&
    //     inputValue >= min &&
    //     inputValue <= max)
    // ) {}
    
    if (inputValue.length <= 4 && !isNaN(inputValue)){
      setValue(inputValue)
    }
  }

  return (
    <input
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  )
}

export default YearInput
