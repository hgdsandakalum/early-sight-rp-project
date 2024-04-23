import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginFrom from "./form";

const LoginPage = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col flex-1 justify-center px-6 py-12 lg:px-8">
      <LoginFrom />
    </div>
  );
};

export default LoginPage;
