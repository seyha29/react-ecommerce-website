import React from 'react'

const NewsLetterBox = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault(); // Corrected typo here
    }

    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'>
                Subscribe now & get 20% off 
            </p>
            <p className='text-gray-400 mt-3'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input className='w-full sm:flex-1 outline-none ' type='email' placeholder='Enter your email' required/>
                <button type='submit' className='bg-black text-white text-sx py-4 px-10'>SUBSCRIBE</button>
            </form>
        </div>
    )
}

export default NewsLetterBox
