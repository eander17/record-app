/// only allow numbers to a max of 4 digits not exceeding current year
export default function useHandleYearInput(onChange) {
  const handleYearChange = useCallback(
    (e) => {
      const { value } = e.target
      const yearRegex = /^[0-9\b]+$/

      if (value === '' || yearRegex.test(value)) {
        onChange(e, 'year')
      }
    },
    [onChange],
  )
  return handleYearChange
}
