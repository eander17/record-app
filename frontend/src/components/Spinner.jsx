/** @format */

function Spinner() {
  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black'>
      <div className='border-rounded-lg h-64 w-64 animate-spin border-8 border-solid border-black' />
    </div>
  )
}
export default Spinner
