import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import { ScanlineOverlay } from "@/components/ui-system/ScanlineOverlay";
import { BootSequence } from "@/components/BootSequence";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import LiveDesk from "@/pages/LiveDesk";
import ArticleList from "@/pages/ArticleList";
import ArticleDetailPage from "@/pages/ArticleDetailPage";
import Reports from "@/pages/Reports";
import Broadcasts from "@/pages/Broadcasts";
import Network from "@/pages/Network";
import PacificSystems from "@/pages/PacificSystems";
import PressCorps from "@/pages/PressCorps";
import Armory from "@/pages/Armory";
import SubmitTip from "@/pages/SubmitTip";
import Contact from "@/pages/Contact";
import AdminDashboard from "@/pages/AdminDashboard";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/live-desk" component={LiveDesk} />
      <Route path="/articles" component={ArticleList} />
      <Route path="/articles/:slug" component={ArticleDetailPage} />
      <Route path="/reports" component={Reports} />
      <Route path="/broadcasts" component={Broadcasts} />
      <Route path="/network" component={Network} />
      <Route path="/pacific-systems" component={PacificSystems} />
      <Route path="/press-corps" component={PressCorps} />
      <Route path="/armory" component={Armory} />
      <Route path="/submit-tip" component={SubmitTip} />
      <Route path="/contact" component={Contact} />
      <Route path="/operator" component={AdminDashboard} />
      <Route path="/operator/articles" component={AdminDashboard} />
      <Route path="/operator/tips" component={AdminDashboard} />
      <Route path="/operator/broadcasts" component={AdminDashboard} />
      <Route path="/operator/settings" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <BootSequence />
          <ScanlineOverlay />
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
