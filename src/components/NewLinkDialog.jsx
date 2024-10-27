import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const NewLinkDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="border-none bg-brand-primary-blue text-white">Create New Link</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-grey border-2 border-grey-lite text-white">
                <DialogHeader>
                    <DialogTitle>Create URL</DialogTitle>
                    <DialogDescription>
                        Make your custom short URL in seconds!. Click create when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="items-center gap-4">
                        <Input
                            id="name"
                            placeholder="Url Title"
                            className="col-span-3 text-white border-2 border-grey-lite bg-grey"
                        />
                    </div>
                    <div className="items-center gap-4">
                        <Input
                            id="username"
                            placeholder="Enter your long url"
                            className="col-span-3 text-white border-2 border-grey-lite bg-grey"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Input
                            id="username"
                            className="col-span-3 text-white border-2 border-grey-lite bg-grey w-[38%]"
                            value="ziplink.com"
                            readOnly
                        />
                        /
                        <Input
                            id="username"
                            placeholder="Custom link (optional)"
                            className="col-span-3 text-white border-2 border-grey-lite bg-grey"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="bg-brand-primary-blue text-white">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default NewLinkDialog