import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
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
import Heading from "../ui/Heading";
import {
  TrendingUp,
  MapPin,
  Target,
  DollarSign,
  PieChart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Users,
  Building,
  Clock,
  FileText,
  Shield,
  Zap,
  BarChart3,
  LineChart,
  ScatterChart,
  Award,
  TrendingDown,
} from "lucide-react";

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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: var(--color-grey-100);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(16, 185, 129, 0.2);
  flex-wrap: wrap;
  gap: 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #10b981, #22c55e, #16a34a);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    padding: 1.5rem;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    text-align: center;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 0.5rem;
  }
`;

const SelectContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SelectInput = styled.select`
  padding: 1rem 1.5rem;
  border: 2px solid var(--color-grey-300);
  border-radius: 12px;
  background: var(--color-grey-100);
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 500;
  width: 20rem;
  max-width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
    transform: translateY(-2px);
  }

  &:hover {
    border-color: #22c55e;
    transform: translateY(-1px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 20rem;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
`;

const Card = styled(motion.div)`
  background: var(--color-grey-100);
  border: 1px solid var(--color-grey-200);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
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
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MetricCard = styled.div`
  background: var(--color-grey-100);
  border: 1px solid var(--color-grey-200);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #10b981, #22c55e);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: var(--color-grey-100);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);

    &::before {
      opacity: 1;
    }
  }
`;

const MetricValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const MetricLabel = styled.div`
  font-size: 0.875rem;
  color: #d1d5db;
  font-weight: 500;
`;

const ChartContainer = styled.div`
  height: 250px;
  position: relative;
  margin: 1rem 0;
  background: var(--color-grey-100);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(16, 185, 129, 0.2);

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const LargeChartContainer = styled.div`
  height: 350px;
  position: relative;
  margin: 1rem 0;
  background: var(--color-grey-100);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(16, 185, 129, 0.2);

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: var(--color-grey-300);
  border-radius: 6px;
  overflow: hidden;
  margin: 1rem 0;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${(props) => props.color || "#10b981"};
  width: ${(props) => props.percentage}%;
  transition: width 0.8s ease;
  border-radius: 6px;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
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

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #d1d5db;
  margin-top: 0.5rem;
`;

const StatusDot = styled.div`
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 50%;
  background: ${(props) => props.color};
`;

const DataTable = styled.div`
  margin-top: 1rem;
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.div`
  font-size: 0.875rem;
  color: ${(props) => (props.emphasis ? "#ffffff" : "#d1d5db")};
  font-weight: ${(props) => (props.emphasis ? "600" : "400")};
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  svg {
    color: white;
    width: 20px;
    height: 20px;
  }
`;

const KPIValueLarge = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const KPILabel = styled.div`
  font-size: 0.875rem;
  color: #d1d5db;
  font-weight: 500;
`;

const AlertCard = styled.div`
  background: ${(props) =>
    props.type === "warning"
      ? "rgba(245, 158, 11, 0.1)"
      : "rgba(16, 185, 129, 0.1)"};
  border: 1px solid
    ${(props) =>
      props.type === "warning"
        ? "rgba(245, 158, 11, 0.3)"
        : "rgba(16, 185, 129, 0.3)"};
  border-radius: 12px;
  padding: 1rem;
  margin: 0.5rem 0;
`;

const AlertText = styled.div`
  font-size: 0.875rem;
  color: #ffffff;
  font-weight: 500;
`;

const TimelineContainer = styled.div`
  margin: 1rem 0;
`;

const TimelineItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

const TimelineDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #3b82f6;
  flex-shrink: 0;
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineDate = styled.div`
  font-size: 0.75rem;
  color: #d1d5db;
  margin-bottom: 0.25rem;
`;

const TimelineText = styled.div`
  font-size: 0.875rem;
  color: #ffffff;
  font-weight: 500;
`;

function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState("");

  // Comprehensive API Data Object
  const apiData = {
    regions: [
      { value: "", label: "المنطقة" },
      { value: "جازان", label: "جازان" },
      { value: "مناطق المملكة", label: "مناطق المملكة" },
      { value: "الرياض", label: "الرياض" },
      { value: "مكة المكرمة", label: "مكة المكرمة" },
      { value: "المنطقة الشرقية", label: "المنطقة الشرقية" },
      { value: "المدينة المنورة", label: "المدينة المنورة" },
      { value: "نجران", label: "نجران" },
      { value: "حائل", label: "حائل" },
      { value: "القصيم", label: "القصيم" },
      { value: "الحدود الشمالية", label: "الحدود الشمالية" },
      { value: "عسير", label: "عسير" },
      { value: "الباحة", label: "الباحة" },
      { value: "تبوك", label: "تبوك" },
      { value: "الجوف", label: "الجوف" },
    ],
    overview: {
      totalProjects: 112,
      completedProjects: 38,
      activeProjects: 74,
      totalBudget: "35.55 مليار",
      spentBudget: "8.26 مليار",
      completionRate: 28,
      plannedCompletion: 32,
      timelineProgress: 28,
    },
    regionalData: {
      جازان: { projects: 26, completion: 85, budget: 2.8 },
      "مناطق المملكة": { projects: 21, completion: 78, budget: 3.2 },
      الرياض: { projects: 13, completion: 92, budget: 4.1 },
      "مكة المكرمة": { projects: 9, completion: 88, budget: 2.5 },
      "المنطقة الشرقية": { projects: 5, completion: 75, budget: 1.8 },
    },
    sectors: [
      { name: "الأسماك", projects: 16, value: 0.22 },
      { name: "البن العربي", projects: 9, value: 0.38 },
      { name: "العسل", projects: 12, value: 0.48 },
      { name: "الفاكهة", projects: 12, value: 0.72 },
      { name: "القيمة المضافة", projects: 20, value: 1.09 },
    ],
    projectStages: [
      { stage: "بدء المشروع", count: 4, value: 0.9 },
      { stage: "الطرح", count: 1, value: 0.98 },
      { stage: "إنتهاء المشروع", count: 21, value: 1.12 },
      { stage: "تم الترسية", count: 63, value: 1.53 },
    ],
    recentActivities: [
      {
        date: "2025-09-15",
        activity: "تسليم 6 أراضي لقطاعات الأسماك والورد والماشية",
      },
      {
        date: "2025-09-10",
        activity: "إنتهاء الدراسات الفنية لـ4 مشاريع تسويقية",
      },
      { date: "2025-09-05", activity: "مراجعة 620 طلب إعتماد فني" },
      { date: "2025-09-01", activity: "توقيع 8 عقود جديدة بقيمة 2.3 مليار" },
    ],
    risks: [
      { id: 1, risk: "تأخير في ترسية مشاريع الاشراف", level: "high" },
      { id: 2, risk: "تأخير في المشاريع مع الالتزام المالي", level: "medium" },
      { id: 3, risk: "تأخير في صرف المستخلصات", level: "medium" },
    ],
    qualityMetrics: {
      fieldVisits: 350,
      approvals: 287,
      complianceRate: 92,
      changeOrders: 14,
    },
    monthlyProgress: [
      { month: "يناير", planned: 5, actual: 4, budget: 2.1 },
      { month: "فبراير", planned: 10, actual: 8, budget: 4.2 },
      { month: "مارس", planned: 15, actual: 12, budget: 6.3 },
      { month: "أبريل", planned: 20, actual: 18, budget: 8.4 },
      { month: "مايو", planned: 25, actual: 22, budget: 10.5 },
      { month: "يونيو", planned: 30, actual: 28, budget: 12.6 },
    ],
    performanceMetrics: [
      { metric: "كفاءة التنفيذ", value: 94, target: 90, trend: "up" },
      { metric: "جودة المشاريع", value: 88, target: 85, trend: "up" },
      { metric: "الالتزام بالمواعيد", value: 76, target: 80, trend: "down" },
      { metric: "رضا العملاء", value: 92, target: 90, trend: "up" },
    ],
    budgetAllocation: [
      { category: "البنية التحتية", amount: 15.2, percentage: 43 },
      { category: "التطوير التقني", amount: 8.5, percentage: 24 },
      { category: "الموارد البشرية", amount: 6.8, percentage: 19 },
      { category: "التشغيل والصيانة", amount: 5.0, percentage: 14 },
    ],
    riskAssessment: [
      { risk: "مخاطر تقنية", probability: 25, impact: 70, level: "medium" },
      { risk: "مخاطر مالية", probability: 10, impact: 85, level: "medium" },
      { risk: "مخاطر زمنية", probability: 40, impact: 60, level: "high" },
      { risk: "مخاطر جودة", probability: 20, impact: 75, level: "medium" },
    ],
  };

  // Filter data based on selected region
  const getFilteredData = () => {
    if (!selectedRegion) {
      return apiData;
    }

    const regionData = apiData.regionalData[selectedRegion];
    if (!regionData) {
      return apiData;
    }

    // Return filtered data for the selected region
    return {
      ...apiData,
      overview: {
        ...apiData.overview,
        totalProjects: regionData.projects,
        completedProjects: Math.round(
          regionData.projects * (regionData.completion / 100)
        ),
        activeProjects:
          regionData.projects -
          Math.round(regionData.projects * (regionData.completion / 100)),
        totalBudget: `${regionData.budget} مليار`,
        spentBudget: `${(
          regionData.budget *
          (regionData.completion / 100)
        ).toFixed(2)} مليار`,
        completionRate: regionData.completion,
        plannedCompletion: regionData.completion + 5, // Add some planned vs actual difference
        timelineProgress: regionData.completion,
      },
      regionalData: {
        [selectedRegion]: regionData,
      },
      sectors: apiData.sectors.map((sector) => ({
        ...sector,
        projects: Math.round(
          sector.projects *
            (regionData.projects / apiData.overview.totalProjects)
        ),
      })),
      projectStages: apiData.projectStages.map((stage) => ({
        ...stage,
        count: Math.round(
          stage.count * (regionData.projects / apiData.overview.totalProjects)
        ),
      })),
    };
  };

  const filteredData = getFilteredData();
  const regionOptions = apiData.regions;
  const overview = filteredData.overview;
  const regionalData = filteredData.regionalData;
  const sectors = filteredData.sectors;
  const projectStages = filteredData.projectStages;
  const recentActivities = filteredData.recentActivities;
  const risks = filteredData.risks;
  const qualityMetrics = filteredData.qualityMetrics;
  const monthlyProgress = apiData.monthlyProgress;
  const performanceMetrics = apiData.performanceMetrics;
  const budgetAllocation = apiData.budgetAllocation;
  const riskAssessment = apiData.riskAssessment;

  // Chart data configurations
  const regionalChartData = {
    labels: Object.keys(regionalData),
    datasets: [
      {
        data: Object.values(regionalData).map((r) => r.projects),
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
        borderWidth: 0,
      },
    ],
  };

  const sectorsChartData = {
    labels: sectors.map((s) => s.name),
    datasets: [
      {
        data: sectors.map((s) => s.projects),
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
        ],
        borderWidth: 0,
      },
    ],
  };

  const stagesChartData = {
    labels: projectStages.map((s) => s.stage),
    datasets: [
      {
        data: projectStages.map((s) => s.count),
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  const timelineData = {
    labels: ["2021", "2022", "2023", "2024", "2025", "2026"],
    datasets: [
      {
        label: "المخطط",
        data: [0, 15, 30, 45, 60, 75],
        borderColor: "#6b7280",
        backgroundColor: "rgba(107, 114, 128, 0.1)",
        borderDash: [5, 5],
        borderWidth: 2,
        pointBackgroundColor: "#6b7280",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
      },
      {
        label: "الفعلي",
        data: [0, 8, 18, 25, 28, 28],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 8,
        fill: true,
      },
    ],
  };

  const monthlyProgressData = {
    labels: monthlyProgress.map((m) => m.month),
    datasets: [
      {
        label: "المخطط",
        data: monthlyProgress.map((m) => m.planned),
        borderColor: "#6b7280",
        backgroundColor: "rgba(107, 114, 128, 0.1)",
        tension: 0.4,
        borderWidth: 2,
        pointBackgroundColor: "#6b7280",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
      },
      {
        label: "الفعلي",
        data: monthlyProgress.map((m) => m.actual),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 8,
        fill: true,
      },
    ],
  };

  const budgetAllocationData = {
    labels: budgetAllocation.map((b) => b.category),
    datasets: [
      {
        data: budgetAllocation.map((b) => b.amount),
        backgroundColor: ["#10b981", "#22c55e", "#16a34a", "#15803d"],
        borderWidth: 2,
        borderColor: "#ffffff",
        hoverBackgroundColor: ["#059669", "#16a34a", "#15803d", "#166534"],
        hoverBorderWidth: 3,
      },
    ],
  };

  const riskAssessmentData = {
    datasets: [
      {
        label: "مخاطر المشاريع",
        data: riskAssessment.map((r) => ({
          x: r.probability,
          y: r.impact,
        })),
        backgroundColor: riskAssessment.map((r) =>
          r.level === "high"
            ? "#ef4444"
            : r.level === "medium"
            ? "#f59e0b"
            : "#10b981"
        ),
        borderColor: "#ffffff",
        borderWidth: 2,
        pointRadius: 12,
        hoverRadius: 16,
        width: 2,
        tension: 0.4,
        height: 2,
        hoverBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const doughnutOptions = {
    ...chartOptions,
    cutout: "60%",
    plugins: {
      ...chartOptions.plugins,
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          color: "#ffffff",
          font: {
            size: 13,
            weight: "600",
          },
        },
      },
    },
  };

  const lineOptions = {
    ...chartOptions,
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(107, 114, 128, 0.2)",
          lineWidth: 1,
        },
        ticks: {
          color: "#ffffff",
          font: {
            size: 12,
            weight: "500",
          },
        },
        border: {
          color: "rgba(107, 114, 128, 0.3)",
        },
      },
      x: {
        grid: {
          color: "rgba(107, 114, 128, 0.2)",
          lineWidth: 1,
        },
        ticks: {
          color: "#ffffff",
          font: {
            size: 12,
            weight: "500",
          },
        },
        border: {
          color: "rgba(107, 114, 128, 0.3)",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
          font: {
            size: 13,
            weight: "600",
          },
          padding: 20,
        },
      },
    },
  };

  const scatterOptions = {
    ...chartOptions,
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
    scales: {
      x: {
        beginAtZero: true,
        min: 0,
        max: 100,
        title: {
          display: true,
          text: "احتمالية الحدوث (%)",
          color: "#ffffff",
          font: {
            size: 14,
            weight: "600",
          },
        },
        grid: {
          color: "rgba(107, 114, 128, 0.2)",
          lineWidth: 1,
        },
        ticks: {
          color: "#ffffff",
          font: {
            size: 12,
            weight: "500",
          },
        },
        border: {
          color: "rgba(107, 114, 128, 0.3)",
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 100,
        title: {
          display: true,
          text: "التأثير (%)",
          color: "#ffffff",
          font: {
            size: 14,
            weight: "600",
          },
        },
        grid: {
          color: "rgba(107, 114, 128, 0.2)",
          lineWidth: 1,
        },
        ticks: {
          color: "#ffffff",
          font: {
            size: 12,
            weight: "500",
          },
        },
        border: {
          color: "rgba(107, 114, 128, 0.3)",
        },
      },
    },
  };

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Header>
          <HeaderLeft>
            <Heading
              as="h1"
              style={{ color: "var(--color-grey-800)", fontSize: "2rem" }}
            >
              لوحة متابعة المشاريع
            </Heading>
            <span
              style={{
                fontSize: "1.2rem",
                color: "var(--color-grey-600)",
                fontWeight: "500",
              }}
            >
              تحديث سبتمبر 2025
            </span>
          </HeaderLeft>
          <HeaderRight>
            <SelectContainer>
              <SelectInput
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                {regionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SelectInput>
            </SelectContainer>
          </HeaderRight>
        </Header>
      </motion.div>

      {/* Overview Metrics */}
      <DashboardGrid>
        <Card>
          <IconWrapper color="var(--color-brand-500)">
            <Building />
          </IconWrapper>
          <CardTitle>إجمالي المشاريع</CardTitle>
          <KPIValueLarge>{overview.totalProjects}</KPIValueLarge>
          <KPILabel>مشروع نشط</KPILabel>
          <ProgressBar>
            <ProgressFill
              percentage={
                (overview.completedProjects / overview.totalProjects) * 100
              }
              color="var(--color-brand-500)"
            />
          </ProgressBar>
          <StatusIndicator>
            <StatusDot color="var(--color-green-500)" />
            <span>مكتمل: {overview.completedProjects}</span>
            <StatusDot color="var(--color-brand-500)" />
            <span>نشط: {overview.activeProjects}</span>
          </StatusIndicator>
        </Card>

        <Card>
          <IconWrapper color="var(--color-green-500)">
            <DollarSign />
          </IconWrapper>
          <CardTitle>الميزانية</CardTitle>
          <KPIValueLarge>{overview.totalBudget}</KPIValueLarge>
          <KPILabel>ريال سعودي</KPILabel>
          <ProgressBar>
            <ProgressFill
              percentage={
                (parseFloat(overview.spentBudget) /
                  parseFloat(overview.totalBudget)) *
                100
              }
              color="var(--color-brand-500)"
            />
          </ProgressBar>
          <StatusIndicator>
            <StatusDot color="var(--color-brand-500)" />
            <span>منفق: {overview.spentBudget}</span>
            <StatusDot color="var(--color-brand-500)" />
            <span>
              متبقي:{" "}
              {parseFloat(overview.totalBudget) -
                parseFloat(overview.spentBudget)}{" "}
              مليار
            </span>
          </StatusIndicator>
        </Card>

        <Card>
          <IconWrapper color="var(--color-yellow-500)">
            <Target />
          </IconWrapper>
          <CardTitle>معدل الإنجاز</CardTitle>
          <KPIValueLarge>{overview.completionRate}%</KPIValueLarge>
          <KPILabel>من المستهدف</KPILabel>
          <ProgressBar>
            <ProgressFill
              percentage={overview.completionRate}
              color="var(--color-brand-500)"
            />
          </ProgressBar>
          <StatusIndicator>
            <StatusDot color="var(--color-yellow-500)" />
            <span>فعلي: {overview.completionRate}%</span>
            <StatusDot color="var(--color-brand-500)" />
            <span>مخطط: {overview.plannedCompletion}%</span>
          </StatusIndicator>
        </Card>

        <Card>
          <IconWrapper color="var(--color-red-500)">
            <Clock />
          </IconWrapper>
          <CardTitle>التقدم الزمني</CardTitle>
          <KPIValueLarge>{overview.timelineProgress}%</KPIValueLarge>
          <KPILabel>من الجدول الزمني</KPILabel>
          <ProgressBar>
            <ProgressFill
              percentage={overview.timelineProgress}
              color="var(--color-brand-500)"
            />
          </ProgressBar>
          <StatusIndicator>
            <StatusDot color="var(--color-brand-500)" />
            <span>
              متقدم عن الجدول: +
              {overview.timelineProgress - overview.plannedCompletion}%
            </span>
          </StatusIndicator>
        </Card>
      </DashboardGrid>

      {/* Regional Distribution */}
      <ChartsGrid>
        <Card>
          <CardTitle>
            <MapPin size={20} />
            التوزيع الجغرافي
          </CardTitle>
          <ChartContainer>
            <Doughnut data={regionalChartData} options={doughnutOptions} />
          </ChartContainer>
          <DataTable>
            {Object.entries(regionalData).map(([region, data]) => (
              <TableRow key={region}>
                <TableCell emphasis>{region}</TableCell>
                <TableCell>{data.projects} مشروع</TableCell>
                <TableCell>{data.completion}% إنجاز</TableCell>
              </TableRow>
            ))}
          </DataTable>
        </Card>

        <Card>
          <CardTitle>
            <PieChart size={20} />
            التوزيع القطاعي
          </CardTitle>
          <ChartContainer>
            <Doughnut data={sectorsChartData} options={doughnutOptions} />
          </ChartContainer>
          <DataTable>
            {sectors.map((sector) => (
              <TableRow key={sector.name}>
                <TableCell emphasis>{sector.name}</TableCell>
                <TableCell>{sector.projects} مشروع</TableCell>
                <TableCell>{sector.value} مليار</TableCell>
              </TableRow>
            ))}
          </DataTable>
        </Card>
      </ChartsGrid>

      {/* Project Progress */}
      <ChartsGrid>
        <Card>
          <CardTitle>
            <Activity size={20} />
            مراحل المشاريع
          </CardTitle>
          <ChartContainer>
            <Doughnut data={stagesChartData} options={doughnutOptions} />
          </ChartContainer>
          <DataTable>
            {projectStages.map((stage) => (
              <TableRow key={stage.stage}>
                <TableCell emphasis>{stage.stage}</TableCell>
                <TableCell>{stage.count} مشروع</TableCell>
                <TableCell>{stage.value} مليار</TableCell>
              </TableRow>
            ))}
          </DataTable>
        </Card>

        <Card>
          <CardTitle>
            <TrendingUp size={20} />
            التقدم الزمني
          </CardTitle>
          <ChartContainer>
            <Bar data={timelineData} options={lineOptions} />
          </ChartContainer>
          <MetricsGrid>
            <MetricCard>
              <MetricValue>28%</MetricValue>
              <MetricLabel>الإنجاز الفعلي</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>32%</MetricValue>
              <MetricLabel>المخطط</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>-4%</MetricValue>
              <MetricLabel>الانحراف</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>2026</MetricValue>
              <MetricLabel>نهاية البرنامج</MetricLabel>
            </MetricCard>
          </MetricsGrid>
        </Card>
      </ChartsGrid>

      {/* Quality and Activities */}
      <DashboardGrid>
        <Card>
          <CardTitle>
            <CheckCircle size={20} />
            مؤشرات الجودة
          </CardTitle>
          <MetricsGrid>
            <MetricCard>
              <MetricValue>{qualityMetrics.fieldVisits}</MetricValue>
              <MetricLabel>زيارات ميدانية</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>{qualityMetrics.approvals}</MetricValue>
              <MetricLabel>اعتمادات</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>{qualityMetrics.complianceRate}%</MetricValue>
              <MetricLabel>معدل المطابقة</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>{qualityMetrics.changeOrders}</MetricValue>
              <MetricLabel>أوامر التغيير</MetricLabel>
            </MetricCard>
          </MetricsGrid>

          <StatusIndicator>
            <StatusDot color="var(--color-brand-500)" />
            <span>أداء عالي</span>
            <StatusDot color="var(--color-yellow-700)" />
            <span>متوسط</span>
            <StatusDot color="var(--color-red-700)" />
            <span>يتطلب تحسين</span>
          </StatusIndicator>
        </Card>

        <Card>
          <CardTitle>
            <FileText size={20} />
            النشاطات الحديثة
          </CardTitle>
          <TimelineContainer>
            {recentActivities.map((activity, index) => (
              <TimelineItem key={index}>
                <TimelineDot />
                <TimelineContent>
                  <TimelineDate>{activity.date}</TimelineDate>
                  <TimelineText>{activity.activity}</TimelineText>
                </TimelineContent>
              </TimelineItem>
            ))}
          </TimelineContainer>
        </Card>
      </DashboardGrid>

      {/* Risks and Alerts */}
      <DashboardGrid>
        <Card>
          <CardTitle>
            <AlertTriangle size={20} />
            المخاطر الرئيسية
          </CardTitle>
          {risks.map((risk) => (
            <AlertCard
              key={risk.id}
              type={risk.level === "high" ? "warning" : "info"}
            >
              <AlertText>{risk.risk}</AlertText>
              <StatusIndicator>
                <StatusDot
                  color={
                    risk.level === "high"
                      ? "var(--color-red-700)"
                      : "var(--color-yellow-700)"
                  }
                />
                <span>مستوى {risk.level === "high" ? "عالي" : "متوسط"}</span>
              </StatusIndicator>
            </AlertCard>
          ))}
        </Card>

        <Card>
          <CardTitle>
            <Shield size={20} />
            مؤشرات الأمان
          </CardTitle>
          <MetricsGrid>
            <MetricCard>
              <MetricValue>98%</MetricValue>
              <MetricLabel>التزام بالمواصفات</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>100%</MetricValue>
              <MetricLabel>تقارير السلامة</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>0</MetricValue>
              <MetricLabel>حوادث رئيسية</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>95%</MetricValue>
              <MetricLabel>تدريب العاملين</MetricLabel>
            </MetricCard>
          </MetricsGrid>
        </Card>
      </DashboardGrid>

      {/* Performance Indicators */}
      <DashboardGrid>
        <Card>
          <CardTitle>
            <Zap size={20} />
            أداء المشاريع
          </CardTitle>
          <DataTable>
            <TableRow>
              <TableCell emphasis>المشاريع ضمن الميزانية</TableCell>
              <TableCell>94%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell emphasis>المشاريع ضمن الجدول</TableCell>
              <TableCell>88%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell emphasis>رضا العملاء</TableCell>
              <TableCell>96%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell emphasis>جودة التنفيذ</TableCell>
              <TableCell>92%</TableCell>
            </TableRow>
          </DataTable>
        </Card>

        <Card>
          <CardTitle>
            <Users size={20} />
            الموارد البشرية
          </CardTitle>
          <DataTable>
            <TableRow>
              <TableCell emphasis>إجمالي العاملين</TableCell>
              <TableCell>1,250</TableCell>
            </TableRow>
            <TableRow>
              <TableCell emphasis>مهندسين</TableCell>
              <TableCell>450</TableCell>
            </TableRow>
            <TableRow>
              <TableCell emphasis>فنيين</TableCell>
              <TableCell>600</TableCell>
            </TableRow>
            <TableRow>
              <TableCell emphasis>إداريين</TableCell>
              <TableCell>200</TableCell>
            </TableRow>
          </DataTable>
        </Card>
      </DashboardGrid>

      {/* New Charts Section */}
      <ChartsGrid>
        <Card>
          <CardTitle>
            <LineChart size={20} />
            التقدم الشهري
          </CardTitle>
          <LargeChartContainer>
            <Line data={monthlyProgressData} options={lineOptions} />
          </LargeChartContainer>
          <DataTable>
            {monthlyProgress.map((month) => (
              <TableRow key={month.month}>
                <TableCell emphasis>{month.month}</TableCell>
                <TableCell>مخطط: {month.planned}%</TableCell>
                <TableCell>فعلي: {month.actual}%</TableCell>
              </TableRow>
            ))}
          </DataTable>
        </Card>

        <Card>
          <CardTitle>
            <BarChart3 size={20} />
            توزيع الميزانية
          </CardTitle>
          <ChartContainer>
            <Doughnut data={budgetAllocationData} options={doughnutOptions} />
          </ChartContainer>
          <DataTable>
            {budgetAllocation.map((budget) => (
              <TableRow key={budget.category}>
                <TableCell emphasis>{budget.category}</TableCell>
                <TableCell>{budget.amount} مليار</TableCell>
                <TableCell>{budget.percentage}%</TableCell>
              </TableRow>
            ))}
          </DataTable>
        </Card>
      </ChartsGrid>

      {/* Risk Assessment Chart */}
      <ChartsGrid>
        <Card>
          <CardTitle>
            <ScatterChart size={20} />
            تقييم المخاطر
          </CardTitle>
          <LargeChartContainer>
            <Scatter data={riskAssessmentData} options={scatterOptions} />
          </LargeChartContainer>
          <DataTable>
            {riskAssessment.map((risk) => (
              <TableRow key={risk.risk}>
                <TableCell emphasis>{risk.risk}</TableCell>
                <TableCell>احتمالية: {risk.probability}%</TableCell>
                <TableCell>تأثير: {risk.impact}%</TableCell>
              </TableRow>
            ))}
          </DataTable>
        </Card>

        <Card>
          <CardTitle>
            <Award size={20} />
            مؤشرات الأداء
          </CardTitle>
          <MetricsGrid>
            {performanceMetrics.map((metric) => (
              <MetricCard key={metric.metric}>
                <MetricValue>
                  {metric.value}%
                  {metric.trend === "up" ? (
                    <TrendingUp size={16} color="var(--color-brand-500)" />
                  ) : (
                    <TrendingDown size={16} color="var(--color-red-700)" />
                  )}
                </MetricValue>
                <MetricLabel>{metric.metric}</MetricLabel>
                <ProgressBar>
                  <ProgressFill
                    percentage={metric.value}
                    color={
                      metric.value >= metric.target
                        ? "var(--color-brand-500)"
                        : "var(--color-red-700)"
                    }
                  />
                </ProgressBar>
              </MetricCard>
            ))}
          </MetricsGrid>
        </Card>
      </ChartsGrid>
    </Container>
  );
}

export default Dashboard;
