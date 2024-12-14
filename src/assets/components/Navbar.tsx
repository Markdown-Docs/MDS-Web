import { Navbar, Button } from "flowbite-react";
import { HiMenu, HiUpload, HiTrash, HiSun, HiMoon, HiPlus } from "react-icons/hi";
import { useFileStore } from "../../stores/fileStore";

interface AppNavbarProps {
  toggleSidebar: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
  onUpload: () => void;
  onDelete: () => void;
  onCreate: () => void;
  additionalActions?: React.ReactNode;
}

export default function AppNavbar({
  toggleSidebar,
  toggleTheme,
  isDarkMode,
  onUpload,
  onDelete,
  onCreate,
  additionalActions,
}: AppNavbarProps) {
    const { fileId, increment, decrement } = useFileStore();

    return (
        <Navbar fluid rounded>
            <div className="flex justify-between w-full">
                {/* ЛЕВАЯ ЧАСТЬ */}
                <div className="flex items-center gap-4">
                    <Button onClick={toggleSidebar} className="flex items-center">
                        <HiMenu className="mr-2" />
                        Menu
                    </Button>
                </div>

                {/* ЦЕНТР */}
                <div className="flex items-center gap-4">
                    <Button onClick={decrement}>-</Button>
                    <span className="text-xl font-bold text-white">File #{fileId}</span>
                    <Button onClick={increment}>+</Button>
                </div>

                {/* ПРАВАЯ ЧАСТЬ */}
                <div className="flex items-center gap-4">
                    <Button onClick={onCreate} className="flex items-center">
                        <HiPlus className="mr-2" /> New File
                    </Button>
                    <Button onClick={onUpload} className="flex items-center">
                        <HiUpload className="mr-2" /> Upload
                    </Button>
                    <Button onClick={onDelete} className="flex items-center">
                        <HiTrash className="mr-2" /> Delete
                    </Button>
                    {additionalActions}
                    <Button onClick={toggleTheme} className="flex items-center">
                        {isDarkMode ? <HiMoon className="mr-2" /> : <HiSun className="mr-2" />}
                        {isDarkMode ? "Dark" : "Light"}
                    </Button>
                </div>
            </div>
        </Navbar>
    );
}
