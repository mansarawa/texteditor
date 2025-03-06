
function Welcome() {
  
  return (
    <div className="h-screen flex gap-5  text-start align-start justify-start bg-gray-900 text-white p-4">
     
      <div className='w-full h-full flex flex-col pt-70'>

        <h1 className='w-full text-7xl pb-2  text-yellow-300 relative animated-underline '>WelCome To Text Editor</h1>
        <a href='/home' className='w-30 mt-7 p-2 border-2 border-amber-300 text-yellow-300 text-center rounded-xl cursor-pointer'>Go To Editor</a>
      </div>
    </div>
  )
}

export default Welcome