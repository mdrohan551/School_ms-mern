import {
    User,
    IdCard,
    ReceiptText,
    Calendar,
    TicketsPlane,
    FileUser,
    BookOpenCheck,
    FilePenLine,
    ShoppingCart,
    MessageCircleMore,
    Video,
    Settings,
    LogOut

} from "lucide-react"; // Import Lucide icons


let commonPath = "dashboard";

export const studentcontent = [
    {
        title: "Student Dashboard",
        icon: User,
        href: `/${commonPath}/student`,


    },
    {
        title: "Admission Letter",
        icon: IdCard,
        href: `/${commonPath}/admissionletter`,
    },
    {
        title: "Paid Fee Recipt",
        icon: ReceiptText,
        href: `/${commonPath}/feeslip`,
    }, {
        title: "My Timetable",
        icon: Calendar,
        href: `/${commonPath}/mytimetable`,
    }, {
        title: "My Report StudentIdCardStyleButton",
        icon: TicketsPlane,
        href: `/${commonPath}/reportcard`,
    }, {
        title: "Test Result",
        icon: FileUser,
        href: `/${commonPath}/classtest`,
    }, {
        title: "Exam Result",
        icon: BookOpenCheck,
        href: `/${commonPath}/examresult`,
    }, {
        title: "Home work",
        icon: FilePenLine,
        href: `/${commonPath}/homework`,
    }, {
        title: "Online Store",
        icon: ShoppingCart,
        href: `/${commonPath}/onlinestore`,
    }, {
        title: "Messaging",
        icon: MessageCircleMore,
        href: `/${commonPath}/MessageBox`,
    }, {
        title: "Live Class",
        icon: Video,
        href: `/${commonPath}/liveclass`,
    }, {
        title: "Account Settings",
        icon: Settings,
        href: `/${commonPath}/account`,
    }, {
        title: "Log out",
        icon: LogOut,
        href: `/${commonPath}/Logout`,
    },
]