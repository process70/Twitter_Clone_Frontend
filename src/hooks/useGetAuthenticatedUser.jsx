import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { logoutPersist } from './usePersist'

const useGetAuthenticatedUser = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    
    const {data: user, isSuccess, isLoading} = useQuery({
        queryKey: ['authUser'],
        queryFn: async() => {
            try {
                const res = await fetch('/users/getCurrentUser', {
                    method: 'GET'
                })
                const data = await res.json()

                if(!res.ok) throw new Error(data.message || "Something went wrong")

                return data.user

            } catch (error) {
                throw new Error(error);
            }
        },
        onError: (error) => {
			toast.error(error.message || "An error occurred during getting current user.");
		},
    })

    const {mutate: editUser, data: editedUser, isSuccess: editSuccess} = useMutation({
        mutationFn: async(user) => {
            try {
                const formData = new FormData()
                formData.append('username' , user.username)
                formData.append('fullName' , user.fullName)
                formData.append('email' , user.email)
                formData.append('newPassword' , user.newPassword)
                formData.append('bio' , user.bio)
                formData.append('link' , user.link)
                formData.append('profileImg' , user.profileImg)
                formData.append('coverImg' , user.coverImg)
                console.log(formData)
                const res = await fetch(`/users/update`, {
                    method: 'PATCH',
                    body: formData
                })

                const data = await res.json()

                if(!res.ok) {
                    console.log(data.message)
                    throw new Error(data.message)
                }
                
                return data

            } catch (err) {
                throw new Error(err.message)
            }
        }, 
        onError: (error) => {
            toast.error(error.message)
            console.log(error.message + " "+error.name)
        },  
        onSuccess: (data) => {
            console.log(data)
            toast.success('profile updated')
            // if(data.loginAgain) logout()
            queryClient.invalidateQueries('userProfile')
        }
    })

    const { mutate: logout } = useMutation({
		mutationFn: async () => {
			try {
				const res = await fetch("/auth/logout", {
					method: "POST",
					credentials: "include"
				});
				const data = await res.json();

				if (!res.ok) {
					 console.log("failed to logout")
					 throw new Error(data.message || "Something went wrong");
				}

				console.log("getting response message: "+data.message)

				return data
				
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			toast.success("Logout Successfully");
			logoutPersist()
			navigate('/login')
		},
		onError: (error) => {
			toast.error("Logout failed");
			console.error(error.message);
		},
	});

  return { user, isSuccess, isLoading, editUser, editSuccess, logout}
}

export default useGetAuthenticatedUser