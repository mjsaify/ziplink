/* eslint-disable react/prop-types */
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
import DatePicker from "./DatePicker"
import SelectComp from "./SelectComp"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useEffect } from "react"
import { useContextProvider } from "../reducer"

const EditUrl = ({ urlStatus, expiresAt, urlId }) => {
    const { UpdateShortUrl } = useContextProvider()
    const formSchema = z.object({
        expiresAt: z.date().optional(),
        urlStatus: z.string().optional()
    });
    const form = useForm({
        resolver: zodResolver(formSchema), defaultValues: {
            expiresAt: new Date(),
            urlStatus
        }
    });

    useEffect(() => {
        if (expiresAt) { // expiresAt/urlStautus initially is undefined, when actual value arrives in expiresAt/urlStautus it updates the form value
            form.setValue("expiresAt", new Date(expiresAt))
        };
        if (urlStatus) {
            form.setValue("urlStatus", urlStatus)
        }
    }, [form, expiresAt, urlStatus])

    const onSubmit = async (data) => {
        await UpdateShortUrl(data, urlId);
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-brand-primary-blue text-white border-none">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-grey text-white border-grey-lite">
                <DialogHeader>
                    <DialogTitle>Edit URL</DialogTitle>
                    <DialogDescription>
                        Make changes to url
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                        <FormField
                            control={form.control}
                            name="urlStatus"
                            render={({ field }) => (
                                <FormItem className="flex items-center mb-2">
                                    <FormLabel className="w-[40%]">URL Status</FormLabel>
                                    <SelectComp field={field} urlStatus={urlStatus} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="expiresAt"
                            render={({ field }) => (
                                <FormItem className="flex items-center mt-2">
                                    <FormLabel className="w-[40%]">Expires At</FormLabel>
                                    <DatePicker field={field} expiresAt={expiresAt} />
                                    <FormMessage />
                                </FormItem>
                            )
                            }
                        />
                        <DialogFooter>
                            <Button type="submit" className="bg-brand-primary-blue mt-6">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
export default EditUrl;