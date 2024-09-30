import { AvatarImage } from '@/components/ui/avatar'
import { colors, getColor } from '@/lib/utils'
import { useAppStore } from '@/store'
import { Avatar } from '@radix-ui/react-avatar'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5"
import { FaPlus, FaTrash } from "react-icons/fa"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Profile = () => {
    const navigate = useNavigate()
    const { userInfo, setUserInfo } = useAppStore()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [image, setImage] = useState(null)
    const [hovered, setHovered] = useState(false)
    const [selectedColor, setSelectedColor] = useState(0)

    const saveChanges = async () => { }

    return (
        <div className='flex justify-center items-center flex-col gap-10 h-[100vh] bg-[#1b1c24]'>
            <div className="flex flex-col gap-10 w-[80vw] md:w-max">

                <div>
                    <IoArrowBack className='text-4xl lg:text-6xl text-white/90 cursor-pointer' />
                </div>

                <div className='grid grid-cols-2'>
                    <div className='h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center'
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <Avatar className='h-32 w-33 md:h-48 rounded-full overflow-hidden'>
                            {image ? (<AvatarImage src={image} alt="profile" className="object-cover w-full h-full bg-black" />) : (<div className={` uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex justify-center items-center rounded-full ${getColor(selectedColor)}`} >
                                {firstName ? firstName.split("").shift() : userInfo.email.split("").shift()}
                            </div>)}
                        </Avatar>
                        {hovered && <div className='absolute inset-0 flex justify-center items-center bg-black/50 rounded-full cursor-pointer'> {image ? <FaTrash className='text-white text-3xl cursor-pointer' /> : <FaPlus className='text-white text-3xl cursor-pointer' />}</div>}

                        {/* <input type="text" /> */}
                    </div>

                    <div className='flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center'>
                        <div className='w-full'>
                            <Input placeholder="Email" type="email" value={userInfo.email} disabled className="rounded-lg p-6 mb-3 bg-[#2c2e3b] border-none" />
                            <Input placeholder="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="rounded-lg p-6 mb-3 bg-[#2c2e3b] border-none" />
                            <Input placeholder="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="rounded-lg p-6 mb-3 bg-[#2c2e3b] border-none" />
                        </div>


                        <div className='w-full flex gap-5'>
                            {
                                colors.map((color, index) => (
                                    <div
                                        className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 
                                        ${selectedColor === index ? "outline outline-white/50 outline-1" : ""
                                            }}`}
                                        key={index} onClick={() => setSelectedColor(index)}></div>
                                ))
                            }

                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <Button className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" onClick={saveChanges}>
                        Save Changes
                    </Button>
                </div>
            </div >
        </div >
    )
}

export default Profile