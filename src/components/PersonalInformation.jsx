/* eslint-disable react/prop-types */
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useContextProvider } from '../reducer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateUserNameAndEmail } from '../utils/_types';
import { toast } from '../hooks/use-toast';

const PersonalInformation = ({ id }) => {
    const { UpdateUserDetails, loading } = useContextProvider();
    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: zodResolver(UpdateUserNameAndEmail)});

    const updateDetails = async (data) =>{
        const response = await UpdateUserDetails(data, id);
        if(!response.success){
            return toast({
                title: response.message,
                variant: "destructive"
            })
        }
        toast({
            title: response.message,
        })
    };


    return (
        <form onSubmit={handleSubmit(updateDetails)} noValidate>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="fullname" placeholder="Your full name" className="border-grey bg-grey-lite" {...register("fullname")} />
                    {errors.fullname && <p className='text-red-500 my-0'>{errors.fullname?.message}</p>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email address" className="border-grey bg-grey-lite" {...register("email")} />
                    {errors.email && <p className='text-red-500 my-0'>{errors.email?.message}</p>}
                </div>
            </div>
            <Button type="submit" className="mt-6 bg-brand-primary-blue" disabled={loading}>
                { loading ? "Saving..." : "Save Changes"}
            </Button>
        </form>
    )
}

export default PersonalInformation