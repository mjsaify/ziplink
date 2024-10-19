import { z } from 'zod';
import { useState } from "react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { SignupInitialValues } from "../utils/_constants";
import { useContextProvider } from "../reducer";
import { SignupSchema } from "../utils/_types";

const Signup = () => {
    const [formData, setFormData] = useState(SignupInitialValues);
    const [formDataError, setFormDataError] = useState({});
    const { SignupUser, inputErrors } = useContextProvider();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        try {
            SignupSchema.pick({ [name]: true }).parse({ [name]: value });
            setFormDataError({ ...formDataError, [name]: "" });
        } catch (error) {
            if (error instanceof z.ZodError) {
                setFormDataError({ ...formDataError, [name]: error.errors[0].message });
            }
        }
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const parsedInputs = SignupSchema.safeParse(formData);
            if (!parsedInputs.success) {
                const errors = parsedInputs.error.format(); // This variable holds the error data, which is available immediately after the parsing function runs. 
                // setFormDataError(errors); // Update state with errors
                console.log(errors.email); // Log the errors directly
                // Stop execution here
                return;
            }
            await SignupUser(formData);
        } catch (error) {
            console.error("Error during signup:", error);
        }
    };

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
                        {formDataError.email && <p style={{ color: "red" }}>{formDataError.email}</p>}
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
                        {formDataError.password && <p style={{ color: "red" }}>{formDataError.password}</p>}
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