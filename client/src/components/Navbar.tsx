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
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAppSelector } from "@/app/storeHooks";

export default function Navbar() {
  const { user } = useAppSelector((store) => store.auth);
  const role = "instructor";
  const navigate = useNavigate();
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User log out.");
      navigate("/login");
    }
  }, [isSuccess]);

  const logoutHandler = async () => {
    await logoutUser().unwrap();
  };
  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/*Desktop*/}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <Link to="./">
          <div className="flex items-center gap-2">
            <School size={"30"} />{" "}
            <h1 className="hidden md:block font-extrabold text-2xl">
              E-Learning
            </h1>
          </div>
        </Link>

        {/* User icon and dark mode icon */}
        <div className="flex flex-row justify-between items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={user.photoUrl || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>USER</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="my-learning">My Learning</Link>{" "}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="profile">Profile</Link>{" "}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logoutHandler}>
                  Logout
                </DropdownMenuItem>
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
              <Button variant="outline">
                <Link to="/login">Login</Link>
              </Button>
              <Button>
                <Link to="/login">Signup</Link>
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/* Mobile Device */}
      <div className="flex md:hidden items-center justify-between px-4 h-full ">
        <Link to="./">
          <div className="flex flex-row justify-between items-center gap-2">
            <School size={"30"} />
            <h1 className="font-extrabold tex-2xl pt-2">E-Learning</h1>
          </div>
        </Link>
        <MobileNavbar user={user} logoutHandler={logoutHandler} />
      </div>
    </div>
  );
}

const MobileNavbar = ({ logoutHandler, user }: MobileNavbarProps) => {
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
            {user ? (
              <>
                <span className="cursor-pointer hover:underline">
                  <SheetClose asChild>
                    <Link to="my-learning">My Learning</Link>
                  </SheetClose>
                </span>
                <Separator />
                <span className="cursor-pointer hover:underline">
                  <SheetClose asChild>
                    <Link to="profile">Profile</Link>
                  </SheetClose>
                </span>
                <Separator />
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className="cursor-pointer hover:underline pl-0 font-normal text-lg outline-1"
                    onClick={logoutHandler}
                  >
                    Log out
                  </Button>
                </SheetClose>

                {user.role === "instructor" && (
                  <>
                    <Separator />
                    <SheetClose asChild>
                      <Button className="w-full mt-1 text-secondary dark:text-primary bg-indigo-900 dark:bg-indigo-600 hover:bg-indigo-800 focus:bg-indigo-800 focus:text-secondary dark:hover:bg-indigo-700 dark:focus:bg-indigo-700 dark:focus:text-primary">
                        DashBoard
                      </Button>
                    </SheetClose>
                  </>
                )}
              </>
            ) : (
              <>
                <SheetClose asChild>
                  <Button variant="outline" asChild className="w-full mt-1">
                    <Link to="/login">Login</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild className="w-full mt-2 ">
                    <Link to="/login">Signup</Link>
                  </Button>
                </SheetClose>
              </>
            )}
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
type MobileNavbarProps = {
  logoutHandler: () => void;
  user: any | null;
};
