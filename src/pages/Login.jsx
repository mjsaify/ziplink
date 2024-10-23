import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../utils/_types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContextProvider } from "../reducer";
import { toast } from "../hooks/use-toast";
import { useEffect } from "react";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "a@gmail.com",
            password: "123456"
        }, resolver: zodResolver(LoginSchema)
    });
    const { LoginUser, setIsAuthenticated, isAuthenticated } = useContextProvider();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        // make api call
        const response = await LoginUser(data)
        if (response.success) {
            localStorage.setItem("isAuthenticated", response.success); // Save in localStorage
            setIsAuthenticated(true);
            navigate("/dashboard");
            toast({
                title: response.message,
            });
        } else {
            toast({
                title: response.message,
            });
        };
    };

    useEffect(()=>{
        if(isAuthenticated){
            navigate("/dashboard")
        }
    },[])

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-md p-8 space-y-8 bg-[#181e29] rounded-xl shadow-2xl">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Login Now</h1>
                    <p className="mt-2 text-[#C9CED6]">Login to continue your journey</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                    <Button className="w-full bg-[#144EE3] hover:bg-[#144EE3]/90 text-white">
                        Login
                        <ArrowRight className="ml-2" size={18} />
                    </Button>
                </form>
                <p className="text-center text-[#C9CED6]">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="text-[#144EE3] hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login