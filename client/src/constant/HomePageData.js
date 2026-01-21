import {
  UserPlus,
  MoveRight,
  ThumbsUp,
  CloudFog,
  RefreshCw,
  MonitorSmartphone,
  BarChart3,
  ShieldCheck,
  Landmark,
  Users,
  NotebookPen,
  Smile,
  BadgeDollarSign,
  ListChecks,
  Scale,
  FileText,
} from 'lucide-react';

// HomePageData
const HomePageData = {
  homeBanner: {
    title: "Free Online School Management Software.",
    description: "Now you can manage your school, college, or any educational center with HomeEdu. It's 100% free for a lifetime with no limitations.",
    signUpButton: {
      text: "Sign Up Now, It's Free",
      icon: UserPlus
    },
    learnMoreButton: {
      text: "Learn More",
      icon: MoveRight
    },
    BannerImg: {
      pc: '../../public/assests/desktop-min.png',
      laptop: '../../public/assests/laptop.png',
      mobile1: '../../public/assests/phone (1).png',
      mobile2: '../../public/assests/mobile1.png',
      phoneVidoe: "../../public/assests/greenphone.mp4",
      phoneVidoe2: "../../public/assests/whitePhone.mp4",

    }
  }
};

const assertsImg = {
  img1: '../../public/assests/15-min.png',
  img2: '../../public/assests/6-min.png',
  img3: '../../public/assests/9-min.png',
  img4: '../../public/assests/a4.png',
  img5: '../../public/assests/a6.png',
};

// Features Of School Management Software
const FeaturesOfSchoolData = {
  title: "Features Of School Management Software",
  description: "HomeEdu is a complete and feature-rich school management software for all educational institutes. This school management software is for learning, administration, and management activities in schools, colleges, universities, tuition centers, or training centers. Our free school management system manages everything starting from admission to attendance and exams to result in cards.",

  SubFeatureDataLeft: [
    {
      title: "Absolutely Free",
      description: "HomeEdu is an absolutely 100% free school management software for a lifetime with no limitations. No need to buy anything. Just Sign Up",
      icon: ThumbsUp
    },
    {
      title: "Cloud Based Software",
      description: "HomeEdu is free school software that is always online, you can access it from anywhere, anytime. We will take care of your data and backups.",
      icon: CloudFog
    },
    {
      title: "Regular Updates & Support",
      description: "We add new and awesome features regularly to make our school administrative software unmatchable. Free online 24/7 support for users.",
      icon: RefreshCw
    }
  ],
  SubFeatureDataRight: [
    {
      title: "Responsive Web Design",
      description: "You can use our free school management software on any device, like Mobile, Tablet, Laptop, or desktop due to its responsive design.",
      icon: MonitorSmartphone
    },
    {
      title: "Infographics & Animations",
      description: "We use infographics and animations to explain student's reports and results. Our free school software facilitates you with the optimized result",
      icon: BarChart3
    },
    {
      title: "Fast, Secure & Easy",
      description: "We use advanced tools and technologies to build up this free school software. It is super fast, secure, reliable, and easy to use and manage",
      icon: ShieldCheck
    }
  ]
};


const whyChoose = {
  title: "Why HomeEdu is the best school management software?",
  description: "Besides, eSkooly is a completely free online school management software, it has more school management features than any other online school management system in the market. It does not end here, eSkooly is still enhancing features. You will be automatically updated as a new feature will be a part of our free school management software. Some main school management features are given below.",
  mainPhoto: '../../public/assests/desktop-min.png',
  mainVideo: "../../public/assests/main.mp4",
  leptopMain: "../../public/assests/laptopvidoe.mp4",

};

const allFeatures = [
  {
    icon: Landmark,
    title: "Institute Info",
    description:
      "You can set your all institute info like logo, name, target line ect, which will display on every printable documents and reports.",
  },
  {
    icon: Users,
    title: "Class Management",
    description:
      "This school management software manage your classes in an easy way. starts from students to subjects, courses to marks",
  },
  {
    icon: NotebookPen,
    title: "Exams Management",
    description:
      "eSkooly has a complete solution for exams management starting from new exam to final result, reports and result cards.",
  },
  {
    icon: Smile,
    title: "Attendance System",
    description:
      "Our free school software has outstanding online attendance management system for students and staff.",
  },
  {
    icon: BadgeDollarSign,
    title: "Fee Management",
    description:
      "Our school software opens an account for every student to manage its fees and dues. eSkooly manages everything automatically.",
  },
  {
    icon: ListChecks,
    title: "Tests Management",
    description:
      "Managing class tests is a piece of cake with this free school management software. It keeps record of every class test.",
  },
  {
    icon: Scale,
    title: "Accounts",
    description:
      "Managing income, expense, and staff salaries is no more difficult. By using our software you can manage quite easily.",
  },
  {
    icon: FileText,
    title: "Printable Reports",
    description:
      "You can print all the reports and letters like, admission letter, fee slip, salary slip, job letter and result cards etc.",
  },
];
const singleSolutioncontent = {
  title: "Single Stop Solution For School Management",
  description: `Managing any educational institute is not a piece of cake. Managing students, staff, timetable, exams, class test, attendance, fees collection, accounts, etc. It does not end here. Parents are always worried about their child's performance and they need satisfaction. They care about their child's academic statics. Moreover, we have seen schools using huge registers to mark the attendance of their students and staff. And we have also seen that schools manage their admission, exams data, class tests data, etc, manually. We know it takes a lot of time and is very difficult to manage.
  Well! it's time to put check on these worries. eSkooly presents you a free online school management software to make conventional tasks easier. This is the one-stop solution to manage, track and record everything within your school or organization. Our free online school management software includes admin, staff and students panel, exams module, attendance module, fees collection module, salary and expense management, class tests management, inventory management, students and staff data record system, and many more. It is very easy to use and manage because eskooly is a free online school management software for end-users. If you can send an email you can use eskooly.`,
  Image: "../../public/assests/desktop-min.png"
};






export { HomePageData, assertsImg, FeaturesOfSchoolData, whyChoose, allFeatures, singleSolutioncontent };