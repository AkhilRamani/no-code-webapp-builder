import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="bg-gray-100/75 h-full flex">
            {/* <div className="w-1/5 bg-white border-r flex flex-col">
                <div className="py-5 border-b px-6">
                    <h1 className="text-xl font-semibold tracking-normal">Portals</h1>
                </div>
                <div className="flex flex-1 p-3 flex-col justify-between">
                    <div></div>
                    <Button variant='ghost' className="px-3 h-14 justify-start hover:bg-slate-100 rounded-lg flex items-center gap-3">
                        <Avatar>
                            <AvatarFallback className="bg-slate-200">AK</AvatarFallback>
                        </Avatar>
                        Akhil Ramani
                    </Button>
                </div>
            </div> */}

            <div className="px-16 py-10 flex-1">
                <div className="mb-8 flex justify-between items-center">
                    <h3 className="text-xl font-medium">My Portals</h3>
                    <Button className="gap-2 rounded-lg" size='sm'>
                        <Plus className="h-4 w-4" />
                        New portal
                    </Button>
                </div>
                <div className="flex gap-10">
                    <div>
                        <div className="w-80 h-56 bg-white rounded-xl shadow-lg border hover:-translate-y-1 transition-transform duration-300">
                        </div>
                        <h6 className="mt-3 opacity-90">Shipments</h6>
                    </div>
                    <div>
                        <div className="w-80 h-56 bg-white rounded-xl shadow-lg border hover:-translate-y-1 transition-transform duration-300">
                        </div>
                        <h6 className="mt-3 opacity-90">Untitled</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}