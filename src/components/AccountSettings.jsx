/* eslint-disable react/prop-types */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../components/ui/alert-dialog";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import PersonalInformation from "./PersonalInformation";
import ChangePassword from "./ChangePassword";
import { useContextProvider } from "../reducer";
import { toast } from "../hooks/use-toast";

const AccountSettings = ({ id }) => {
    const { DeleteUserAccount, setIsAuthenticated, loading } = useContextProvider();

    const handleDeleteAccount = async () =>{
        const response = await DeleteUserAccount(id);
        if(!response.success){
            return toast({
                title: response.message,
            });
        };

        setIsAuthenticated(false)
        localStorage.removeItem("isAuthenticated");
        toast({
            title: response.message,
        })
    }

    return (
        <Card className="lg:col-span-3 bg-grey border-grey-lite text-white">
            <CardHeader>
                <CardTitle className="text-2xl">Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="personal" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8 bg-grey hover:bg-grey-lite">
                        <TabsTrigger value="personal">Personal Information</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                    </TabsList>
                    <TabsContent value="personal">
                        <PersonalInformation id={id}/>
                    </TabsContent>
                    <TabsContent value="security">
                        <ChangePassword id={id}/>
                        <div className="mt-10 pt-6 border-t border-gray-700">
                            <h3 className="text-lg font-semibold mb-4">Delete Account</h3>
                            <p className="text-sm text-gray-400 mb-4">
                                Once you delete your account, there is no going back. Please be certain.
                            </p>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive">Delete Account</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-gray-800 text-white">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription className="text-gray-400">
                                            This action cannot be undone. This will permanently delete your
                                            account and remove your data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="bg-gray-700 text-white hover:bg-gray-600">Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                                            { loading ? "Deleting..." : "Yes, delete my account"}
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

export default AccountSettings