import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import AboutPage from '@/components/pages/AboutPage';
import HowItWorksPage from '@/components/pages/HowItWorksPage';
import ContactPage from '@/components/pages/ContactPage';
import CitizenSignupPage from '@/components/pages/CitizenSignupPage';
import CitizenLoginPage from '@/components/pages/CitizenLoginPage';
import CitizenDashboardPage from '@/components/pages/CitizenDashboardPage';
import CitizenComplaintHistoryPage from '@/components/pages/CitizenComplaintHistoryPage';
import AdminLoginPage from '@/components/pages/AdminLoginPage';
import AdminDashboardPage from '@/components/pages/AdminDashboardPage';
import AdminComplaintManagementPage from '@/components/pages/AdminComplaintManagementPage';
import AnalyticsPage from '@/components/pages/AnalyticsPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "how-it-works",
        element: <HowItWorksPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "citizen-signup",
        element: <CitizenSignupPage />,
      },
      {
        path: "citizen-login",
        element: <CitizenLoginPage />,
      },
      {
        path: "citizen-dashboard",
        element: <CitizenDashboardPage />,
      },
      {
        path: "complaint-history",
        element: <CitizenComplaintHistoryPage />,
      },
      {
        path: "admin-login",
        element: <AdminLoginPage />,
      },
      {
        path: "admin-dashboard",
        element: <AdminDashboardPage />,
      },
      {
        path: "admin-complaint-management",
        element: <AdminComplaintManagementPage />,
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
