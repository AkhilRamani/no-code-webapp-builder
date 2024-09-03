import { PagesSidebar } from "@/components/common/PagesSidebar";

export default function ProtectedPagesLayout({ children }: { children: React.ReactNode }) {
    return (<div className="flex h-full">
        <PagesSidebar />
        <div className="flex-1">
            {children}
        </div>
    </div>)
}