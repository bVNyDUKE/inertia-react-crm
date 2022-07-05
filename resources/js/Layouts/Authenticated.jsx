import TopBar from "@/Components/TopBar";
import MainMenu from "@/Components/MainMenu";
import Toast from "@/Components/Toast";

export default function Authenticated(children) {
  return (
    <div className="md:flex md:flex-col">
      <div className="md:flex md:h-screen md:flex-col">
        <TopBar />
        <div className="md:flex md:flex-grow md:overflow-hidden">
          <MainMenu />
          <div className="px-4 py-8 md:flex-1 md:overflow-y-auto md:p-12">
            <Toast />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
