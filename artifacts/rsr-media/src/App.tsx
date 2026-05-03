import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/Layout";
import { ScanlineOverlay } from "@/components/ui-system/ScanlineOverlay";
import { BootSequence } from "@/components/BootSequence";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Mission from "@/pages/Mission";
import Reports from "@/pages/Reports";
import ReportDetail from "@/pages/ReportDetail";
import Network from "@/pages/Network";
import PacificSystems from "@/pages/PacificSystems";
import BlackDog from "@/pages/BlackDog";
import Armory from "@/pages/Armory";
import Hotline from "@/pages/Hotline";
import Contact from "@/pages/Contact";
import AdminDashboard from "@/pages/AdminDashboard";
import Channels from "@/pages/Channels";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/mission" component={Mission} />
      <Route path="/reports" component={Reports} />
      <Route path="/reports/:slug" component={ReportDetail} />
      <Route path="/network" component={Network} />
      <Route path="/pacific-systems" component={PacificSystems} />
      <Route path="/black-dog" component={BlackDog} />
      <Route path="/armory" component={Armory} />
      <Route path="/hotline" component={Hotline} />
      <Route path="/tip-line" component={Hotline} />
      <Route path="/contact" component={Contact} />
      <Route path="/channels" component={Channels} />
      {/* Admin routes — all handled by AdminDashboard via internal route matching */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/reports" component={AdminDashboard} />
      <Route path="/admin/reports/:id" component={AdminDashboard} />
      <Route path="/admin/import-x" component={AdminDashboard} />
      <Route path="/admin/tips" component={AdminDashboard} />
      <Route path="/admin/analytics" component={AdminDashboard} />
      <Route path="/admin/settings" component={AdminDashboard} />
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
