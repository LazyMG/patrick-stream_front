import { RecoilRoot } from "recoil";
import GlobalRouterProvider from "./providers/GlobalRouterProvider";

function App() {
  return (
    <RecoilRoot>
      <GlobalRouterProvider />
    </RecoilRoot>
  );
}

export default App;
