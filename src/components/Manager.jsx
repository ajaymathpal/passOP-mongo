import React, { useRef, useState, useEffect } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: '', username: '', password: '' })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch('https://pass-op-mongo-api.vercel.app/')
        let passwords = await req.json()
        console.log(passwords)
        setpasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()

    }, [])


    const showPassword = () => {
        if (ref.current.src.includes('icons/eyecross.png')) {
            ref.current.src = 'icons/eye.png'
            passwordRef.current.type = 'password'
        }
        else {
            ref.current.src = 'icons/eyecross.png'
            passwordRef.current.type = 'text'
        }
    }

    const savePassword = async () => {
        if (form.site === '' || form.username === '' || form.password === '') {
            toast.error('Please fill all the fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
        else {
            
            console.log("hello")
            setform({ site: '', username: '', password: '' })
            setform({ site: '', username: '', password: '' })
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            // localStorage.setItem('passwords', JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            await fetch('https://pass-op-mongo-api.vercel.app/', { method: 'POST', body: JSON.stringify({ ...form, id: uuidv4() }), headers: { "Content-Type": "application/json" } })

            // console.log([...passwordArray, form])



            
            
            toast.success('Password Saved !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    }

    const deletePassword = async (id) => {
        toast.success('Password Deleted !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
        let confirm = window.confirm('Are you sure you want to delete this password ?')
        if (confirm) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem('passwords', JSON.stringify(passwordArray.filter(item => item.id !== id)))
            let res = await fetch('https://pass-op-mongo-api.vercel.app/', { method: 'DELETE', body: JSON.stringify({ id }), headers: { "Content-Type": "application/json" } })
        }
        // console.log([...passwordArray, form])
    }
    const editPassword = async(id) => {
        setform({ ...passwordArray.filter(item => item.id === id)[0], id: id })
        setpasswordArray(passwordArray.filter(item => item.id !== id))
        // localStorage.setItem('passwords', JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        // console.log([...passwordArray, form])
        await fetch('https://pass-op-mongo-api.vercel.app/', { method: 'DELETE', body: JSON.stringify({ id: form.id }), headers: { "Content-Type": "application/json" } })
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast.success('Copied to clipboard !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });

        // navigator.clipboard.writeText(text)
        if (document.hasFocus()) {
            navigator.clipboard.writeText(text).catch(err => console.error('Clipboard write failed', err));
        } else {
            console.error('Document is not focused');
        }


    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />


            <div className="absolute inset-0 -z-10 h-full w-full "><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className='p-20 sm:pt-20 md:mycontainer lg:p-20'>
                <h1 className='text-4xl text-center font-bold'>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own password manager</p>
                <div className=' flex flex-col p-4 text-black gap-8 items-center'>

                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full px-4 py-1' type='text' name='site' id='site' />

                    <div className='flex flex-col md:flex-row w-full justify-between gap-8'>

                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full px-4 py-1' type='text' name='username' id='username' />

                        <div className='relative'>

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full px-4 py-1' type='password' name='password' id='password' />

                            <span className='absolute right-[3px] top-[8px] cursor-pointer' onClick={() => { showPassword() }}>

                                <img ref={ref} className='p-1' width={26} src='icons/eyecross.png' />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-500 gap-2 border-2 border-green-900 hover:bg-green-400 rounded-full px-8 py-2 w-fit'>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover">
                        </lord-icon>
                        Save Password</button>
                </div>
                <div className='passwords pb-5 '>
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <p className='text-center text-lg text-green-900'>No Passwords Saved</p>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full overflow-hidden rounded-md">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className=' py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <img onClick={() => { copyText(item.site) }} className='pl-[3px] pt-[3px] cursor-pointer w-8' alt="" loading="eager" src="https://media.lordicon.com/icons/system/regular/99-copy.svg" />
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'>
                                                {item.username}
                                                <img onClick={() => { copyText(item.username) }} className='pl-[3px] pt-[3px] cursor-pointer w-8' alt="" loading="eager" src="https://media.lordicon.com/icons/system/regular/99-copy.svg" />
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center'>
                                                {"*".repeat(item.password.length)}
                                                <img onClick={() => { copyText(item.password) }} className='pl-[3px] pt-[3px] cursor-pointer w-8' alt="" loading="eager" src="https://media.lordicon.com/icons/system/regular/99-copy.svg" />
                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center'>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/exymduqj.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }

                </div>
            </div>
        </>
    )
}

export default Manager
