/** @format */

function Spinner() {
  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 bg-black z-50 flex justify-center items-center'>
      <div className='w-64 h-64 border-8 border-solid border-black border-rounded-lg animate-spin'></div>
    </div>
  )
}
export default Spinner
