import { FC, PropsWithChildren } from "react";
import { useDataSource } from "../context/useDataSource";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Routes } from "../routes";

const ContentWrapper: FC<PropsWithChildren> = ({ children }) => {
  const {
    isLoading,
    data: { teams },
  } = useDataSource();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader2 className="animate-spin size-8" />
      </div>
    );
  }

  if (teams.length === 0) {
    navigate(`/${Routes.NO_DATA}`);
    return <></>;
  }

  return children;
};

export default ContentWrapper;
