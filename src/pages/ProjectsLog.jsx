import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
} from "chart.js";
import { Doughnut, Bar, Line, Scatter } from "react-chartjs-2";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
);

const Container = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 2rem;
  overflow-x: auto;
  box-sizing: border-box;
  background: var(--color-grey-100);
  min-height: 100vh;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 80%,
        rgba(16, 185, 129, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 20%,
        rgba(34, 197, 94, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 40% 40%,
        rgba(22, 163, 74, 0.1) 0%,
        transparent 50%
      );
    pointer-events: none;
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 1200px) {
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: var(--color-grey-100);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(16, 185, 129, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #10b981, #22c55e, #16a34a);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
    border-color: rgba(16, 185, 129, 0.3);

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 1.5rem;
  }
`;

const ProjectTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

const ProjectDate = styled.div`
  font-size: 1.6rem;
  color: #d1d5db;
  background: var(--color-grey-100);
  padding: 0.8rem 1.6rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid rgba(16, 185, 129, 0.2);
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2.4rem;
  margin-bottom: 3.2rem;
`;

const Card = styled.div`
  background: var(--color-grey-100);
  border: 1px solid var(--color-grey-200);
  border-radius: 16px;
  padding: 2.4rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #10b981, #22c55e, #16a34a);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
    border-color: rgba(16, 185, 129, 0.3);

    &::before {
      opacity: 1;
    }
  }
`;

const CardTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1.6rem;
`;

const ChartContainer = styled.div`
  position: relative;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-grey-100);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 1rem;
  box-sizing: border-box;
`;

const ProjectDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
  margin-bottom: 3.2rem;
`;

const DetailsCard = styled.div`
  background: var(--color-grey-100);
  border: 1px solid var(--color-grey-200);
  border-radius: 16px;
  padding: 2.4rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #10b981, #22c55e, #16a34a);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
    border-color: rgba(16, 185, 129, 0.3);

    &::before {
      opacity: 1;
    }
  }
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  font-size: 1.4rem;
  color: #d1d5db;
  font-weight: 500;
`;

const DetailValue = styled.span`
  font-size: 1.4rem;
  color: #ffffff;
  font-weight: 600;
`;

const StatusBadge = styled.span`
  background: ${(props) =>
    props.status === "regular"
      ? "var(--color-green-100)"
      : props.status === "delayed"
      ? "var(--color-red-100)"
      : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.status === "regular"
      ? "var(--color-green-700)"
      : props.status === "delayed"
      ? "var(--color-red-700)"
      : "var(--color-yellow-700)"};
  padding: 0.4rem 1.2rem;
  border-radius: var(--border-radius-sm);
  font-size: 1.2rem;
  font-weight: 600;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: var(--color-grey-300);
  border-radius: 6px;
  overflow: hidden;
  margin: 1.6rem 0;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%
    );
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #10b981, #22c55e, #16a34a);
  width: ${(props) => props.percentage}%;
  transition: width 0.8s ease;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 4px;
    height: 100%;
    background: #ffffff;
    border-radius: 0 6px 6px 0;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  }
`;

const ScopeSection = styled.div`
  background: var(--color-grey-100);
  border: 1px solid var(--color-grey-200);
  border-radius: 16px;
  padding: 2.4rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #10b981, #22c55e, #16a34a);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
    border-color: rgba(16, 185, 129, 0.3);

    &::before {
      opacity: 1;
    }
  }
`;

const ScopeTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1.6rem;
`;

const ScopeDescription = styled.p`
  font-size: 1.4rem;
  color: #d1d5db;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ScopeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ScopeItem = styled.li`
  font-size: 1.4rem;
  color: #d1d5db;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-200);

  &:last-child {
    border-bottom: none;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3.2rem;
  padding: 2rem 0;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.2rem 2.4rem;
  background: linear-gradient(135deg, #10b981, #22c55e);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);

  &:hover {
    background: linear-gradient(135deg, #22c55e, #16a34a);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
  }

  &:disabled {
    background: var(--color-grey-300);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const DashboardSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2.4rem;
  margin-bottom: 3.2rem;
`;

const BottomSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2.4rem;
  margin-bottom: 3.2rem;
`;

const RiskTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.6rem;
`;

const TableHeader = styled.th`
  text-align: right;
  padding: 1.2rem;
  border-bottom: 1px solid var(--color-grey-200);
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(
    135deg,
    var(--color-grey-50) 0%,
    var(--color-grey-100) 100%
  );
`;

const TableCell = styled.td`
  padding: 1.2rem;
  border-bottom: 1px solid var(--color-grey-200);
  color: #d1d5db;
  font-size: 1.3rem;
`;

const AchievementList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.6rem 0 0 0;
`;

const AchievementItem = styled.li`
  font-size: 1.3rem;
  color: #d1d5db;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-200);
  line-height: 1.5;

  &:last-child {
    border-bottom: none;
  }
`;

const QualityCharts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 1.6rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const EmptySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20rem;
  background: var(--color-grey-100);
  border-radius: 16px;
  color: #d1d5db;
  font-size: 1.6rem;
  border: 1px solid var(--color-grey-200);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

function ProjectsLog() {
  // Mock data for different projects
  const projectsData = [
    {
      id: 1,
      title:
        "إنشاء وتجهيز مجمع المزارع النموذجية للإنتاج الحيواني بالمدينة المنورة",
      date: "سبتمبر 2025",
      financial: {
        labels: ["المتبقي من العقد", "قيد الاجراء"],
        data: [98, 2],
        total: "10.5M",
      },
      performance: {
        labels: [
          "ديسمبر 2024",
          "يناير 2025",
          "فبراير 2025",
          "مارس 2025",
          "أبريل 2025",
          "مايو 2025",
          "يونيو 2025",
          "يوليو 2025",
          "أغسطس 2025",
          "سبتمبر 2025",
        ],
        planned: [0, 0, 0, 0, 0, 0, 0, 0, 7, 7],
        actual: [0, 0, 0, 0, 0, 0, 0, 0, 5, 5],
      },
      stages: {
        labels: [
          "التصميمات",
          "اعمال المشتريات والعقود",
          "اعمال تنفيذية",
          "تسليم ابتدائي و اختبارات",
        ],
        planned: [100, 100, 7, 0],
        actual: [100, 100, 5, 0],
      },
      risks: [
        {
          id: 1,
          risk: "تأخر في صرف المستخلصات",
          solution: "تكثيف المتابعة مع الادارة المالية",
        },
        {
          id: 2,
          risk: "موقع الارض",
          solution:
            "التاكد من ابتعاد موقع المشروع بما يزيد عن 2 كيلو عن اقرب منطقة سكنية",
        },
      ],
      achievements: [
        "الموقع العام (انهاء أعمال تجهيز الطرق للموقع و عمل المدقات الخاصة بطرق المشروع تحت الطبقات الاسفلتية للطرق واستكمال اخذ الجسات بالموقع)",
      ],
      quality: {
        deliverables: { approved: 4, total: 4 },
        technical: { total: 35, data: [1, 2, 8, 12, 12] },
      },
      riskAssessment: [
        { x: 4, y: 3, label: "1" },
        { x: 2, y: 2, label: "2" },
      ],
    },
    {
      id: 2,
      title: "مشروع تطوير البنية التحتية للمنطقة الصناعية الجديدة",
      date: "أكتوبر 2025",
      financial: {
        labels: ["المتبقي من العقد", "قيد الاجراء"],
        data: [85, 15],
        total: "25.8M",
      },
      performance: {
        labels: [
          "ديسمبر 2024",
          "يناير 2025",
          "فبراير 2025",
          "مارس 2025",
          "أبريل 2025",
          "مايو 2025",
          "يونيو 2025",
          "يوليو 2025",
          "أغسطس 2025",
          "سبتمبر 2025",
        ],
        planned: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45],
        actual: [0, 3, 8, 12, 18, 22, 28, 32, 38, 42],
      },
      stages: {
        labels: [
          "التصميمات",
          "اعمال المشتريات والعقود",
          "اعمال تنفيذية",
          "تسليم ابتدائي و اختبارات",
        ],
        planned: [100, 100, 45, 10],
        actual: [100, 100, 42, 8],
      },
      risks: [
        {
          id: 1,
          risk: "تأخير في الحصول على التراخيص",
          solution: "التنسيق المسبق مع الجهات المعنية",
        },
        {
          id: 2,
          risk: "ارتفاع تكاليف المواد",
          solution: "تحديث العقد مع المقاول",
        },
      ],
      achievements: [
        "انتهاء التصميمات التفصيلية",
        "استكمال أعمال الحفر والردم",
        "بدء أعمال البنية التحتية",
      ],
      quality: {
        deliverables: { approved: 8, total: 10 },
        technical: { total: 42, data: [2, 3, 5, 15, 17] },
      },
      riskAssessment: [
        { x: 3, y: 4, label: "1" },
        { x: 4, y: 2, label: "2" },
      ],
    },
    {
      id: 3,
      title: "مشروع إنشاء مجمع تعليمي متكامل",
      date: "نوفمبر 2025",
      financial: {
        labels: ["المتبقي من العقد", "قيد الاجراء"],
        data: [70, 30],
        total: "18.2M",
      },
      performance: {
        labels: [
          "ديسمبر 2024",
          "يناير 2025",
          "فبراير 2025",
          "مارس 2025",
          "أبريل 2025",
          "مايو 2025",
          "يونيو 2025",
          "يوليو 2025",
          "أغسطس 2025",
          "سبتمبر 2025",
        ],
        planned: [0, 8, 16, 24, 32, 40, 48, 56, 64, 72],
        actual: [0, 6, 14, 20, 28, 35, 42, 50, 58, 65],
      },
      stages: {
        labels: [
          "التصميمات",
          "اعمال المشتريات والعقود",
          "اعمال تنفيذية",
          "تسليم ابتدائي و اختبارات",
        ],
        planned: [100, 100, 72, 25],
        actual: [100, 100, 65, 20],
      },
      risks: [
        {
          id: 1,
          risk: "تأخير في تسليم الموقع",
          solution: "متابعة مستمرة مع الجهة المالكة",
        },
        {
          id: 2,
          risk: "نقص في العمالة الماهرة",
          solution: "التعاقد مع شركات إضافية",
        },
      ],
      achievements: [
        "انتهاء التصميمات المعمارية والإنشائية",
        "بدء أعمال الحفر",
        "استكمال أعمال الأساسات",
      ],
      quality: {
        deliverables: { approved: 12, total: 15 },
        technical: { total: 28, data: [1, 2, 3, 8, 14] },
      },
      riskAssessment: [
        { x: 2, y: 3, label: "1" },
        { x: 3, y: 2, label: "2" },
      ],
    },
  ];

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const currentProject = projectsData[currentProjectIndex];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
          color: "#ffffff",
        },
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        borderColor: "#374151",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(107, 114, 128, 0.2)",
        },
        ticks: {
          color: "#ffffff",
        },
        border: {
          color: "rgba(107, 114, 128, 0.3)",
        },
      },
      y: {
        grid: {
          color: "rgba(107, 114, 128, 0.2)",
        },
        ticks: {
          color: "#ffffff",
        },
        border: {
          color: "rgba(107, 114, 128, 0.3)",
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        borderColor: "#374151",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
    scales: {
      x: {
        grid: {
          color: "rgba(107, 114, 128, 0.2)",
        },
        ticks: {
          color: "#ffffff",
        },
        border: {
          color: "rgba(107, 114, 128, 0.3)",
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: "rgba(107, 114, 128, 0.2)",
        },
        ticks: {
          color: "#ffffff",
          callback: function (value) {
            return value + "%";
          },
        },
        border: {
          color: "rgba(107, 114, 128, 0.3)",
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
          color: "#ffffff",
          font: {
            size: 13,
            weight: "600",
          },
        },
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        borderColor: "#374151",
        borderWidth: 1,
      },
    },
  };

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "الاحتمالية",
          color: "#ffffff",
          font: {
            size: 14,
            weight: "600",
          },
        },
        min: 1,
        max: 5,
        grid: {
          color: "rgba(107, 114, 128, 0.2)",
        },
        ticks: {
          color: "#ffffff",
        },
        border: {
          color: "rgba(107, 114, 128, 0.3)",
        },
      },
      y: {
        title: {
          display: true,
          text: "التأثير",
          color: "#ffffff",
          font: {
            size: 14,
            weight: "600",
          },
        },
        min: 1,
        max: 5,
        grid: {
          color: "rgba(107, 114, 128, 0.2)",
        },
        ticks: {
          color: "#ffffff",
        },
        border: {
          color: "rgba(107, 114, 128, 0.3)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        borderColor: "#374151",
        borderWidth: 1,
      },
    },
  };

  const handlePrevious = () => {
    if (currentProjectIndex > 0) {
      setCurrentProjectIndex(currentProjectIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentProjectIndex < projectsData.length - 1) {
      setCurrentProjectIndex(currentProjectIndex + 1);
    }
  };

  // Dynamic chart data based on current project
  const financialData = {
    labels: currentProject.financial.labels,
    datasets: [
      {
        data: currentProject.financial.data,
        backgroundColor: ["#3b82f6", "#f59e0b"],
        borderWidth: 0,
      },
    ],
  };

  const performanceData = {
    labels: currentProject.performance.labels,
    datasets: [
      {
        label: "المخطط",
        data: currentProject.performance.planned,
        borderColor: "#6b7280",
        backgroundColor: "rgba(107, 114, 128, 0.1)",
        tension: 0.4,
        borderDash: [5, 5],
      },
      {
        label: "الفعلي",
        data: currentProject.performance.actual,
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const stagesData = {
    labels: currentProject.stages.labels,
    datasets: [
      {
        label: "المخطط",
        data: currentProject.stages.planned,
        backgroundColor: "#f59e0b",
      },
      {
        label: "الفعلي",
        data: currentProject.stages.actual,
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const qualityDeliverablesData = {
    labels: ["معتمد مع ملاحظات"],
    datasets: [
      {
        data: [currentProject.quality.deliverables.approved],
        backgroundColor: ["#8b5cf6"],
        borderWidth: 0,
      },
    ],
  };

  const qualityTechnicalData = {
    labels: [
      "تحت الدراسة",
      "يعاد التسليم",
      "متأخر",
      "معتمد مع ملاحظات",
      "معتمد بدون ملاحظات",
    ],
    datasets: [
      {
        data: currentProject.quality.technical.data,
        backgroundColor: [
          "#10b981",
          "#34d399",
          "#f59e0b",
          "#8b5cf6",
          "#3b82f6",
        ],
        borderWidth: 0,
      },
    ],
  };

  const riskAssessmentData = {
    datasets: [
      {
        label: "المخاطر",
        data: currentProject.riskAssessment.map((risk) => ({
          x: risk.x,
          y: risk.y,
          label: risk.label,
        })),
        backgroundColor: ["#f59e0b", "#ef4444"],
        borderColor: ["#f59e0b", "#ef4444"],
        pointRadius: 12,
        pointHoverRadius: 16,
        borderWidth: 2,
      },
    ],
  };

  return (
    <Container>
      <ProjectHeader>
        <ProjectTitle>{currentProject.title}</ProjectTitle>
        <ProjectDate>{currentProject.date}</ProjectDate>
      </ProjectHeader>

      <DashboardSection>
        {/* الاداء الحالي للمشروع */}
        <Card>
          <CardTitle>الاداء الحالي للمشروع</CardTitle>
          <ChartContainer>
            <Line data={performanceData} options={lineOptions} />
          </ChartContainer>
        </Card>

        {/* مراحل المشروع */}
        <Card>
          <CardTitle>مراحل المشروع</CardTitle>
          <ChartContainer>
            <Bar data={stagesData} options={chartOptions} />
          </ChartContainer>
        </Card>

        {/* المخاطر */}
        <Card>
          <CardTitle>المخاطر</CardTitle>
          <RiskTable>
            <thead>
              <tr>
                <TableHeader>الرقم</TableHeader>
                <TableHeader>المخاطر</TableHeader>
                <TableHeader>الحل</TableHeader>
              </tr>
            </thead>
            <tbody>
              {currentProject.risks.map((risk) => (
                <tr key={risk.id}>
                  <TableCell>{risk.id}</TableCell>
                  <TableCell>{risk.risk}</TableCell>
                  <TableCell>{risk.solution}</TableCell>
                </tr>
              ))}
            </tbody>
          </RiskTable>
        </Card>
      </DashboardSection>

      <BottomSection>
        {/* ما تم انجازه */}
        <Card>
          <CardTitle>ما تم انجازه</CardTitle>
          <AchievementList>
            {currentProject.achievements.map((achievement, index) => (
              <AchievementItem key={index}>{achievement}</AchievementItem>
            ))}
          </AchievementList>
        </Card>

        {/* ادارة الجودة */}
        <Card>
          <CardTitle>ادارة الجودة</CardTitle>
          <QualityCharts>
            <div>
              <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                <div
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "600",
                    color: "#ffffff",
                  }}
                >
                  استلامات اعمال
                </div>
              </div>
              <ChartContainer style={{ height: "15rem" }}>
                <Doughnut
                  data={qualityDeliverablesData}
                  options={doughnutOptions}
                />
              </ChartContainer>
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "1rem",
                      height: "1rem",
                      backgroundColor: "#8b5cf6",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <span style={{ color: "#d1d5db", fontSize: "1.2rem" }}>
                    معتمد مع ملاحظات
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                <div
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "600",
                    color: "#ffffff",
                  }}
                >
                  اعتمادات فنية
                </div>
                <div
                  style={{
                    fontSize: "2.4rem",
                    fontWeight: "700",
                    color: "#10b981",
                  }}
                >
                  {currentProject.quality.technical.total}
                </div>
              </div>
              <ChartContainer style={{ height: "15rem" }}>
                <Doughnut
                  data={qualityTechnicalData}
                  options={doughnutOptions}
                />
              </ChartContainer>
            </div>
          </QualityCharts>
          <div style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: "#ef4444",
                  borderRadius: "50%",
                }}
              ></div>
              <span style={{ color: "#d1d5db" }}>مرفوض</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: "#f59e0b",
                  borderRadius: "50%",
                }}
              ></div>
              <span style={{ color: "#d1d5db" }}>متأخر</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: "#8b5cf6",
                  borderRadius: "50%",
                }}
              ></div>
              <span style={{ color: "#d1d5db" }}>معتمد مع ملاحظات</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: "#34d399",
                  borderRadius: "50%",
                }}
              ></div>
              <span style={{ color: "#d1d5db" }}>يعاد التسليم</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: "#10b981",
                  borderRadius: "50%",
                }}
              ></div>
              <span style={{ color: "#d1d5db" }}>تحت الدراسة</span>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: "#3b82f6",
                  borderRadius: "50%",
                }}
              ></div>
              <span style={{ color: "#d1d5db" }}>معتمد بدون ملاحظات</span>
            </div>
          </div>
        </Card>

        {/* تقييم المخاطر */}
        <Card>
          <CardTitle>تقييم المخاطر</CardTitle>
          <ChartContainer>
            <Scatter data={riskAssessmentData} options={scatterOptions} />
          </ChartContainer>
        </Card>
      </BottomSection>

      <BottomSection>
        {/* لا يوجد */}
        <EmptySection>
          <EmptyIcon>📷</EmptyIcon>
          <div>لا يوجد</div>
        </EmptySection>

        {/* البيانات المالية */}
        <Card>
          <CardTitle>البيانات المالية</CardTitle>
          <ChartContainer>
            <Doughnut data={financialData} options={doughnutOptions} />
          </ChartContainer>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <div
              style={{
                fontSize: "2.4rem",
                fontWeight: "700",
                color: "#ffffff",
              }}
            >
              {currentProject.financial.total}
            </div>
            <div style={{ fontSize: "1.2rem", color: "#d1d5db" }}>
              إجمالي المبلغ
            </div>
          </div>
        </Card>

        {/* مؤشر انجاز المشروع */}
        <Card>
          <CardTitle>مؤشر انجاز المشروع</CardTitle>
          <div style={{ textAlign: "center", marginBottom: "1.6rem" }}>
            <div
              style={{
                fontSize: "3.2rem",
                fontWeight: "700",
                color: "#10b981",
              }}
            >
              {
                currentProject.performance.actual[
                  currentProject.performance.actual.length - 1
                ]
              }
              %
            </div>
            <div style={{ fontSize: "1.4rem", color: "#d1d5db" }}>
              نسبة الانجاز الفعلي
            </div>
          </div>
          <DetailRow>
            <DetailLabel>المخطط له:</DetailLabel>
            <DetailValue>
              {
                currentProject.performance.planned[
                  currentProject.performance.planned.length - 1
                ]
              }
              %
            </DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>الحياد:</DetailLabel>
            <DetailValue style={{ color: "#ef4444" }}>
              {currentProject.performance.actual[
                currentProject.performance.actual.length - 1
              ] -
                currentProject.performance.planned[
                  currentProject.performance.planned.length - 1
                ]}
              %
            </DetailValue>
          </DetailRow>
          <ProgressBar>
            <ProgressFill
              percentage={
                currentProject.performance.actual[
                  currentProject.performance.actual.length - 1
                ]
              }
            />
          </ProgressBar>
        </Card>
      </BottomSection>

      <NavigationContainer>
        <NavButton
          onClick={handlePrevious}
          disabled={currentProjectIndex === 0}
        >
          <HiOutlineChevronLeft />
          السابق
        </NavButton>
        <NavButton
          onClick={handleNext}
          disabled={currentProjectIndex === projectsData.length - 1}
        >
          التالي
          <HiOutlineChevronRight />
        </NavButton>
      </NavigationContainer>
    </Container>
  );
}

export default ProjectsLog;
