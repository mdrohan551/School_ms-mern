import {
    Book,
    Settings,
    Home,
    Ruler,
    User,
    BriefcaseBusiness,
    Wallet,
    CircleDollarSign,
    CreditCard,
    Hand,
    CalendarCheck,
    NotebookPen,
    GraduationCap


} from "lucide-react"; // Import Lucide icons

// auth




// common path variable
let commonPath = "dashboard"
export const admin = [

    {
        title: "Dashboard",
        icon: Home, // Assign the icon reference
        href: `/${commonPath}/admin`,
        accordion: false
    },
    {
        title: "General Settings",
        icon: Settings, // Assign the icon reference
        accordion: true,
        pages: [
            {href: `/${commonPath}/institute-profile`, anchor: "Institute Profile"},
            {href: `/${commonPath}/fee-particuler`, anchor: "Fees Particulars"},
            {href: `/${commonPath}/fee-structure`, anchor: "Fees Structure"},
            {href: `/${commonPath}/discount-type`, anchor: "Discount Type"},
            {href: `/${commonPath}/bank-details`, anchor: "Accounts For Fees Invoice"},
            {href: `/${commonPath}/rules`, anchor: "Rules & Regulations"},
            {href: `/${commonPath}/grading`, anchor: "Marks Grading"},
            {href: `/${commonPath}/theme-settings`, anchor: "Theme & Language"},
            {href: `/${commonPath}/account-settings`, anchor: "Account Settings"}
        ]
    },
    {
        title: "Classes",
        icon: Ruler,
        accordion: true,
        pages: [
            {href: `/${commonPath}/classes`, anchor: "All ClassesPage"},
            {href: `/${commonPath}/addnewclass`, anchor: "New Class"}
        ]
    },
    // {
    //     title: "Subjects",
    //     icon: Book,
    //     accordion: true,
    //     pages: [
    //         {href: `/${commonPath}/show-subject`, anchor: "ClassesPage With Subjects"},
    //         {href: `/${commonPath}/add-subject`, anchor: "Assign Subjects"}
    //     ]
    // },
    {
        title: "Students",
        icon: User,
        accordion: true,
        pages: [
            {href: `/${commonPath}/allstudent`, anchor: "All Students"},
            {href: `/${commonPath}/admission`, anchor: "Add new"},
            {href: `/${commonPath}/manage-family`, anchor: "Manage Families"},
            {href: `/${commonPath}/active-state`, anchor: "Active / Inactive"},
            {href: `/${commonPath}/admission-letter`, anchor: "Admission Letter"},
            {href: `/${commonPath}/studentid`, anchor: "Student ID Cards"},
            {href: `/${commonPath}/print-info`, anchor: "Student Basic Table info"},
            {href: `/${commonPath}/student-login`, anchor: "Manage Login"},

        ]
    },
    {
        title: "Employees",
        icon: BriefcaseBusiness,
        accordion: true,
        pages: [
            {href: `/${commonPath}/all-employees`, anchor: "All Employees"},
            {href: `/${commonPath}/add-teacher`, anchor: "Add new"},
            {href: `/${commonPath}/staffIDcard`, anchor: "Staff ID Cards"},
            {href: `/${commonPath}/appoinment-letter`, anchor: "Job Letter"},

        ]
    },
    {
        title: "Accounts",
        icon: Wallet,
        accordion: true,
        pages: [
            {href: `/${commonPath}/accounts-chart`, anchor: "Chart Of Account"},
            {href: `/${commonPath}/income`, anchor: "Add Income"},
            {href: `/${commonPath}/expense`, anchor: "Add Expense"},
            {href: `/${commonPath}/balance`, anchor: "Account Statement"}
        ]
    },
    {
        title: "Fees",
        icon: CircleDollarSign,
        accordion: true,
        pages: [
            {href: `/${commonPath}/get-invoice`, anchor: "Generate Fees Invoice"},
            {href: `/${commonPath}/collect-fees`, anchor: "Collect Fees"},
            {href: `/${commonPath}/feesPaidSlip`, anchor: "Fees Paid Slip"},
            {href: `/${commonPath}/defaulter`, anchor: "Fees Defaulters"},
            {href: `/${commonPath}/fee-report`, anchor: "Fees Report"},
            {href: `/${commonPath}/fee-delete`, anchor: "Delete Fees"}
        ]
    }
    ,
    {
        title: "Salary",
        icon: CreditCard,
        accordion: true,
        pages: [
            {href: `/${commonPath}/submit-salary`, anchor: "Pay Salary"},
            {href: `/${commonPath}/salary-slip`, anchor: "Salary Paid Slip"},
        ]
    }
    ,
    {
        title: "Attendence",
        icon: Hand,
        accordion: true,
        pages: [
            {href: `/${commonPath}/std-attendence`, anchor: "Student Attendence"},
            {href: `/${commonPath}/std-attReport`, anchor: "Students Attendence Report"},

        ]
    }
    ,
    // {
    //     title: "Timetable",
    //     icon: CalendarCheck,
    //     accordion: true,
    //     pages: [
    //         {href: `/${commonPath}/weekdays`, anchor: "Weekdays"},
    //         {href: `/${commonPath}/time-periods`, anchor: "Time Periods"},
    //         {href: `/${commonPath}/class-rooms`, anchor: "Class Rooms"},
    //         {href: `/${commonPath}/add-timetable`, anchor: "Create Timetable"},
    //         {href: `/${commonPath}/generate-class`, anchor: "Generate For Class"},
    //         {href: `/${commonPath}/generate-teacher`, anchor: "Generate For Teacher"}
    //     ]
    // },
    {
        title: "Academic Year",
        icon: GraduationCap , // Assign the icon reference
        href: `/${commonPath}/academic-year`,
        accordion: false
    }   ,
    {
        title: "Homework",
        icon: NotebookPen , // Assign the icon reference
        href: `/${commonPath}/homework`,
        accordion: false
    }
];


