import { Button } from "../ui/button"
import { WebhookIcon } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Switch } from "../ui/switch"

export const IntegrationsDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size='sm' variant='secondary' className="rounded-lg gap-2 text-muted-foreground hover:bg-slate-200 [&>svg]:hover:opacity-90 hover:text-primary">
                    <WebhookIcon className="h-[1.1rem] w-[1.1rem] opacity-70 shrink-0 stroke-[2.5]" />
                    Integrations
                </Button>
            </DialogTrigger>

            <DialogContent className="min-w-[70vw] h-5/6 flex flex-col !rounded-2xl p-0 gap-0">
                <DialogHeader className="px-5 py-5 border-b">
                    <DialogTitle>Integrations</DialogTitle>
                    <DialogDescription>
                        Manage your integrations
                    </DialogDescription>
                </DialogHeader>

                <div className="grow pt-7 px-5 flex overflow-auto w-full">
                    <div className="grid grid-cols-3 gap-5 w-full h-fit">

                        <div className="flex flex-1 gap-6 h-28 justify-between min-w-64 rounded-xl shadow-sm border border-slate-200 p-4 bg-gray-50/75">
                            <img src="/assets/mailchimp.svg" alt="placeholder" className="w-12 h-12" />
                            <div className="flex flex-col items-end h-full justify-between">
                                <h2 className="text-lg font-bold opacity-80">Mailchimp</h2>
                                <Switch defaultChecked />
                            </div>
                        </div>

                        <div className="flex flex-1 gap-6 h-28 justify-between min-w-64 rounded-xl shadow-sm border border-slate-200 p-4 bg-gray-50/75">
                            <img src="/assets/slack.png" alt="placeholder" className="w-10 h-10" />
                            <div className="flex flex-col items-end h-full justify-between">
                                <h2 className="text-lg font-bold opacity-80">Slack</h2>
                                <Switch />
                            </div>
                        </div>

                        <div className="flex flex-1 gap-6 h-28 justify-between min-w-64 rounded-xl shadow-sm border border-slate-200 p-4 bg-gray-50/75">
                            <img src="/assets/hubspot.png" alt="placeholder" className="w-11 h-11" />
                            <div className="flex flex-col items-end h-full justify-between">
                                <h2 className="text-lg font-bold opacity-80">HubSpot</h2>
                                <Switch defaultChecked />
                            </div>
                        </div>

                        <div className="flex flex-1 gap-6 h-28 justify-between min-w-64 rounded-xl shadow-sm border border-slate-200 p-4 bg-gray-50/75">
                            <img src="/assets/zapier.svg" alt="placeholder" className="w-10 h-10" />
                            <div className="flex flex-col items-end h-full justify-between">
                                <h2 className="text-lg font-bold opacity-80">Zapier</h2>
                                <Switch />
                            </div>
                        </div>

                    </div>
                </div>

                <DialogFooter className="flex items-center !justify-between px-5 py-5 ">
                    <p className="text-sm opacity-60">For now this is only for demo purposes.</p>
                    <DialogClose asChild>
                        <Button variant='destructive' className="rounded-lg tracking-wide font-semibold shadow mr-2">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}