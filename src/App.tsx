import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BodyFatCalculator from "./pages/BodyFatCalculator";
import BMRCalculator from "./pages/BMRCalculator";
import IdealWeightCalculator from './pages/IdealWeightCalculator';
import HeartRateCalculator from './pages/HeartRateCalculator';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import Contact from './pages/Contact';
import WaterIntakeCalculator from './pages/WaterIntakeCalculator';
import MentalHealthAssessment from './pages/MentalHealthAssessment';
import MacroCalculator from './pages/MacroCalculator';
import BloodPressureChecker from './pages/BloodPressureChecker';
import SleepCalculator from './pages/SleepCalculator';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bmi-calculator" element={<Index />} />
          <Route path="/body-fat-calculator" element={<BodyFatCalculator />} />
          <Route path="/bmr-calculator" element={<BMRCalculator />} />
          <Route path="/ideal-weight-calculator" element={<IdealWeightCalculator />} />
          <Route path="/heart-rate-calculator" element={<HeartRateCalculator />} />
          <Route path="/water-intake-calculator" element={<WaterIntakeCalculator />} />
          <Route path="/mental-health-assessment" element={<MentalHealthAssessment />} />
          <Route path="/macro-calculator" element={<MacroCalculator />} />
          <Route path="/blood-pressure-checker" element={<BloodPressureChecker />} />
          <Route path="/sleep-calculator" element={<SleepCalculator />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
