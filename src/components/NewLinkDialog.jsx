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
import { useForm } from "react-hook-form"
import { UrlSchema } from "../utils/_types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useContextProvider } from "../reducer"


const NewLinkDialog = () => {
    const { register, formState: { errors }, handleSubmit } = useForm({ resolver: zodResolver(UrlSchema) });
    const { GenerateShortUri } = useContextProvider();

    const onSubmit = async (data) => {
        await GenerateShortUri(data);
    }

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
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="grid gap-4 py-4">
                        <div className="items-center gap-4">
                            <Input
                                id="title"
                                placeholder="Url Title"
                                className="col-span-3 text-white border-2 border-grey-lite bg-grey"
                                {...register("title")}
                            />
                            {errors.title && <p className='text-red-500 my-0'>{errors.title?.message}</p>}
                        </div>
                        <div className="items-center gap-4">
                            <Input
                                id="originalUrl"
                                placeholder="Enter your long url"
                                className="col-span-3 text-white border-2 border-grey-lite bg-grey"
                                {...register("originalUrl")}
                            />
                            {errors.originalUrl && <p className='text-red-500 my-0'>{errors.originalUrl?.message}</p>}
                        </div>
                        <div className="flex items-center gap-4">
                            <Input
                                className="col-span-3 text-white border-2 border-grey-lite bg-grey w-[38%]"
                                value="ziplink.com"
                                readOnly
                            />
                            /
                            <Input
                                id="customLink"
                                placeholder="Custom link (optional)"
                                className="col-span-3 text-white border-2 border-grey-lite bg-grey"
                                {...register("customLink")}
                            />
                        </div>
                        <DialogFooter>
                            <Button className="bg-brand-primary-blue text-white">Create</Button>
                        </DialogFooter>
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    )
}
export default NewLinkDialog