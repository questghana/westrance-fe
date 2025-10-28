import { CompanyManagementPage } from "./pages/companymanagement.page";
import { DashboardLayout } from "./layouts/dashboard.layout";
import { BrowserRouter, Route, Routes } from "react-router";
import { SettingsPage } from "./pages/settings.page";
import DashboardPage from "./pages/dashboard.page";
import { NotFound } from "./pages/notfound.page";
// import Home from "./pages/home.page";
import Login from "./pages/signin.pagecopy";
import { AuthenticationLayout } from "./layouts/authentication.layout";
import Companydetail from "./components/register/companydetail";
import Locationdetail from "./components/register/locationdetail";
import Admincredential from "./components/register/admincredential";
import Contactinfo from "./components/register/contactinfo";
import Dashboardlogin from "./pages/dashboardlogin.page";
import Employelayout from "./layouts/employe.layout";
import EmpDashboadPage from "./pages/empdashboad.page";
import EmpSettingPage from "./pages/empsetting";
import EmpProfilePage from "./pages/empprofile";
import Companylayout from "./layouts/company.layout";
import Companydashboardpage from "./pages/companydashboard.page";
import Empmanagementpage from "./pages/empmanagement";
import HospitalPharmacyPage from "./pages/hospitalpharmacy";
import InvoicesPage from "./pages/invoices";
import ReportsAnalyticsPage from "./pages/reportsanalytics";
import SupportPage from "./pages/support";
import WestranceEmployeeManagementPage from "./pages/westranceemployeemanagement.page";
import { Suspense } from "react";
import WestranceHospitalPage from "./pages/westrancehospital.page";
import { Hospitalpharmacylayout } from "./layouts/hospitalpharmacy.layout";
import WestranceSideInvoicePage from "./pages/westrancesideinvoice.page";
import WestranceReportsAnalyticsPage from "./pages/westrancereportsanalytics.page";
import WestranceSupportCenterPage from "./pages/westrancesupportcenter.page";
import Hospitalpharmacy from "./pages/hospitalpharmacy.page";
import PatientLookupPage from "./pages/patientlookup.page";
import UsersandrolePage from "./pages/westranceusersandrole.page";
import StaffManagementPage from "./pages/Staffmanagement.page";
import HospitalPharmacyInvPage from "./pages/hospitalpharmacyinv.page";
import SettingPage from "./pages/companysetting.page";
import { ForgotpasswordForm } from "./components/signin/ForgotpasswordForm";
import { ResetPasswordForm } from "./components/signin/ResetPasswordForm";
import { Protectedroutes } from "./components/protectedroutes/protected.routes";
import { Publicroutes } from "./components/protectedroutes/publicroutes";
import AdminProtectedRoute from "./components/protectedroutes/admin.ProtectedRoutes";
import UsersandrolePageHospital from "./pages/hospitaluserandrolepage";

export const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Publicroutes />}>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotpasswordForm />} />
        <Route path="/resetpassword" element={<ResetPasswordForm />} />
        <Route path="/admin-login" element={<Dashboardlogin />} />
        </Route>

        {/* Register layout */}
        <Route element={<AuthenticationLayout />}>
          <Route path="company-detail" element={<Companydetail />} />
          <Route path="location-detail" element={<Locationdetail />} />
          <Route path="admin-credential" element={<Admincredential />} />
          <Route path="contact-info" element={<Contactinfo />} />
          {/* <Route index element={<SigninPage />} />
          <Route path="verify-code" element={<VerifyCodePage />} />
          <Route path="verify-email" element={<VerifyEmailPage />} />
          <Route path="reset-password" element={<ResetpasswordPage />} />
          <Route path="reset-success" element={<PasswordresetsucessPage />} /> */}
        </Route>

        {/* Below Westrance Dashboard */}
        <Route element={<AdminProtectedRoute/>}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="*" element={<NotFound />} />
          <Route element={<CompanyManagementPage />} path="company-management" />
          <Route element={<Suspense fallback={"loading..."}><WestranceHospitalPage /></Suspense>} path="hospital-pharmacy" />
          <Route element={<WestranceEmployeeManagementPage />} path="employee-management" />
          <Route element={<WestranceSideInvoicePage />} path="westrance-invoice" />
          <Route path="reports-analytics" element={<WestranceReportsAnalyticsPage />} />
          <Route path="users-roles" element={<UsersandrolePage />} />
          <Route path="support-center" element={<WestranceSupportCenterPage />} />
          <Route element={<SettingsPage />} path="settings" />
        </Route>
        </Route>

        {/* Below Employee Dashboard */}
        <Route element={<Protectedroutes allowedRoles={["Employee", "Hospital Employee", "Westrance Employee"]}/>}>
        <Route path="/employee-dashboard" element={<Employelayout />}>
          <Route index element={<EmpDashboadPage />} />
          <Route path="profile" element={<EmpProfilePage />} />
          <Route path="setting" element={<EmpSettingPage />} />
        </Route>
        </Route>

        {/* Below Company Dashboard */}
        <Route element={<Protectedroutes allowedRoles={["CompanyAdmin"]}/>}>
        <Route path="/company-dashboard" element={<Companylayout />}>
          <Route index element={<Companydashboardpage />} />
          <Route path="employee-management" element={<Empmanagementpage />} />
          <Route path="hospital-pharmacy" element={<HospitalPharmacyPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="reports-analytics" element={<ReportsAnalyticsPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="setting" element={<SettingPage />} />
        </Route>
        </Route>

        {/* Below Hospital&pharmacy Dashboard */}
        <Route element={<Protectedroutes allowedRoles={["CompanyAdmin", "Hospital Employee"]}/>}>
        <Route path="/hospital-pharmacy-dashboard" element={<Hospitalpharmacylayout />}>
          <Route index element={<Hospitalpharmacy />} />
          <Route path="patient-lookup" element={<PatientLookupPage />} />
          <Route path="users-roles" element={<UsersandrolePageHospital />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="setting" element={<SettingPage />} />
          <Route path="staff-management" element={<StaffManagementPage />} />
          <Route path="hospital-invoices" element={<HospitalPharmacyInvPage />} />
        </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
