import { ReactNode } from "react";
import { useLoadUserQuery } from "@/features/api/authApi";

const Loader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

type LoadingSpinnerProps = {
  children: ReactNode;
};

const MyLoader = ({ children }: LoadingSpinnerProps) => {
  const { isLoading } = useLoadUserQuery();

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default MyLoader;
