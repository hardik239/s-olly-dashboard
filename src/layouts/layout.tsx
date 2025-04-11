import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../components/nav";
import { Button } from "../components/ui/button";
import ContentWrapper from "../container/ContentWrapper";
import DataSourceProvider from "../context/DataSourceContext";

const Layout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <DataSourceProvider>
        <div className="grid grid-rows-[4rem_,_auto] h-screen">
          <div className="border-b flex items-center px-6 lg:px-8 z-[999] bg-white">
            <div className="flex items-center w-full justify-between">
              <Nav />
              <div className="flex items-center">
                <Button
                  onClick={() => navigate("/")}
                  className="text-xs h-8 font-normal lg:mr-4"
                >
                  Upload Internal Sheet
                </Button>
              </div>
            </div>
          </div>
          <div className="overflow-auto h-full space-y-4 px-6 lg:p-8 pt-6">
            <ContentWrapper>
              <Outlet />
            </ContentWrapper>
          </div>
        </div>
      </DataSourceProvider>
    </>
  );
};

export default Layout;
