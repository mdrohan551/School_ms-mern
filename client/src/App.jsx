import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Link, Navigate, Route, Routes, useLocation} from 'react-router-dom';
import Loader from './Loader/Loader.jsx';
import RouteChangeLoader from './Loader/RouteChangeLoader.jsx';
import HomeWorkPage from "./pages/Admin/HomeWorkPage/HomeWorkPage.jsx";
import HomePage from "./homePage/HomePage.jsx";

import DashboardLayout from "./Layouts/DashboardLayout.jsx";
import ProtectionRouter from "./Layouts/ProtectionRouter.jsx";

import HomeLoader from './homePage/homePageLoader/HomeLoader.jsx';
import CursorChange from './homePage/animationcomponent/CursorChange.jsx';
import AutoRoleSet from "./constant/AutoRoleSet.jsx";
import {useSelector} from "react-redux";
import NotfoundPage from "./components/ErrorPage/NotfoundPage.jsx";
import EmpDetailsPage from "./pages/Admin/EmpDetailsPage/EmpDetailsPage.jsx";
import StudentDetailsPage from './pages/Admin/StudentPage/StudentDetailsPage.jsx';
import StudentsPresentsPage from "./pages/Admin/AttendencePage/StudentsPresentsPage.jsx";



// Lazy imports
const Signup = lazy(() => import('./pages/Auth/Signup.jsx'));
const Login = lazy(() => import('./pages/Auth/Login'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword'));
const AdminHome = lazy(() => import('./pages/Admin/AdminHome'));
const InstituteProfilePage = lazy(() => import('./pages/Admin/GeneralSettingPage/InstituteProfilePage.jsx'));
const Feesparticuler = lazy(() => import('./pages/Admin/GeneralSettingPage/FeesparticulerPage.jsx'));
const AccountSettingPage = lazy(() => import('./pages/Admin/GeneralSettingPage/AccountSettingPage.jsx'));
const GeneralFeesInvoicePage = lazy(() => import('./pages/Admin/GeneralSettingPage/GeneralFeesInvoicePage.jsx'));
const RulesRegulationPage = lazy(() => import('./pages/Admin/GeneralSettingPage/RulesRegulationPage.jsx'));
const MarksGradingPage = lazy(() => import('./pages/Admin/GeneralSettingPage/MarksGradingPage.jsx'));
const ThemeLangPage = lazy(() => import('./pages/Admin/GeneralSettingPage/ThemeLangPage.jsx'));
const AllClasses = lazy(() => import('./pages/Admin/ClassesPage/AllClassesPage.jsx'));
const NewClass = lazy(() => import('./pages/Admin/ClassesPage/NewClassPage.jsx'));
const ClassWithSubjectPage = lazy(() => import('./pages/Admin/SubjectsPage/ClassWithSubjectPage.jsx'));
const AssignSubjectPage = lazy(() => import('./pages/Admin/SubjectsPage/AssignSubjectPage.jsx'));
const AllStudentPage = lazy(() => import('./pages/Admin/StudentPage/AllStudentPage.jsx'));
const AddNewPage = lazy(() => import('./pages/Admin/StudentPage/AddNewPage.jsx'));

const ActiviInactivePage = lazy(() => import('./pages/Admin/StudentPage/ActiviInactivePage.jsx'));
const AdmissionLetterPage = lazy(() => import('./pages/Admin/StudentPage/AdmissionLetterPage.jsx'));
const StudentCardPage = lazy(() => import('./pages/Admin/StudentPage/StudentCardPage.jsx'));
const PrintBasicListPage = lazy(() => import('./pages/Admin/StudentPage/PrintBasicListPage.jsx'));
const ManageLoginPage = lazy(() => import('./pages/Admin/StudentPage/ManageLoginPage.jsx'));
const AllEmployeePage = lazy(() => import('./pages/Admin/EmployeePage/AllEmployeePage.jsx'));
const NEwEmployeeAddPage = lazy(() => import('./pages/Admin/EmployeePage/NEwEmployeeAddPage.jsx'));
const JobLetterPage = lazy(() => import('./pages/Admin/EmployeePage/JobLetterPage.jsx'));
const ManageEmployeeLoginPage = lazy(() => import('./pages/Admin/EmployeePage/ManageEmployeeLoginPage.jsx'));
const ChartOfAccountPage = lazy(() => import('./pages/Admin/AccountPage/ChartOfAccountPage.jsx'));
const AddIncomePage = lazy(() => import('./pages/Admin/AccountPage/AddIncomePage.jsx'));
const AddEprensePage = lazy(() => import('./pages/Admin/AccountPage/AddEprensePage.jsx'));
const AccountStateMentPage = lazy(() => import('./pages/Admin/AccountPage/AccountStateMentPage.jsx'));
const FeesInvoicePage = lazy(() => import('./pages/Admin/FeesPage/FeesInvoicePage.jsx'));
const FeesCollectPage = lazy(() => import('./pages/Admin/FeesPage/FeesCollectPage.jsx'));
const FeesPaidSlipPage = lazy(() => import('./pages/Admin/FeesPage/FeesPaidSlipPage.jsx'));
const FeesDefaultersPage = lazy(() => import('./pages/Admin/FeesPage/FeesDefaultersPage.jsx'));
const FeesDeletePage = lazy(() => import('./pages/Admin/FeesPage/FeesDeletePage.jsx'));
const PaySalaryPage = lazy(() => import('./pages/Admin/SalaryPage/PaySalaryPage.jsx'));
const SalaryPaidShipPage = lazy(() => import('./pages/Admin/SalaryPage/SalaryPaidShipPage.jsx'));
const StudentAttendencePage = lazy(() => import('./pages/Admin/AttendencePage/StudentAttendencePage.jsx'));
const StudentsAttendenceReportPage = lazy(() => import('./pages/Admin/AttendencePage/StudentsAttendenceReportPage.jsx'));
const AcademicYearPage = lazy(() => import('./pages/Admin/AcademicYearPage/AcademicYearPage.jsx'));
const StudentHomePage = lazy(() => import('./pages/StudentDashboardPage/StudentHomePage.jsx'));

const AppRoutes = () => {
    const {role: currentRole, userLockId} = useSelector((state) => state.auth);
    const location = useLocation();
    const isAuthPage = ["/login", "/signup", "/"].includes(location.pathname);
    const path = location.pathname.toLowerCase(); // case-insensitive হলে ভাল
    if (
        (
            path === '/dashboard/admin' ||
            path === '/dashboard/student' ||
            path.startsWith('/dashboard/admin/') ||
            path.startsWith('/dashboard/student/')
        ) && !currentRole
    ) {
        return <NotfoundPage/>;
    }


    if (
        location.pathname.startsWith("/dashboard") &&
        !currentRole &&
        userLockId
    ) {
        return <Loader/>;
    }

    if (
        (location.pathname === "/dashboard" || location.pathname === "/dashboard/") &&
        currentRole
    ) {
        return <Navigate to={`/dashboard/${currentRole}`} replace/>;
    }
    if (
        (location.pathname === "/dashboard" || location.pathname === "/dashboard/") &&
        !currentRole &&
        !userLockId
    ) {
        return <Navigate to="/login" replace/>;
    }


    return (
        <>

            {!isAuthPage && <RouteChangeLoader/>}
            <Suspense fallback={isAuthPage ? <HomeLoader/> : <Loader/>}>

                <Routes>
                    <Route path="*" element={<NotfoundPage/>}/>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/reset-password' element={<ResetPassword/>}/>
                    {/*dashboard main path*/}
                    <Route path='/dashboard/*' element={<DashboardLayout/>}>
                        {/*student router */}
                        <Route element={<ProtectionRouter allowRole="Student"/>}>
                            <Route path='Student/*' element={<StudentHomePage/>}/>
                            <Route path="*" element={<NotfoundPage/>}/>
                        </Route>
                        {/*admin router */}
                        <Route element={<ProtectionRouter allowRole="Admin"/>}>
                            <Route path="admin/*" element={<AdminHome/>}/>
                            <Route path='institute-profile' element={<InstituteProfilePage/>}/>
                            <Route path='fee-particuler' element={<Feesparticuler/>}/>
                            <Route path='bank-details' element={<GeneralFeesInvoicePage/>}/>
                            <Route path='rules' element={<RulesRegulationPage/>}/>
                            <Route path='grading' element={<MarksGradingPage/>}/>
                            <Route path='theme-settings' element={<ThemeLangPage/>}/>
                            <Route path='account-settings' element={<AccountSettingPage/>}/>
                            <Route path='classes' element={<AllClasses/>}/>
                            <Route path='addnewclass' element={<NewClass/>}/>
                            <Route path='show-subject' element={<ClassWithSubjectPage/>}/>
                            <Route path='add-subject' element={<AssignSubjectPage/>}/>
                            <Route path='allstudent' element={<AllStudentPage/>}/>
                            <Route path='singleStudent/:id' element={<StudentDetailsPage/>}/>
                            <Route path='admission' element={<AddNewPage/>}/>
                          
                            <Route path='active-state' element={<ActiviInactivePage/>}/>
                            <Route path='admission-letter' element={<AdmissionLetterPage/>}/>
                            <Route path='studentid' element={<StudentCardPage/>}/>
                            <Route path='print-info' element={<PrintBasicListPage/>}/>
                            <Route path='student-login' element={<ManageLoginPage/>}/>

                            <Route path='all-employees' element={<AllEmployeePage/>}/>
                            <Route path="employee-details/:id" element={<EmpDetailsPage/>}/>
                            <Route path='add-teacher' element={<NEwEmployeeAddPage/>}/>
                            <Route path='appoinment-letter' element={<JobLetterPage/>}/>
                            <Route path='staff-login' element={<ManageEmployeeLoginPage/>}/>
                            <Route path='accounts-chart' element={<ChartOfAccountPage/>}/>
                            <Route path='income' element={<AddIncomePage/>}/>
                            <Route path='expense' element={<AddEprensePage/>}/>
                            <Route path='balance' element={<AccountStateMentPage/>}/>
                            <Route path='get-invoice' element={<FeesInvoicePage/>}/>
                            <Route path='collect-fees' element={<FeesCollectPage/>}/>
                            <Route path='feesPaidSlip' element={<FeesPaidSlipPage/>}/>
                            <Route path='defaulter' element={<FeesDefaultersPage/>}/>
                            <Route path='fee-delete' element={<FeesDeletePage/>}/>
                            <Route path='submit-salary' element={<PaySalaryPage/>}/>
                            <Route path='salary-slip' element={<SalaryPaidShipPage/>}/>
                            <Route path='std-attendence' element={<StudentAttendencePage/>}/>
                            <Route path='std-prasents' element={<StudentsPresentsPage/>}/>
                            <Route path='std-attReport' element={<StudentsAttendenceReportPage/>}/>
                            <Route path='academic-year' element={<AcademicYearPage/>}/>
                            <Route path='homework' element={<HomeWorkPage/>}/>
                            <Route path="*" element={<NotfoundPage/>}/>

                        </Route>
                    </Route>
                </Routes>
            </Suspense>
        </>
    );
};

const App = () => (
    <BrowserRouter>
        <AutoRoleSet/>
        <AppRoutes/>
        <CursorChange/>
    </BrowserRouter>
);

export default App;

