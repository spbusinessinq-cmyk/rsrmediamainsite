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
import RSRIntel from "@/pages/RSRIntel";
import BlackDog from "@/pages/BlackDog";
import Armory from "@/pages/Armory";
import Hotline from "@/pages/Hotline";
import Contact from "@/pages/Contact";
import AdminDashboard from "@/pages/AdminDashboard";
import Channels from "@/pages/Channels";
import Broadcasts from "@/pages/Broadcasts";
import DoctrineLibrary from "@/pages/DoctrineLibrary";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/mission" component={Mission} />
      <Route path="/reports" component={Reports} />
      <Route path="/reports/:slug" component={ReportDetail} />
      <Route path="/doctrine-library" component={DoctrineLibrary} />
      <Route path="/doctrine" component={DoctrineLibrary} />
      <Route path="/broadcasts" component={Broadcasts} />
      <Route path="/channels" component={Channels} />
      <Route path="/hotline" component={Hotline} />
      {/* /tips and /tip-line alias to Hotline */}
      <Route path="/tips" component={Hotline} />
      <Route path="/tip-line" component={Hotline} />
      <Route path="/network" component={Network} />
      {/* Canonical paths */}
      <Route path="/pacific-systems" component={PacificSystems} />
      <Route path="/rsr-intel" component={RSRIntel} />
      <Route path="/black-dog" component={BlackDog} />
      <Route path="/armory" component={Armory} />
      {/* Short aliases for nav and Systems dropdown */}
      <Route path="/pacific" component={PacificSystems} />
      <Route path="/security" component={BlackDog} />
      <Route path="/contact" component={Contact} />
      {/* Admin — single page in static mode */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/reports" component={AdminDashboard} />
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
