import { useAppStore } from '@/store'
import React from 'react'

const Profile = () => {
    const { userInfo } = useAppStore()
    return (
        <div>Profile
            <h1>
                {userInfo.email}
            </h1>
        </div>
    )
}

export default Profile