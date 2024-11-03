import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContextProvider } from "../reducer";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema } from '../utils/_types';
import { useEffect } from "react";

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(SignupSchema) });
    const { SignupUser, isAuthenticated } = useContextProvider();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        await SignupUser(data);
        navigate("/login")
    };

    useEffect(()=>{
        if(isAuthenticated){
            navigate("/links")
        }
    },[]);
    return (
        <div className="flex items-center justify-center mb-12">
            <div className="w-full max-w-md p-8 space-y-8 bg-[#181e29] rounded-xl shadow-2xl">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Create an Account</h1>
                    <p className="mt-2 text-[#C9CED6]">Sign up to get started</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="space-y-2">
                        <Label htmlFor="fullname" className="text-[#C9CED6]">
                            Full Name
                        </Label>
                        <div className="relative">
                            <Input
                                id="fullname"
                                placeholder="john_doe"
                                type="text"
                                {...register("fullname")}
                                className="pl-10 bg-[#353C4A] border-[#353C4A] text-white placeholder-[#C9CED6] focus:border-[#144EE3] focus:ring-[#144EE3]"
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C9CED6]" size={18} />
                        </div>
                        {errors.fullname && <p className='text-red-500 my-0'>{errors.fullname?.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#C9CED6]">
                            Email Address
                        </Label>
                        <div className="relative">
                            <Input
                                id="email"
                                placeholder="you@example.com"
                                type="email"
                                {...register("email")}
                                className="pl-10 bg-[#353C4A] border-[#353C4A] text-white placeholder-[#C9CED6] focus:border-[#144EE3] focus:ring-[#144EE3]"
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C9CED6]" size={18} />
                        </div>
                        {errors.email && <p className='text-red-500 my-0'>{errors.email?.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-[#C9CED6]">
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                placeholder="••••••••"
                                type="password"
                                {...register("password")}
                                className="pl-10 bg-[#353C4A] border-[#353C4A] text-white placeholder-[#C9CED6] focus:border-[#144EE3] focus:ring-[#144EE3]"
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C9CED6]" size={18} />
                        </div>
                        {errors.password && <p className='text-red-500 my-0'>{errors.password?.message}</p>}
                    </div>
                    <Button type="submit" className="w-full bg-[#144EE3] hover:bg-[#144EE3]/90 text-white">
                        Sign Up
                        <ArrowRight className="ml-2" size={18} />
                    </Button>
                </form>
                <p className="text-center text-[#C9CED6]">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#144EE3] hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    )
};

export default Signup;