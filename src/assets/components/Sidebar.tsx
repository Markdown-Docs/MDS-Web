import { Sidebar } from "flowbite-react";
import { HiCloud, HiDocumentText } from "react-icons/hi";

interface AppSidebarProps {
    isOpen: boolean;
}

export default function AppSidebar({ isOpen }: AppSidebarProps) {
    return (
        <div
            className={`fixed top-0 left-0 h-full bg-gray-100 dark:bg-gray-800 transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                } shadow-lg`}
        >
            <Sidebar aria-label="Main Sidebar">
                <Sidebar.Items>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" icon={HiCloud}>
                            Link with Dropbox
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiCloud}>
                            Link with Google Drive
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup>
                        <Sidebar.Item href="#" icon={HiDocumentText}>
                            Document 1
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiDocumentText}>
                            Document 2
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
}
