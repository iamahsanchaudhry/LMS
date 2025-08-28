import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const Login = () => {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const OnChangeInputHandler = (
    e: { target: { name: any; value: any } },
    type: string
  ) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handelRegistration = async (type: string) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    console.log(inputData);
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Register Successfully.");
      navigate("/");
    }
  }, [registerIsSuccess, registerData]);

  useEffect(() => {
    if (registerError) {
      const err = registerError as FetchBaseQueryError;
      if (err.data && typeof err.data === "object") {
        const serverError = err.data as { success: boolean; message: string };
        toast.error(serverError.message || "Registration Failed.");
      } else {
        toast.error("Registration Failed.");
      }
    }
  }, [registerError]);

  useEffect(() => {
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login Successfully.");
      navigate("/");
    }
  }, [loginIsSuccess, loginData]);

  useEffect(() => {
    if (loginError) {
      const err = loginError as FetchBaseQueryError;
      if (err.data && typeof err.data === "object") {
        const serverError = err.data as { success: boolean; message: string };
        toast.error(serverError.message || "Login failed.");
      } else {
        toast.error("Login failed.");
      }
    }
  }, [loginError]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex w-full max-w-sm flex-col gap-6 mt-20">
        <Tabs defaultValue="login">
          <TabsList className="w-full gap-1   ">
            <TabsTrigger value="signup">Signup</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>
                  Create a new account and click signup when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="signup-name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="signup-name"
                    value={signupInput.name}
                    onChange={(e) => OnChangeInputHandler(e, "signup")}
                    placeholder="eg. Alex"
                    required={true}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    type="text"
                    name="email"
                    id="signup-email"
                    value={signupInput.email}
                    onChange={(e) => OnChangeInputHandler(e, "signup")}
                    placeholder="eg. alex@gmail.com"
                    required={true}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="signup-password"
                    value={signupInput.password}
                    onChange={(e) => OnChangeInputHandler(e, "signup")}
                    placeholder="eg. xyz"
                    required={true}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={registerIsLoading}
                  onClick={() => handelRegistration("signup")}
                >
                  {registerIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4, animate-spin" />
                      Registering
                    </>
                  ) : (
                    "Signup"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Login with your password here. After singup, you'll be logged
                  in.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    type="text"
                    name="email"
                    id="login-email"
                    value={loginInput.email}
                    onChange={(e) => OnChangeInputHandler(e, "login")}
                    placeholder="eg. alex@gmail.com"
                    required={true}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={loginInput.password}
                    onChange={(e) => OnChangeInputHandler(e, "login")}
                    id="login-password"
                    placeholder="eg. xyz"
                    required={true}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={loginIsLoading}
                  onClick={() => handelRegistration("login")}
                >
                  {loginIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4, animate-spin" />
                      Logging In
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
