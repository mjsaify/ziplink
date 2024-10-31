import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { BarChart, Calendar, Edit, Link2, MapPin, QrCode, Zap } from "lucide-react";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../components/ui/alert-dialog";
import { useState } from "react";

const Dashboard = () => {
    const user = {
        name: "Alice Johnson",
        email: "alice@example.com",
        joinDate: "January 2023",
        location: "New York, USA",
        website: "https://alice-johnson.com",
        avatar: "https://github.com/shadcn.png",
    };

    
  const [stats, setStats] = useState({
    totalLinks: 156,
    activeLinks: 86,
    totalClicks: 10444,
    qrScans: 1500,
    qrDownloads: 5587,
  })


    const StatItem = ({ icon: Icon, label, value }) => (
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center">
                <Icon className="w-8 h-8 mr-3 text-blue-500" />
                <span className="text-sm font-medium text-gray-300">{label}</span>
            </div>
            <span className="text-xl font-bold text-white">{value.toLocaleString()}</span>
        </div>
    )



    return (
        <main className="min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">User Profile & Settings</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 bg-grey border-grey-lite text-white">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                </Avatar>
                                <div>
                                    <CardTitle className="text-2xl">{user.name}</CardTitle>
                                    <CardDescription className="text-gray-400">{user.email}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="flex items-center text-gray-400">
                                    <Calendar className="h-5 w-5 mr-2" />
                                    <span>Joined {user.joinDate}</span>
                                </div>
                                <div className="flex items-center text-gray-400">
                                    <MapPin className="h-5 w-5 mr-2" />
                                    <span>{user.location}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-grey border-grey-lite text-white">
                        <CardHeader>
                            <CardTitle className="text-xl">Your Statistics</CardTitle>
                            <CardDescription className="text-gray-400">Link shortening activity</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <StatItem icon={Link2} label="Total Links" value={stats.totalLinks} />
                            <StatItem icon={Zap} label="Active Links" value={stats.activeLinks} />
                            <StatItem icon={BarChart} label="Total Clicks" value={stats.totalClicks} />
                            <StatItem icon={QrCode} label="QR Scans" value={stats.qrScans} />
                            <StatItem icon={QrCode} label="QR Downloads" value={stats.qrDownloads} />
                        </CardContent>
                    </Card>

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
                                    <form onSubmit={console.log("personal information")}>
                                        <div className="grid gap-6">
                                            <div className="grid gap-2">
                                                <Label htmlFor="name">Name</Label>
                                                <Input id="name" placeholder="Your full name" className="border-grey bg-grey-lite" />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input id="email" type="email" placeholder="Your email address" className="border-grey bg-grey-lite" />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="location">Location</Label>
                                                <Input id="location" placeholder="Your location" className="border-grey bg-grey-lite" />
                                            </div>
                                        </div>
                                        <Button type="submit" className="mt-6 bg-brand-primary-blue">Save Changes</Button>
                                    </form>
                                </TabsContent>
                                <TabsContent value="security">
                                    <form onSubmit={console.log("update password")} className="space-y-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="current-password">Current Password</Label>
                                            <Input id="current-password" type="password" className="border-grey bg-grey-lite" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="new-password">New Password</Label>
                                            <Input id="new-password" type="password" className="border-grey bg-grey-lite" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                                            <Input id="confirm-password" type="password" className="border-grey bg-grey-lite" />
                                        </div>
                                        <Button type="submit" className="bg-brand-primary-blue">Update Password</Button>
                                    </form>

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
                                                    <AlertDialogAction onClick={console.log("delete account")} className="bg-red-600 hover:bg-red-700">
                                                        Yes, delete my account
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
};

export default Dashboard;