/* eslint-disable react/prop-types */
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useContextProvider } from '../reducer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateUserPassword } from '../utils/_types';
import { toast } from '../hooks/use-toast';


const ChangePassword = ({ id }) => {
    const { UpdatePassword, setIsAuthenticated } = useContextProvider();
    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: zodResolver(UpdateUserPassword) });


    const updatePassword = async (pass) => {
        const response = await UpdatePassword(pass, id);
        if (!response.success) {
            return toast({
                title: response.message
            })
        };


        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
        return toast({
            title: response.message
        })

    }


    return (
        <form onSubmit={handleSubmit(updatePassword)} className="space-y-6" noValidate>
            <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="newPassword" type="password" className="border-grey bg-grey-lite" {...register("newPassword")} />
                {errors.newPassword && <p className='text-red-500 my-0'>{errors.newPassword?.message}</p>}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" className="border-grey bg-grey-lite" {...register("confirmPassword")} />
                {errors.confirmPassword && <p className='text-red-500 my-0'>{errors.confirmPassword?.message}</p>}
            </div>
            <Button type="submit" className="bg-brand-primary-blue">Update Password</Button>
        </form>
    )
}

export default ChangePassword