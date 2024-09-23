import React from 'react'

function Home() {
    return (
        <div className=' border h-[50px] p-1 gap-2 flex  '>
            <label htmlFor="" className='text-3xl'>Enter project</label>
            <input type="text" className=' border border-black ' />
            <button type='submit' className='border border-black bg-red-400 text-2xl font-bold text-white p-1 '>Submit</button>
        </div>
    )
}

export default Home
