import { Menu, School } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import DarkMode from "./DarkMode";
import { Separator } from "./ui/separator";

export default function Navbar() {
  const user = true;
  const role = 'instructor';
  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/*Desktop*/}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <School size={"30"} />
          <h1 className="hidden md:block font-extrabold text-2xl">
            E-Learning
          </h1>
        </div>
        {/* User icon and dark mode icon */}
        <div className="flex flex-row justify-between items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>My Learning</DropdownMenuItem>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
                {role === "instructor" ? (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="w-full mt-1 text-secondary dark:text-primary bg-indigo-900 dark:bg-indigo-600 hover:bg-indigo-800 focus:bg-indigo-800 focus:text-secondary dark:hover:bg-indigo-700 dark:focus:bg-indigo-700 dark:focus:text-primary">
                      Dashboard
                    </DropdownMenuItem>
                  </>
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline">Login</Button>
              <Button>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/* Mobile Device */}
      <div className="flex md:hidden items-center justify-between px-4 h-full ">
        <div className="flex flex-row justify-between items-center gap-2">
          <School size={"30"} />
          <h1 className="font-extrabold tex-2xl pt-2">E-Learning</h1>
        </div>
        <MobileNavbar role={role} />
      </div>
    </div>
  );
}

const MobileNavbar = ({ role }: any) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="rounded-full bg-gray-200 hover:bg-gray-400"
            variant="outline"
          >
            <Menu />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="flex flex-col">
          <SheetHeader className="flex flex-row items-center justify-between mt-2">
            <div className="flex flex-row justify-between items-center gap-2">
              <School size={"30"} />
              <SheetTitle className="text-lg font-extrabold pt-2">
                E-Learning
              </SheetTitle>
            </div>

            <DarkMode />
          </SheetHeader>

          <Separator className="my-1" />

          <nav className="flex flex-col space-y-4 mx-4 items-start">
            <span className="cursor-pointer content-center hover:underline">
              My Learning
            </span>
            <Separator />
            <span className="cursor-pointer hover:underline">Profile</span>
            <Separator />
            <span className="cursor-pointer hover:underline">Log out</span>
            {role === "instructor" ? (
              <>
                <Separator />
                <Button className="w-full mt-1 text-secondary dark:text-primary bg-indigo-900 dark:bg-indigo-600 hover:bg-indigo-800 focus:bg-indigo-800 focus:text-secondary dark:hover:bg-indigo-700 dark:focus:bg-indigo-700 dark:focus:text-primary">
                  DashBoard
                </Button>
              </>
            ) : null}
          </nav>

          <SheetFooter className="mt-auto">
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
