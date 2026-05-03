import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import NotFound from "@/pages/not-found";
// Import pages (we will create these next)
import Home from "@/pages/Home";
import About from "@/pages/About";
import Network from "@/pages/Network";
import PacificSystems from "@/pages/PacificSystems";
import PressCorps from "@/pages/PressCorps";
import Broadcasts from "@/pages/Broadcasts";
import Reports from "@/pages/Reports";
import SubmitTip from "@/pages/SubmitTip";
import Contact from "@/pages/Contact";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/network" component={Network} />
      <Route path="/pacific-systems" component={PacificSystems} />
      <Route path="/press-corps" component={PressCorps} />
      <Route path="/broadcasts" component={Broadcasts} />
      <Route path="/reports" component={Reports} />
      <Route path="/submit-tip" component={SubmitTip} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <Router />
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
