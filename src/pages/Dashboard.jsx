/* eslint-disable react/prop-types */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { BarChart, Calendar, Link2, QrCode, Zap } from "lucide-react";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { useContextProvider } from "../reducer";
import { FormatDateandTime } from "../utils";
import { useEffect } from "react";
import AccountSettings from "../components/AccountSettings";

const Dashboard = () => {
    const { GetUserDetails, user, refetch } = useContextProvider();

    useEffect(() => {
        GetUserDetails()
    }, [refetch]);

    const findTotalClicks = user.url?.map((item) => item.clicks);
    const totalClicks = findTotalClicks?.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);

    const findTotalScans = user.url?.map((item) => item.qrCode.scans);
    const totalScans = findTotalScans?.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);

    const findTotalDownloads = user.url?.map((item) => item.qrCode.downloads);
    const totalDownloads = findTotalDownloads?.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);

    const fakeId = {
        name: "Alice Johnson",
        email: "alice@example.com",
        joinDate: user.createdAt, // fix this first
        location: "New York, USA",
        website: "https://alice-johnson.com",
        avatar: "https://github.com/shadcn.png",
    };



    const StatItem = ({ icon: Icon, label, value }) => (
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center">
                <Icon className="w-8 h-8 mr-3 text-blue-500" />
                <span className="text-sm font-medium text-gray-300">{label}</span>
            </div>
            <span className="text-xl font-bold text-white">{value}</span>
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
                                    <AvatarImage src={fakeId.avatar} alt={fakeId.name} />
                                </Avatar>
                                <div>
                                    <CardTitle className="text-2xl capitalize">{user.fullname}</CardTitle>
                                    <CardDescription className="text-gray-400">{user.email}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div className="flex items-center text-gray-400">
                                    <Calendar className="h-5 w-5 mr-2" />
                                    <span>Joined {FormatDateandTime(user.createdAt).split("at")[0]}</span>
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
                            <StatItem icon={Link2} label="Total Links" value={user?.url?.length} />
                            <StatItem icon={Zap} label="Active Links" value={user.url?.filter((item) => item.urlStatus === "active").length} />
                            <StatItem icon={BarChart} label="Total Clicks" value={totalClicks} />
                            <StatItem icon={QrCode} label="QR Scans" value={totalScans} />
                            <StatItem icon={QrCode} label="QR Downloads" value={totalDownloads?.toString()} />
                        </CardContent>
                    </Card>
                    <AccountSettings id={user._id}/>
                </div>
            </div>
        </main>
    )
};

export default Dashboard;