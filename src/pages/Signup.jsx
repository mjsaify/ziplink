import { useState } from "react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { SignupInitialValues } from "../utils/_constants";
import { useContextProvider } from "../reducer";

const Signup = () => {
    const [formData, setFormData] = useState(SignupInitialValues);
    const { SignupUser } = useContextProvider();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        await SignupUser(formData);  
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-8 bg-[#181e29] rounded-xl shadow-2xl">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">Create an Account</h1>
                    <p className="mt-2 text-[#C9CED6]">Sign up to get started</p>
                </div>
                <form className="space-y-6" onSubmit={handleSignup}>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#C9CED6]">
                            Email Address
                        </Label>
                        <div className="relative">
                            <Input
                                id="email"
                                name="email"
                                placeholder="you@example.com"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="pl-10 bg-[#353C4A] border-[#353C4A] text-white placeholder-[#C9CED6] focus:border-[#144EE3] focus:ring-[#144EE3]"
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C9CED6]" size={18} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-[#C9CED6]">
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="pl-10 bg-[#353C4A] border-[#353C4A] text-white placeholder-[#C9CED6] focus:border-[#144EE3] focus:ring-[#144EE3]"
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C9CED6]" size={18} />
                        </div>
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