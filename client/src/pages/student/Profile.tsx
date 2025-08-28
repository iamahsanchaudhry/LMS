import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import CourseCard from "./CourseCard";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { UserType } from "@/types/user";

export default function Profile() {
const { data: userData, isLoading,refetch } = useLoadUserQuery();
const [
  updateUser,
  {
    data: updateUserData,
    isLoading: updateIsLoading,
    isError,
    error,
    isSuccess,
  },
] = useUpdateUserMutation();

const [user, setUser] = useState<UserType | null>();
const [name, setName] = useState("");
const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) setProfilePhoto(file);
};

const updateUserHandler = async () => {
  const formData = new FormData();
  formData.append("name", name);
  if (profilePhoto) {
    formData.append("profilePhoto", profilePhoto);
  }

  try {
    await updateUser(formData).unwrap(); 
  } catch (err: any) {
    toast.error(err?.data?.message || "Profile update failed.");
  }
};

useEffect(() => {
  if (isSuccess && updateUserData) {
    toast.success(updateUserData?.message || "Profile updated.");
    if (updateUserData?.user) {
      refetch();
    };
  }

  if (isError) {
    toast.error((error as any)?.data?.message ?? "Failed to Update Profile.");
  }
}, [isSuccess, isError, updateUserData, error]);

useEffect(() => {
  if (userData?.user) {
    setUser(userData?.user);
    setName(userData.user.name);
  }
}, [userData]);

  useEffect(()=>{
  refetch();
  },[])
  if (isLoading) return <ProfileSkeleton />;
  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      <h1 className="font-bold text-2xl text-center md:text-center">PROFILE</h1>
      <div className="flex flex-row md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-34 mv-4">
            <AvatarImage
              src={user?.photoUrl || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>PIC</AvatarFallback>
          </Avatar>
        </div>
        <div className="mt-2">
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.name}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.email}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.role?.toUpperCase()}
              </span>
            </h1>
          </div>
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button size="sm">Edit Profile</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Name</Label>
                    <Input
                      id="name-1"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      name="name"
                      defaultValue="Alex NextJs"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Choose Photo</Label>
                    <Input
                      type="file"
                      onChange={onChangeHandler}
                      accept="image/*"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" disabled={updateIsLoading}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={updateIsLoading}
                    onClick={updateUserHandler}
                  >
                    {updateIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Save changes"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </div>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : user?.enrolledCourses.length === 0 ? (
          <p> You are not enrolled in any course.</p>
        ) : (
          <div>
            <p className="my-5 text-xl  "> Your Enrolled Courses.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {user?.enrolledCourses.map((course, index) => (
                <CourseCard key={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);

// Skeleton For Profile Page

const ProfileSkeleton = () => (
  <div className="max-w-4xl mx-auto my-10 px-4">
    <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
      <div className="flex flex-col items-center">
        <div className="bg-gray-300 dark:bg-gray-700 rounded-full h-24 w-24 md:h-32 md:w-32 mb-4 animate-pulse"></div>
      </div>
      <div className="w-full md:w-auto text-center md:text-left">
        <div className="mb-2">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">
            <span className="inline-block bg-gray-300 dark:bg-gray-700 h-6 w-48 ml-2 animate-pulse"></span>
          </h2>
        </div>
        <div className="mb-2">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">
            <span className="inline-block bg-gray-300 dark:bg-gray-700 h-6 w-64 ml-2 animate-pulse"></span>
          </h2>
        </div>
        <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-10 w-32 animate-pulse mx-auto md:mx-0"></div>
      </div>
    </div>
    <div>
      <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
        <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"></div>
        <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"></div>
        <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"></div>
      </div>
    </div>
  </div>
);
