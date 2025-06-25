import { RecoilRoot } from "recoil";
import GlobalRouterProvider from "./providers/GlobalRouterProvider";

function App() {
  alert(`alert! ${import.meta.env.VITE_DEV_API_URL}`);
  return (
    <RecoilRoot>
      <GlobalRouterProvider />
    </RecoilRoot>
  );
}

export default App;
