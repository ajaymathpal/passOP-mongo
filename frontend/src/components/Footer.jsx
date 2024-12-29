import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col items-center justify-center py-1 fixed bottom-0 w-full'>
            <div className='logo font-bold text-2xl'>
                <span className='text-green-500'>&lt;</span>
                Pass
                <span className='text-green-500'>OP/&gt;</span>
            </div>
            <div className='flex justify-center items-center'>
                Created with <img className="w-[1.75rem] mx-2" src='icons/heart.png' /> by Ajay
            </div>
        </div>
    )
}

export default Footer
