import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import Spinner from "./ui/Spinner";

// Lazy load all page components
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Users = lazy(() => import("./pages/Users"));
const Settings = lazy(() => import("./pages/Settings"));
const Account = lazy(() => import("./pages/Account"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// New pages
const NewRequest = lazy(() => import("./pages/NewRequest"));
const Analytics = lazy(() => import("./pages/Analytics"));
const ProjectsLog = lazy(() => import("./pages/ProjectsLog"));
const RisksLog = lazy(() => import("./pages/RisksLog"));
const Schedules = lazy(() => import("./pages/Schedules"));
const IncomingLetters = lazy(() => import("./pages/IncomingLetters"));
const OutgoingLetters = lazy(() => import("./pages/OutgoingLetters"));
const QualityControl = lazy(() => import("./pages/QualityControl"));
const QualityReports = lazy(() => import("./pages/QualityReports"));
const BudgetPlanning = lazy(() => import("./pages/BudgetPlanning"));
const BudgetTracking = lazy(() => import("./pages/BudgetTracking"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to="dashboard" />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="users" element={<Users />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="account" element={<Account />} />

                  {/* New Routes */}
                  <Route path="new-request" element={<NewRequest />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="projects-log" element={<ProjectsLog />} />
                  <Route path="risks-log" element={<RisksLog />} />
                  <Route path="schedules" element={<Schedules />} />
                  <Route
                    path="incoming-letters"
                    element={<IncomingLetters />}
                  />
                  <Route
                    path="outgoing-letters"
                    element={<OutgoingLetters />}
                  />
                  <Route path="quality-control" element={<QualityControl />} />
                  <Route path="quality-reports" element={<QualityReports />} />
                  <Route path="budget-planning" element={<BudgetPlanning />} />
                  <Route path="budget-tracking" element={<BudgetTracking />} />
                </Route>

                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <Toaster position="top-center" />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
