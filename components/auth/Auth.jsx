import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./Login";
import Signup from "./Signup";

const Auth = () => {
  return (
    <Tabs
      defaultValue="login"
      className="w-full bg-zinc-900 p-4 rounded-2xl shadow-2xl"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Signup</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Login />
      </TabsContent>
      <TabsContent value="signup">
        <Signup />
      </TabsContent>
    </Tabs>
  );
};

export default Auth;
