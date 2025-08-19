import { AppWindowIcon, CodeIcon } from "lucide-react";

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
import { useState } from "react";

export const Login = () => {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

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

  const handelRegistration = (type: string) =>{
    const inputDate = type === "signup"? signupInput: loginInput;
    console.log(inputDate);
  }
  return (
    <div className="flex justify-center items-center">
      <div className="flex w-full max-w-sm flex-col gap-6 mt-20">
        <Tabs defaultValue="signup">
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
                    onChange={(e) => OnChangeInputHandler(e,"signup")}
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
                    onChange={(e) => OnChangeInputHandler(e,"signup")}
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
                    onChange={(e) => OnChangeInputHandler(e,"signup")}
                    placeholder="eg. xyz"
                    required={true}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={()=>handelRegistration("signup")}>Signup</Button>
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
                    onChange={(e) => OnChangeInputHandler(e,"login")}
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
                    onChange={(e,) => OnChangeInputHandler(e,"login")}
                    id="login-password"
                    placeholder="eg. xyz"
                    required={true}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={()=>handelRegistration("login")}>Login</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
