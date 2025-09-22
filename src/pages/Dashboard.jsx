import { useState } from "react";
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
import { Doughnut, Bar, Scatter } from "react-chartjs-2";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import Heading from "../ui/Heading";

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
  padding: 1rem;
  overflow-x: auto;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    padding: 0.8rem;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-grey-200);
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
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
  padding: 0.8rem 1rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background: var(--color-grey-0);
  color: var(--color-grey-800);
  font-size: 1.2rem;
  width: 20rem;
  max-width: 100%;
  box-sizing: border-box;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--color-brand-500);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 20rem;
  }
`;

const RegionInfo = styled.div`
  background: var(--color-grey-50);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  padding: 1rem;
  margin-top: 1rem;
  font-size: 1.1rem;
  color: var(--color-grey-700);
  line-height: 1.5;

  @media (max-width: 768px) {
    margin-top: 0.8rem;
    padding: 0.8rem;
  }
`;

const RegionInfoTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-800);
  margin-bottom: 0.5rem;
  text-align: right;
`;

const RegionInfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const RegionInfoItem = styled.li`
  padding: 0.3rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:last-child {
    border-bottom: none;
  }

  strong {
    color: var(--color-brand-600);
  }
`;

const DeadlineStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);
  background: ${(props) => {
    if (props.status === "متقدم") return "var(--color-green-50)";
    if (props.status === "متأخر") return "var(--color-red-50)";
    return "var(--color-grey-50)";
  }};
  border: 1px solid
    ${(props) => {
      if (props.status === "متقدم") return "var(--color-green-200)";
      if (props.status === "متأخر") return "var(--color-red-200)";
      return "var(--color-grey-200)";
    }};
`;

const StatusIndicator = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: ${(props) => {
    if (props.status === "متقدم") return "var(--color-green-500)";
    if (props.status === "متأخر") return "var(--color-red-500)";
    return "var(--color-grey-500)";
  }};
`;

const StatusText = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${(props) => {
    if (props.status === "متقدم") return "var(--color-green-700)";
    if (props.status === "متأخر") return "var(--color-red-700)";
    return "var(--color-grey-700)";
  }};
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background: var(--color-grey-0);
  color: var(--color-grey-600);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--color-grey-50);
    color: var(--color-brand-600);
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1400px) {
    grid-template-columns: 1fr 1.5fr 1fr;
    gap: 1.2rem;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Card = styled.div`
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-800);
  margin-bottom: 1rem;
  text-align: right;
`;

const ChartContainer = styled.div`
  height: 20rem;
  position: relative;

  @media (max-width: 768px) {
    height: 15rem;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1400px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ChartCard = styled.div`
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
`;

const ChartTitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-800);
  margin-bottom: 1rem;
  text-align: center;
`;

const ChartSubtitle = styled.div`
  font-size: 1rem;
  color: var(--color-grey-600);
  text-align: center;
  margin-bottom: 0.8rem;
`;

const CenterValue = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-brand-600);
  z-index: 10;
`;

const ChartLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
  justify-content: center;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  color: var(--color-grey-600);
`;

const LegendColor = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const TimelineContainer = styled.div`
  margin-bottom: 2rem;
`;

const TimelineBar = styled.div`
  height: 0.8rem;
  background: var(--color-grey-200);
  border-radius: 0.4rem;
  position: relative;
  margin: 1rem 0;
`;

const TimelineProgress = styled.div`
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--color-brand-500),
    var(--color-brand-600)
  );
  border-radius: 0.4rem;
  width: 28%;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    right: -0.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1rem;
    height: 1rem;
    background: var(--color-red-500);
    border-radius: 50%;
    border: 2px solid white;
  }
`;

const TimelineLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  color: var(--color-grey-600);
  margin-top: 0.5rem;
`;

const CompletionRate = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const CompletionValue = styled.div`
  font-size: 3.2rem;
  font-weight: 700;
  color: var(--color-brand-600);
  margin-bottom: 0.5rem;
`;

const CompletionLabel = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const SummaryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid var(--color-grey-200);
`;

const TableCell = styled.td`
  padding: 0.8rem 0;
  font-size: 1.3rem;
  color: var(--color-grey-700);

  &:first-child {
    font-weight: 600;
  }
`;

const ExecutiveSummary = styled.div`
  max-height: 20rem;
  overflow-y: auto;
  padding: 1rem;
  background: var(--color-grey-50);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-200);
`;

const SummaryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SummaryItem = styled.li`
  font-size: 1.3rem;
  color: var(--color-grey-700);
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-200);
  line-height: 1.5;

  &:last-child {
    border-bottom: none;
  }
`;

const RegionBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
`;

const RegionName = styled.div`
  font-size: 1.3rem;
  color: var(--color-grey-700);
  min-width: 12rem;
  text-align: right;

  @media (max-width: 768px) {
    min-width: auto;
    text-align: center;
    font-size: 1.1rem;
  }
`;

const RegionCount = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-800);
  min-width: 3rem;
  text-align: center;

  @media (max-width: 768px) {
    min-width: auto;
    font-size: 1.1rem;
  }
`;

const RegionBarChart = styled.div`
  flex: 1;
  height: 2rem;
  background: var(--color-grey-200);
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
`;

const RegionBarFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${(props) => props.colors.join(", ")});
  border-radius: 1rem;
  width: ${(props) => props.percentage}%;
  transition: width 0.3s ease;
`;

// New styles for second part
const SecondPartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1400px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const KPICard = styled.div`
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
`;

const KPITitle = styled.h4`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-800);
  margin-bottom: 1rem;
  text-align: right;
`;

const KPIGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;

const KPIItem = styled.div`
  text-align: center;
  padding: 0.8rem;
  background: var(--color-grey-50);
  border-radius: var(--border-radius-sm);
`;

const KPIValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-brand-600);
  margin-bottom: 0.3rem;
`;

const KPILabel = styled.div`
  font-size: 1rem;
  color: var(--color-grey-600);
`;

const StatusLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 0.3rem;
  }
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: var(--color-grey-700);
`;

const StatusColor = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: ${(props) => props.color};
`;

const BudgetBar = styled.div`
  height: 2rem;
  background: var(--color-grey-200);
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
  margin: 1rem 0;
`;

const BudgetSegment = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  left: ${(props) => props.left}%;
  width: ${(props) => props.width}%;
  background: ${(props) => props.color};
  border-radius: 1rem;
`;

const BudgetLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: var(--color-grey-600);
  margin-top: 0.5rem;
`;

const ProjectTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const TableHeader = styled.th`
  text-align: right;
  padding: 0.8rem;
  border-bottom: 1px solid var(--color-grey-200);
  font-weight: 600;
  color: var(--color-grey-700);
  background: var(--color-grey-50);
  font-size: 1.1rem;
`;

const TableData = styled.td`
  padding: 0.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  color: var(--color-grey-600);
  font-size: 1rem;
`;

const RiskTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const RiskRow = styled.tr`
  border-bottom: 1px solid var(--color-grey-200);
`;

const RiskCell = styled.td`
  padding: 0.8rem;
  font-size: 1rem;
  color: var(--color-grey-700);
  vertical-align: top;

  &:first-child {
    font-weight: 600;
    width: 3rem;
    text-align: center;
  }
`;

const ProjectStatusCard = styled.div`
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatusValue = styled.div`
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--color-brand-600);
  margin-bottom: 0.5rem;
`;

const StatusLabel = styled.div`
  font-size: 1.2rem;
  color: var(--color-grey-600);
`;

const ScatterContainer = styled.div`
  height: 20rem;
  position: relative;
  margin-top: 1rem;

  @media (max-width: 768px) {
    height: 15rem;
  }
`;

function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState("");

  // Region options for the dropdown
  const regionOptions = [
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
  ];

  // Comprehensive data for all regions
  const regionsComprehensiveData = {
    جازان: {
      projects: 26,
      budget: 2.8,
      completionRate: 85,
      activeProjects: 18,
      completedProjects: 8,
      remainingTime: 3,
      deadlineStatus: "متقدم",
      deadlinePercentage: 15,
      sectors: ["الأسماك", "البن العربي", "العسل", "الفاكهة"],
      stages: ["بدء المشروع", "الطرح", "تم التوقيع", "تم الترسية"],
      types: ["إنشاءات", "أعمال الخدمات", "تشغيل", "استشارات"],
    },
    "مناطق المملكة": {
      projects: 21,
      budget: 3.2,
      completionRate: 78,
      activeProjects: 15,
      completedProjects: 6,
      remainingTime: 5,
      deadlineStatus: "متأخر",
      deadlinePercentage: 8,
      sectors: ["القيمة المضافة", "المحاصيل البعليه", "المواشي", "الورد"],
      stages: [
        "بدء المشروع",
        "إنتهاء المشروع",
        "لجنة فحص العروض",
        "تم التوقيع",
        "تم الترسية",
      ],
      types: ["توريدات", "تشغيل", "الاشراف", "استشارات", "تقنية المعلومات"],
    },
    الرياض: {
      projects: 13,
      budget: 4.1,
      completionRate: 92,
      activeProjects: 8,
      completedProjects: 5,
      remainingTime: 2,
      deadlineStatus: "متقدم",
      deadlinePercentage: 20,
      sectors: ["القيمة المضافة", "المحاصيل البعليه", "المواشي"],
      stages: ["بدء المشروع", "إنتهاء المشروع", "تم التوقيع", "تم الترسية"],
      types: ["تشغيل", "الاشراف", "استشارات", "تقنية المعلومات"],
    },
    "مكة المكرمة": {
      projects: 9,
      budget: 2.5,
      completionRate: 88,
      activeProjects: 6,
      completedProjects: 3,
      remainingTime: 4,
      deadlineStatus: "متقدم",
      deadlinePercentage: 12,
      sectors: ["الفاكهة", "القيمة المضافة", "الورد"],
      stages: ["بدء المشروع", "إنتهاء المشروع", "تم التوقيع", "تم الترسية"],
      types: ["إنشاءات", "تشغيل", "استشارات"],
    },
    "المنطقة الشرقية": {
      projects: 5,
      budget: 1.8,
      completionRate: 75,
      activeProjects: 3,
      completedProjects: 2,
      remainingTime: 6,
      deadlineStatus: "متأخر",
      deadlinePercentage: 5,
      sectors: ["الأسماك", "القيمة المضافة"],
      stages: ["بدء المشروع", "تم التوقيع", "تم الترسية"],
      types: ["إنشاءات", "تشغيل", "استشارات"],
    },
    "المدينة المنورة": {
      projects: 6,
      budget: 1.9,
      completionRate: 82,
      activeProjects: 4,
      completedProjects: 2,
      remainingTime: 4,
      deadlineStatus: "متقدم",
      deadlinePercentage: 3,
      sectors: ["الفاكهة", "القيمة المضافة", "الورد"],
      stages: ["بدء المشروع", "إنتهاء المشروع", "تم التوقيع", "تم الترسية"],
      types: ["إنشاءات", "تشغيل", "استشارات"],
    },
    نجران: {
      projects: 5,
      budget: 1.2,
      completionRate: 70,
      activeProjects: 3,
      completedProjects: 2,
      remainingTime: 7,
      deadlineStatus: "متأخر",
      deadlinePercentage: 12,
      sectors: ["الفاكهة", "القيمة المضافة"],
      stages: ["بدء المشروع", "تم التوقيع", "تم الترسية"],
      types: ["تشغيل", "استشارات"],
    },
    حائل: {
      projects: 3,
      budget: 0.8,
      completionRate: 65,
      activeProjects: 2,
      completedProjects: 1,
      remainingTime: 8,
      deadlineStatus: "متأخر",
      deadlinePercentage: 18,
      sectors: ["القيمة المضافة", "المحاصيل البعليه"],
      stages: ["بدء المشروع", "تم التوقيع", "تم الترسية"],
      types: ["تشغيل", "استشارات"],
    },
    القصيم: {
      projects: 2,
      budget: 0.6,
      completionRate: 60,
      activeProjects: 1,
      completedProjects: 1,
      remainingTime: 9,
      deadlineStatus: "متأخر",
      deadlinePercentage: 25,
      sectors: ["القيمة المضافة", "المحاصيل البعليه"],
      stages: ["بدء المشروع", "تم التوقيع", "تم الترسية"],
      types: ["تشغيل", "استشارات"],
    },
    "الحدود الشمالية": {
      projects: 4,
      budget: 0.9,
      completionRate: 68,
      activeProjects: 2,
      completedProjects: 2,
      remainingTime: 7,
      deadlineStatus: "متأخر",
      deadlinePercentage: 15,
      sectors: ["القيمة المضافة", "المحاصيل البعليه"],
      stages: ["بدء المشروع", "تم التوقيع", "تم الترسية"],
      types: ["تشغيل", "استشارات"],
    },
    عسير: {
      projects: 7,
      budget: 1.5,
      completionRate: 80,
      activeProjects: 5,
      completedProjects: 2,
      remainingTime: 5,
      deadlineStatus: "متقدم",
      deadlinePercentage: 5,
      sectors: ["البن العربي", "العسل", "الفاكهة"],
      stages: ["بدء المشروع", "إنتهاء المشروع", "تم التوقيع", "تم الترسية"],
      types: ["أعمال الخدمات", "تشغيل", "استشارات"],
    },
    الباحة: {
      projects: 4,
      budget: 0.7,
      completionRate: 72,
      activeProjects: 2,
      completedProjects: 2,
      remainingTime: 6,
      deadlineStatus: "متأخر",
      deadlinePercentage: 8,
      sectors: ["العسل", "الفاكهة"],
      stages: ["بدء المشروع", "تم التوقيع", "تم الترسية"],
      types: ["تشغيل", "استشارات"],
    },
    تبوك: {
      projects: 5,
      budget: 1.1,
      completionRate: 77,
      activeProjects: 3,
      completedProjects: 2,
      remainingTime: 6,
      deadlineStatus: "متأخر",
      deadlinePercentage: 3,
      sectors: ["الفاكهة", "القيمة المضافة", "الورد"],
      stages: ["بدء المشروع", "تم التوقيع", "تم الترسية"],
      types: ["تشغيل", "استشارات"],
    },
    الجوف: {
      projects: 1,
      budget: 0.3,
      completionRate: 45,
      activeProjects: 1,
      completedProjects: 0,
      remainingTime: 12,
      deadlineStatus: "متأخر",
      deadlinePercentage: 35,
      sectors: ["القيمة المضافة"],
      stages: ["بدء المشروع", "تم التوقيع"],
      types: ["استشارات"],
    },
  };

  // Generate region info from comprehensive data
  const regionInfo = {};
  Object.keys(regionsComprehensiveData).forEach((regionName) => {
    const data = regionsComprehensiveData[regionName];
    regionInfo[regionName] = {
      title: `معلومات منطقة ${regionName}`,
      info: [
        `عدد المشاريع: ${data.projects} مشروع`,
        `إجمالي الميزانية: ${data.budget} مليار ريال`,
        `نسبة الإنجاز: ${data.completionRate}%`,
        `المشاريع النشطة: ${data.activeProjects} مشروع`,
        `المشاريع المكتملة: ${data.completedProjects} مشروع`,
        `الوقت المتبقي: ${data.remainingTime} ${
          data.remainingTime === 1 ? "شهر" : "أشهر"
        }`,
        `حالة المواعيد: ${data.deadlineStatus} ${data.deadlinePercentage}% عن الموعد المحدد`,
      ],
    };
  });

  // Generate regions data from comprehensive data
  const allRegionsData = Object.keys(regionsComprehensiveData).map(
    (regionName) => {
      const data = regionsComprehensiveData[regionName];
      return {
        name: regionName,
        count: data.projects,
        colors: ["#3B82F6", "#1D4ED8"],
      };
    }
  );

  // Filter regions data based on selected region
  const regionsData = selectedRegion
    ? allRegionsData.filter((region) => region.name === selectedRegion)
    : allRegionsData;

  // Generate sectors data from comprehensive data
  const generateSectorsData = (regionName = null) => {
    if (regionName && regionsComprehensiveData[regionName]) {
      const data = regionsComprehensiveData[regionName];
      const sectorData = data.sectors.map(
        () => Math.floor(Math.random() * 10) + 1
      );
      return {
        labels: data.sectors,
        datasets: [
          {
            data: sectorData,
            backgroundColor: [
              "#3B82F6",
              "#10B981",
              "#F59E0B",
              "#EF4444",
              "#8B5CF6",
              "#06B6D4",
              "#84CC16",
              "#EC4899",
            ].slice(0, data.sectors.length),
            borderWidth: 0,
          },
        ],
        total: sectorData.reduce((sum, value) => sum + value, 0),
      };
    }

    // All regions data
    const allSectors = [
      "الأسماك",
      "البن العربي",
      "العسل",
      "الفاكهة",
      "القيمة المضافة",
      "المحاصيل البعليه",
      "المواشي",
      "الورد",
    ];
    const allSectorData = [16, 9, 12, 12, 20, 18, 6, 18];
    return {
      labels: allSectors,
      datasets: [
        {
          data: allSectorData,
          backgroundColor: [
            "#3B82F6",
            "#10B981",
            "#F59E0B",
            "#EF4444",
            "#8B5CF6",
            "#06B6D4",
            "#84CC16",
            "#EC4899",
          ],
          borderWidth: 0,
        },
      ],
      total: allSectorData.reduce((sum, value) => sum + value, 0),
    };
  };

  const allSectorsData = generateSectorsData();

  // Filter sectors data based on selected region
  const sectorsData = selectedRegion
    ? generateSectorsData(selectedRegion)
    : allSectorsData;

  const allSectorsValueData = {
    labels: [
      "الأسماك",
      "البن العربي",
      "العسل",
      "الفاكهة",
      "القيمة المضافة",
      "المحاصيل البعليه",
      "المواشي",
      "الورد",
    ],
    datasets: [
      {
        data: [0.22, 0.38, 0.48, 0.72, 1.09, 1.28, 1.4, 1.53],
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4",
          "#84CC16",
          "#EC4899",
        ],
        borderWidth: 0,
      },
    ],
  };

  // Region-specific sectors value data
  const regionSectorsValueData = {
    جازان: {
      labels: ["الأسماك", "البن العربي", "العسل", "الفاكهة"],
      datasets: [
        {
          data: [0.15, 0.25, 0.3, 0.45],
          backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
          borderWidth: 0,
        },
      ],
    },
    "مناطق المملكة": {
      labels: ["القيمة المضافة", "المحاصيل البعليه", "المواشي", "الورد"],
      datasets: [
        {
          data: [0.65, 0.75, 0.85, 0.95],
          backgroundColor: ["#8B5CF6", "#06B6D4", "#84CC16", "#EC4899"],
          borderWidth: 0,
        },
      ],
    },
    الرياض: {
      labels: ["القيمة المضافة", "المحاصيل البعليه", "المواشي"],
      datasets: [
        {
          data: [0.8, 0.9, 1.0],
          backgroundColor: ["#8B5CF6", "#06B6D4", "#84CC16"],
          borderWidth: 0,
        },
      ],
    },
    "مكة المكرمة": {
      labels: ["الفاكهة", "القيمة المضافة", "الورد"],
      datasets: [
        {
          data: [0.55, 0.7, 0.85],
          backgroundColor: ["#EF4444", "#8B5CF6", "#EC4899"],
          borderWidth: 0,
        },
      ],
    },
    "المنطقة الشرقية": {
      labels: ["الأسماك", "القيمة المضافة"],
      datasets: [
        {
          data: [0.2, 0.6],
          backgroundColor: ["#3B82F6", "#8B5CF6"],
          borderWidth: 0,
        },
      ],
    },
    "المدينة المنورة": {
      labels: ["الفاكهة", "القيمة المضافة", "الورد"],
      datasets: [
        {
          data: [0.5, 0.65, 0.8],
          backgroundColor: ["#EF4444", "#8B5CF6", "#EC4899"],
          borderWidth: 0,
        },
      ],
    },
    نجران: {
      labels: ["الفاكهة", "القيمة المضافة"],
      datasets: [
        {
          data: [0.45, 0.6],
          backgroundColor: ["#EF4444", "#8B5CF6"],
          borderWidth: 0,
        },
      ],
    },
    حائل: {
      labels: ["القيمة المضافة", "المحاصيل البعليه"],
      datasets: [
        {
          data: [0.4, 0.55],
          backgroundColor: ["#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    القصيم: {
      labels: ["القيمة المضافة", "المحاصيل البعليه"],
      datasets: [
        {
          data: [0.35, 0.5],
          backgroundColor: ["#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    "الحدود الشمالية": {
      labels: ["القيمة المضافة", "المحاصيل البعليه"],
      datasets: [
        {
          data: [0.45, 0.6],
          backgroundColor: ["#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    عسير: {
      labels: ["البن العربي", "العسل", "الفاكهة"],
      datasets: [
        {
          data: [0.3, 0.4, 0.5],
          backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
          borderWidth: 0,
        },
      ],
    },
    الباحة: {
      labels: ["العسل", "الفاكهة"],
      datasets: [
        {
          data: [0.35, 0.45],
          backgroundColor: ["#F59E0B", "#EF4444"],
          borderWidth: 0,
        },
      ],
    },
    تبوك: {
      labels: ["الفاكهة", "القيمة المضافة", "الورد"],
      datasets: [
        {
          data: [0.4, 0.55, 0.7],
          backgroundColor: ["#EF4444", "#8B5CF6", "#EC4899"],
          borderWidth: 0,
        },
      ],
    },
    الجوف: {
      labels: ["القيمة المضافة"],
      datasets: [
        {
          data: [0.25],
          backgroundColor: ["#8B5CF6"],
          borderWidth: 0,
        },
      ],
    },
  };

  // Filter sectors value data based on selected region
  const sectorsValueData =
    selectedRegion && regionSectorsValueData[selectedRegion]
      ? regionSectorsValueData[selectedRegion]
      : allSectorsValueData;

  // Mock data for project stages
  const allStagesData = {
    labels: [
      "بدء المشروع",
      "الطرح",
      "إنتهاء المشروع",
      "لجنة فحص العروض",
      "تم التوقيع",
      "تم الترسية",
    ],
    datasets: [
      {
        data: [4, 1, 21, 9, 13, 63],
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4",
        ],
        borderWidth: 0,
      },
    ],
  };

  const allStagesValueData = {
    labels: [
      "بدء المشروع",
      "الطرح",
      "إنتهاء المشروع",
      "لجنة فحص العروض",
      "تم التوقيع",
      "تم الترسية",
    ],
    datasets: [
      {
        data: [0.9, 0.98, 1.12, 1.48, 1.49, 1.53],
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4",
        ],
        borderWidth: 0,
      },
    ],
  };

  // Region-specific stages data
  const regionStagesData = {
    جازان: {
      labels: ["بدء المشروع", "الطرح", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [2, 1, 5, 18],
          backgroundColor: ["#3B82F6", "#10B981", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    "مناطق المملكة": {
      labels: [
        "بدء المشروع",
        "إنتهاء المشروع",
        "لجنة فحص العروض",
        "تم التوقيع",
        "تم الترسية",
      ],
      datasets: [
        {
          data: [1, 4, 3, 4, 9],
          backgroundColor: [
            "#3B82F6",
            "#F59E0B",
            "#EF4444",
            "#8B5CF6",
            "#06B6D4",
          ],
          borderWidth: 0,
        },
      ],
    },
    الرياض: {
      labels: ["بدء المشروع", "إنتهاء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [1, 2, 2, 8],
          backgroundColor: ["#3B82F6", "#F59E0B", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    "مكة المكرمة": {
      labels: ["بدء المشروع", "إنتهاء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [1, 1, 2, 5],
          backgroundColor: ["#3B82F6", "#F59E0B", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    "المنطقة الشرقية": {
      labels: ["بدء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [1, 1, 3],
          backgroundColor: ["#3B82F6", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    "المدينة المنورة": {
      labels: ["بدء المشروع", "إنتهاء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [1, 1, 1, 3],
          backgroundColor: ["#3B82F6", "#F59E0B", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    نجران: {
      labels: ["بدء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [1, 1, 3],
          backgroundColor: ["#3B82F6", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    حائل: {
      labels: ["بدء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [1, 1, 1],
          backgroundColor: ["#3B82F6", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    القصيم: {
      labels: ["بدء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [1, 1, 0],
          backgroundColor: ["#3B82F6", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    "الحدود الشمالية": {
      labels: ["بدء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [1, 1, 2],
          backgroundColor: ["#3B82F6", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    عسير: {
      labels: ["بدء المشروع", "إنتهاء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [1, 1, 2, 3],
          backgroundColor: ["#3B82F6", "#F59E0B", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    الباحة: {
      labels: ["بدء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [1, 1, 2],
          backgroundColor: ["#3B82F6", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    تبوك: {
      labels: ["بدء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [1, 1, 3],
          backgroundColor: ["#3B82F6", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    الجوف: {
      labels: ["بدء المشروع", "تم التوقيع"],
      datasets: [
        {
          data: [1, 0],
          backgroundColor: ["#3B82F6", "#8B5CF6"],
          borderWidth: 0,
        },
      ],
    },
  };

  // Region-specific stages value data
  const regionStagesValueData = {
    جازان: {
      labels: ["بدء المشروع", "الطرح", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [0.8, 0.9, 1.2, 1.4],
          backgroundColor: ["#3B82F6", "#10B981", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    "مناطق المملكة": {
      labels: [
        "بدء المشروع",
        "إنتهاء المشروع",
        "لجنة فحص العروض",
        "تم التوقيع",
        "تم الترسية",
      ],
      datasets: [
        {
          data: [0.85, 1.0, 1.3, 1.35, 1.45],
          backgroundColor: [
            "#3B82F6",
            "#F59E0B",
            "#EF4444",
            "#8B5CF6",
            "#06B6D4",
          ],
          borderWidth: 0,
        },
      ],
    },
    الرياض: {
      labels: ["بدء المشروع", "إنتهاء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [0.9, 1.1, 1.4, 1.5],
          backgroundColor: ["#3B82F6", "#F59E0B", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    "مكة المكرمة": {
      labels: ["بدء المشروع", "إنتهاء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [0.85, 1.0, 1.3, 1.45],
          backgroundColor: ["#3B82F6", "#F59E0B", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    "المنطقة الشرقية": {
      labels: ["بدء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [0.8, 1.2, 1.4],
          backgroundColor: ["#3B82F6", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    "المدينة المنورة": {
      labels: ["بدء المشروع", "إنتهاء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [0.8, 1.0, 1.2, 1.4],
          backgroundColor: ["#3B82F6", "#F59E0B", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    نجران: {
      labels: ["بدء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [0.75, 1.1, 1.3],
          backgroundColor: ["#3B82F6", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    حائل: {
      labels: ["بدء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [0.7, 1.0, 1.2],
          backgroundColor: ["#3B82F6", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    القصيم: {
      labels: ["بدء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [0.65, 0.9, 1.1],
          backgroundColor: ["#3B82F6", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    "الحدود الشمالية": {
      labels: ["بدء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [0.7, 1.0, 1.2],
          backgroundColor: ["#3B82F6", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    عسير: {
      labels: ["بدء المشروع", "إنتهاء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [0.8, 1.0, 1.2, 1.4],
          backgroundColor: ["#3B82F6", "#F59E0B", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    الباحة: {
      labels: ["بدء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [0.75, 1.0, 1.2],
          backgroundColor: ["#3B82F6", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    تبوك: {
      labels: ["بدء المشروع", "تم التوقيع", "تم الترسية"],
      datasets: [
        {
          data: [0.8, 1.1, 1.3],
          backgroundColor: ["#3B82F6", "#8B5CF6", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    الجوف: {
      labels: ["بدء المشروع", "تم التوقيع"],
      datasets: [
        {
          data: [0.6, 0.8],
          backgroundColor: ["#3B82F6", "#8B5CF6"],
          borderWidth: 0,
        },
      ],
    },
  };

  // Filter stages data based on selected region
  const stagesData =
    selectedRegion && regionStagesData[selectedRegion]
      ? regionStagesData[selectedRegion]
      : allStagesData;

  const stagesValueData =
    selectedRegion && regionStagesValueData[selectedRegion]
      ? regionStagesValueData[selectedRegion]
      : allStagesValueData;

  // Mock data for project types
  const allTypesData = {
    labels: [
      "إنشاءات",
      "أعمال الخدمات",
      "توريدات",
      "تشغيل",
      "الاشراف",
      "استشارات",
      "تقنية المعلومات",
    ],
    datasets: [
      {
        data: [3, 2, 2, 17, 3, 19, 65],
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4",
          "#84CC16",
        ],
        borderWidth: 0,
      },
    ],
  };

  const allTypesValueData = {
    labels: [
      "إنشاءات",
      "أعمال الخدمات",
      "توريدات",
      "تشغيل",
      "الاشراف",
      "استشارات",
      "تقنية المعلومات",
    ],
    datasets: [
      {
        data: [0.07, 0.03, 0.03, 0.25, 0.05, 0.09, 0.8],
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4",
          "#84CC16",
        ],
        borderWidth: 0,
      },
    ],
  };

  // Region-specific types data
  const regionTypesData = {
    جازان: {
      labels: ["إنشاءات", "أعمال الخدمات", "تشغيل", "استشارات"],
      datasets: [
        {
          data: [2, 1, 8, 15],
          backgroundColor: ["#3B82F6", "#10B981", "#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    "مناطق المملكة": {
      labels: ["توريدات", "تشغيل", "الاشراف", "استشارات", "تقنية المعلومات"],
      datasets: [
        {
          data: [1, 4, 2, 8, 6],
          backgroundColor: [
            "#F59E0B",
            "#EF4444",
            "#8B5CF6",
            "#06B6D4",
            "#84CC16",
          ],
          borderWidth: 0,
        },
      ],
    },
    الرياض: {
      labels: ["تشغيل", "الاشراف", "استشارات", "تقنية المعلومات"],
      datasets: [
        {
          data: [2, 1, 3, 7],
          backgroundColor: ["#EF4444", "#8B5CF6", "#06B6D4", "#84CC16"],
          borderWidth: 0,
        },
      ],
    },
    "مكة المكرمة": {
      labels: ["إنشاءات", "تشغيل", "استشارات"],
      datasets: [
        {
          data: [1, 2, 6],
          backgroundColor: ["#3B82F6", "#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    "المنطقة الشرقية": {
      labels: ["إنشاءات", "تشغيل", "استشارات"],
      datasets: [
        {
          data: [1, 1, 3],
          backgroundColor: ["#3B82F6", "#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    "المدينة المنورة": {
      labels: ["إنشاءات", "تشغيل", "استشارات"],
      datasets: [
        {
          data: [1, 1, 4],
          backgroundColor: ["#3B82F6", "#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    نجران: {
      labels: ["تشغيل", "استشارات"],
      datasets: [
        {
          data: [1, 4],
          backgroundColor: ["#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    حائل: {
      labels: ["تشغيل", "استشارات"],
      datasets: [
        {
          data: [1, 2],
          backgroundColor: ["#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    القصيم: {
      labels: ["تشغيل", "استشارات"],
      datasets: [
        {
          data: [1, 1],
          backgroundColor: ["#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    "الحدود الشمالية": {
      labels: ["تشغيل", "استشارات"],
      datasets: [
        {
          data: [1, 3],
          backgroundColor: ["#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    عسير: {
      labels: ["أعمال الخدمات", "تشغيل", "استشارات"],
      datasets: [
        {
          data: [1, 2, 4],
          backgroundColor: ["#10B981", "#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    الباحة: {
      labels: ["تشغيل", "استشارات"],
      datasets: [
        {
          data: [1, 3],
          backgroundColor: ["#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    تبوك: {
      labels: ["تشغيل", "استشارات"],
      datasets: [
        {
          data: [1, 4],
          backgroundColor: ["#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    الجوف: {
      labels: ["استشارات"],
      datasets: [
        {
          data: [1],
          backgroundColor: ["#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
  };

  // Region-specific types value data
  const regionTypesValueData = {
    جازان: {
      labels: ["إنشاءات", "أعمال الخدمات", "تشغيل", "استشارات"],
      datasets: [
        {
          data: [0.05, 0.02, 0.2, 0.15],
          backgroundColor: ["#3B82F6", "#10B981", "#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    "مناطق المملكة": {
      labels: ["توريدات", "تشغيل", "الاشراف", "استشارات", "تقنية المعلومات"],
      datasets: [
        {
          data: [0.02, 0.15, 0.03, 0.08, 0.12],
          backgroundColor: [
            "#F59E0B",
            "#EF4444",
            "#8B5CF6",
            "#06B6D4",
            "#84CC16",
          ],
          borderWidth: 0,
        },
      ],
    },
    الرياض: {
      labels: ["تشغيل", "الاشراف", "استشارات", "تقنية المعلومات"],
      datasets: [
        {
          data: [0.1, 0.02, 0.06, 0.14],
          backgroundColor: ["#EF4444", "#8B5CF6", "#06B6D4", "#84CC16"],
          borderWidth: 0,
        },
      ],
    },
    "مكة المكرمة": {
      labels: ["إنشاءات", "تشغيل", "استشارات"],
      datasets: [
        {
          data: [0.03, 0.08, 0.12],
          backgroundColor: ["#3B82F6", "#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    "المنطقة الشرقية": {
      labels: ["إنشاءات", "تشغيل", "استشارات"],
      datasets: [
        {
          data: [0.02, 0.05, 0.08],
          backgroundColor: ["#3B82F6", "#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    "المدينة المنورة": {
      labels: ["إنشاءات", "تشغيل", "استشارات"],
      datasets: [
        {
          data: [0.02, 0.05, 0.1],
          backgroundColor: ["#3B82F6", "#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    نجران: {
      labels: ["تشغيل", "استشارات"],
      datasets: [
        {
          data: [0.05, 0.08],
          backgroundColor: ["#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    حائل: {
      labels: ["تشغيل", "استشارات"],
      datasets: [
        {
          data: [0.03, 0.05],
          backgroundColor: ["#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    القصيم: {
      labels: ["تشغيل", "استشارات"],
      datasets: [
        {
          data: [0.02, 0.03],
          backgroundColor: ["#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    "الحدود الشمالية": {
      labels: ["تشغيل", "استشارات"],
      datasets: [
        {
          data: [0.03, 0.06],
          backgroundColor: ["#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    عسير: {
      labels: ["أعمال الخدمات", "تشغيل", "استشارات"],
      datasets: [
        {
          data: [0.02, 0.06, 0.08],
          backgroundColor: ["#10B981", "#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    الباحة: {
      labels: ["تشغيل", "استشارات"],
      datasets: [
        {
          data: [0.03, 0.06],
          backgroundColor: ["#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    تبوك: {
      labels: ["تشغيل", "استشارات"],
      datasets: [
        {
          data: [0.03, 0.08],
          backgroundColor: ["#EF4444", "#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
    الجوف: {
      labels: ["استشارات"],
      datasets: [
        {
          data: [0.02],
          backgroundColor: ["#06B6D4"],
          borderWidth: 0,
        },
      ],
    },
  };

  // Filter types data based on selected region
  const typesData =
    selectedRegion && regionTypesData[selectedRegion]
      ? regionTypesData[selectedRegion]
      : allTypesData;

  const typesValueData =
    selectedRegion && regionTypesValueData[selectedRegion]
      ? regionTypesValueData[selectedRegion]
      : allTypesValueData;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const doughnutOptions = {
    ...chartOptions,
    cutout: "70%",
  };

  const maxCount = Math.max(...regionsData.map((r) => r.count));

  // Mock data for second part
  const qualityStats = {
    fieldVisits: 350,
    approvals: 0,
    workDeliveries: 0,
    technicalApprovals: 0,
    nonCompliance: 0,
  };

  const changeOrdersData = {
    labels: ["مغلق", "مفتوح"],
    datasets: [
      {
        data: [14, 0],
        backgroundColor: ["#6B7280", "#E5E7EB"],
        borderWidth: 0,
      },
    ],
  };

  const budgetData = {
    total: "35.55M",
    segments: [
      { label: "مبالغ تحت إجراءات الترسية", value: 4.92, color: "#F59E0B" },
      { label: "مشاريع تمت ترسيتها", value: 3.34, color: "#3B82F6" },
      { label: "المبلغ المتبقي", value: 27.29, color: "#1E40AF" },
    ],
  };

  const completionTimeline = {
    labels: [
      "21-H1",
      "21-H2",
      "22-H1",
      "22-H2",
      "23-H1",
      "23-H2",
      "24-H1",
      "24-H2",
      "25-H1",
      "25-H2",
      "26-H1",
      "26-H2",
    ],
    actual: [5, 8, 12, 15, 18, 22, 25, 28, 30, 32, 35, 38],
    planned: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65],
  };

  const topProjects = [
    {
      achievement: "99%",
      name: "إنشاء محطة تربية ملكات النحل وإنتاج الطرود بمنطقة تبوك",
    },
    {
      achievement: "85%",
      name: "تنفيذ وتجهيز مزارع بديلة نموذجية في عدد من المواقع بمنطقة جازان",
    },
    {
      achievement: "78%",
      name: "إنشاء محطات تربية ملكات النحل وإنتاج الطرود بمنطقة جازان",
    },
    {
      achievement: "75%",
      name: "إنشاء محطات تربية ملكات النحل وإنتاج الطرود بمنطقة المدينة المنورة",
    },
    {
      achievement: "75%",
      name: "إنشاء محطة تربية ملكات النحل وإنتاج الطرود بمنطقة حائل",
    },
  ];

  const risks = [
    {
      id: 1,
      risk: "تأخير في ترسية مشاريع الاشراف",
      solution:
        "إعطاء أولوية لمشاريع البرنامج ورفع قائمة بالمشاريع المهمة والعاجلة",
    },
    {
      id: 2,
      risk: "تأخير في المشاريع مع الالتزام المالي",
      solution: "الدعم والتوجيه لتسريع العمل",
    },
    {
      id: 3,
      risk: "تأخير في صرف المستخلصات لأسباب غير واضحة",
      solution: "الدعم من الإدارة المالية بالوزارة",
    },
  ];

  const riskAssessment = [
    { x: 4, y: 4, label: "1" },
    { x: 3, y: 4, label: "3" },
    { x: 3, y: 3, label: "3" },
    { x: 4, y: 3, label: "2" },
    { x: 4, y: 2, label: "1" },
  ];

  const completionData = {
    labels: completionTimeline.labels,
    datasets: [
      {
        label: "المخطط التراكمي",
        data: completionTimeline.planned,
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        type: "line",
      },
      {
        label: "الفعلي التراكمي",
        data: completionTimeline.actual,
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        tension: 0.4,
        type: "line",
      },
    ],
  };

  const riskScatterData = {
    datasets: [
      {
        label: "المخاطر",
        data: riskAssessment.map((risk) => ({
          x: risk.x,
          y: risk.y,
          label: risk.label,
        })),
        backgroundColor: [
          "#EF4444",
          "#F59E0B",
          "#F59E0B",
          "#F59E0B",
          "#EF4444",
        ],
        borderColor: ["#EF4444", "#F59E0B", "#F59E0B", "#F59E0B", "#EF4444"],
        pointRadius: 15,
        pointHoverRadius: 20,
      },
    ],
  };

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "الاحتمالية",
        },
        min: 1,
        max: 5,
      },
      y: {
        title: {
          display: true,
          text: "التأثير",
        },
        min: 1,
        max: 5,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <Heading as="h1">لوحة بيانات المشاريع</Heading>
          <span style={{ fontSize: "1.6rem", color: "var(--color-grey-600)" }}>
            سبتمبر 2025
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
          <IconButton>
            <HiOutlineDocumentArrowDown style={{ marginLeft: "1rem" }} />
          </IconButton>
        </HeaderRight>
      </Header>

      {/* Region Information Display */}
      {selectedRegion && regionInfo[selectedRegion] && (
        <RegionInfo>
          <RegionInfoTitle>{regionInfo[selectedRegion].title}</RegionInfoTitle>
          <RegionInfoList>
            {regionInfo[selectedRegion].info.map((item, index) => {
              const [label, value] = item.split(":");
              const isDeadlineStatus = label.includes("حالة المواعيد");
              const status = isDeadlineStatus
                ? value.includes("متقدم")
                  ? "متقدم"
                  : "متأخر"
                : null;

              return (
                <RegionInfoItem key={index}>
                  <strong>{label}:</strong> {value}
                  {isDeadlineStatus && (
                    <DeadlineStatus status={status}>
                      <StatusIndicator status={status} />
                      <StatusText status={status}>
                        {status === "متقدم"
                          ? "في الموعد المحدد"
                          : "يحتاج متابعة"}
                      </StatusText>
                    </DeadlineStatus>
                  )}
                </RegionInfoItem>
              );
            })}
          </RegionInfoList>
        </RegionInfo>
      )}

      <DashboardGrid>
        {/* التوزيع الجغرافي للمشاريع */}
        <Card>
          <CardTitle>التوزيع الجغرافي للمشاريع</CardTitle>
          {regionsData.map((region, index) => (
            <RegionBar key={index}>
              <RegionName>{region.name}</RegionName>
              <RegionCount>{region.count}</RegionCount>
              <RegionBarChart>
                <RegionBarFill
                  colors={region.colors}
                  percentage={(region.count / maxCount) * 100}
                />
              </RegionBarChart>
            </RegionBar>
          ))}
        </Card>

        {/* Charts Grid */}
        <div>
          <ChartsGrid>
            {/* توزيع المشاريع بالقطاعات */}
            <ChartCard>
              <ChartTitle>توزيع المشاريع بالقطاعات</ChartTitle>
              <ChartSubtitle>عدد المشاريع</ChartSubtitle>
              <ChartContainer>
                <CenterValue>{sectorsData.total}</CenterValue>
                <Doughnut data={sectorsData} options={doughnutOptions} />
              </ChartContainer>
              <ChartLegend>
                {sectorsData.labels.map((label, index) => (
                  <LegendItem key={index}>
                    <LegendColor
                      color={sectorsData.datasets[0].backgroundColor[index]}
                    />
                    <span>{label}</span>
                  </LegendItem>
                ))}
              </ChartLegend>
            </ChartCard>

            {/* توزيع مراحل المشاريع */}
            <ChartCard>
              <ChartTitle>توزيع مراحل المشاريع</ChartTitle>
              <ChartSubtitle>عدد المشاريع</ChartSubtitle>
              <ChartContainer>
                <CenterValue>
                  {stagesData.datasets[0].data.reduce(
                    (sum, value) => sum + value,
                    0
                  )}
                </CenterValue>
                <Doughnut data={stagesData} options={doughnutOptions} />
              </ChartContainer>
              <ChartLegend>
                {stagesData.labels.map((label, index) => (
                  <LegendItem key={index}>
                    <LegendColor
                      color={stagesData.datasets[0].backgroundColor[index]}
                    />
                    <span>{label}</span>
                  </LegendItem>
                ))}
              </ChartLegend>
            </ChartCard>

            {/* توزيع أنواع المشاريع */}
            <ChartCard>
              <ChartTitle>توزيع أنواع المشاريع</ChartTitle>
              <ChartSubtitle>عدد المشاريع</ChartSubtitle>
              <ChartContainer>
                <CenterValue>
                  {typesData.datasets[0].data.reduce(
                    (sum, value) => sum + value,
                    0
                  )}
                </CenterValue>
                <Doughnut data={typesData} options={doughnutOptions} />
              </ChartContainer>
              <ChartLegend>
                {typesData.labels.map((label, index) => (
                  <LegendItem key={index}>
                    <LegendColor
                      color={typesData.datasets[0].backgroundColor[index]}
                    />
                    <span>{label}</span>
                  </LegendItem>
                ))}
              </ChartLegend>
            </ChartCard>
          </ChartsGrid>

          <ChartsGrid>
            {/* توزيع المشاريع بالقطاعات - القيم */}
            <ChartCard>
              <ChartTitle>توزيع المشاريع بالقطاعات</ChartTitle>
              <ChartSubtitle>القيم المالية</ChartSubtitle>
              <ChartContainer>
                <CenterValue>
                  {sectorsValueData.datasets[0].data
                    .reduce((sum, value) => sum + value, 0)
                    .toFixed(1)}
                  B
                </CenterValue>
                <Doughnut data={sectorsValueData} options={doughnutOptions} />
              </ChartContainer>
              <ChartLegend>
                {sectorsValueData.labels.map((label, index) => (
                  <LegendItem key={index}>
                    <LegendColor
                      color={
                        sectorsValueData.datasets[0].backgroundColor[index]
                      }
                    />
                    <span>{label}</span>
                  </LegendItem>
                ))}
              </ChartLegend>
            </ChartCard>

            {/* توزيع مراحل المشاريع - القيم */}
            <ChartCard>
              <ChartTitle>توزيع مراحل المشاريع</ChartTitle>
              <ChartSubtitle>القيم المالية</ChartSubtitle>
              <ChartContainer>
                <CenterValue>
                  {stagesValueData.datasets[0].data
                    .reduce((sum, value) => sum + value, 0)
                    .toFixed(1)}
                  B
                </CenterValue>
                <Doughnut data={stagesValueData} options={doughnutOptions} />
              </ChartContainer>
              <ChartLegend>
                {stagesValueData.labels.map((label, index) => (
                  <LegendItem key={index}>
                    <LegendColor
                      color={stagesValueData.datasets[0].backgroundColor[index]}
                    />
                    <span>{label}</span>
                  </LegendItem>
                ))}
              </ChartLegend>
            </ChartCard>

            {/* توزيع أنواع المشاريع - القيم */}
            <ChartCard>
              <ChartTitle>توزيع أنواع المشاريع</ChartTitle>
              <ChartSubtitle>القيم المالية</ChartSubtitle>
              <ChartContainer>
                <CenterValue>
                  {typesValueData.datasets[0].data
                    .reduce((sum, value) => sum + value, 0)
                    .toFixed(1)}
                  B
                </CenterValue>
                <Doughnut data={typesValueData} options={doughnutOptions} />
              </ChartContainer>
              <ChartLegend>
                {typesValueData.labels.map((label, index) => (
                  <LegendItem key={index}>
                    <LegendColor
                      color={typesValueData.datasets[0].backgroundColor[index]}
                    />
                    <span>{label}</span>
                  </LegendItem>
                ))}
              </ChartLegend>
            </ChartCard>
          </ChartsGrid>
        </div>

        {/* Right Column */}
        <div>
          {/* الخط الزمني للبرنامج */}
          <Card>
            <CardTitle>الخط الزمني للبرنامج</CardTitle>
            <TimelineContainer>
              <TimelineBar>
                <TimelineProgress />
              </TimelineBar>
              <TimelineLabels>
                <span>البداية : 2021</span>
                <span>النهاية : 2026</span>
              </TimelineLabels>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "1rem",
                  fontSize: "1.2rem",
                  color: "var(--color-red-600)",
                }}
              >
                9/22/2025
              </div>
            </TimelineContainer>
          </Card>

          {/* نسبة الانجاز الفعلية للبرنامج */}
          <Card>
            <CardTitle>نسبة الانجاز الفعلية للبرنامج</CardTitle>
            <CompletionRate>
              <CompletionValue>28%</CompletionValue>
              <CompletionLabel>نسبة الانجاز الفعلية</CompletionLabel>
            </CompletionRate>
            <SummaryTable>
              <tbody>
                <TableRow>
                  <TableCell>نسبة الانجاز المخطط لها:</TableCell>
                  <TableCell>32%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>نسبة الحياد:</TableCell>
                  <TableCell>-4%</TableCell>
                </TableRow>
              </tbody>
            </SummaryTable>
          </Card>

          {/* ملخص تنفيذي */}
          <Card>
            <CardTitle>ملخص تنفيذي</CardTitle>
            <ExecutiveSummary>
              <SummaryList>
                <SummaryItem>
                  تم تسليم 6 أراضي مخصصين لقطاعات الأسماك والورد والماشية
                </SummaryItem>
                <SummaryItem>
                  تم الإنتهاء من الدراسات الفنية ودراسة الجدوى لعدد 4 مشاريع
                  خدمات تسويقية
                </SummaryItem>
                <SummaryItem>
                  مراجعة وتدقيق أكثر من 620 طلب إعتماد فني
                </SummaryItem>
                <SummaryItem>
                  إنجاز 15% من المشاريع المخططة للربع الأول
                </SummaryItem>
                <SummaryItem>
                  توقيع 8 عقود جديدة بقيمة إجمالية 2.3 مليار ريال
                </SummaryItem>
                <SummaryItem>
                  بدء تنفيذ 12 مشروع في مناطق مختلفة من المملكة
                </SummaryItem>
              </SummaryList>
            </ExecutiveSummary>
          </Card>
        </div>
      </DashboardGrid>

      {/* Second Part - Quality Statistics and Project Management */}
      <SecondPartGrid>
        {/* احصائيات الجودة */}
        <KPICard>
          <KPITitle>احصائيات الجودة</KPITitle>
          <KPIGrid>
            <KPIItem>
              <KPIValue>{qualityStats.fieldVisits}</KPIValue>
              <KPILabel>اجمالي زيارات ميدانية</KPILabel>
            </KPIItem>
            <KPIItem>
              <KPIValue>{qualityStats.approvals}</KPIValue>
              <KPILabel>اجمالي الاعتمادات و الاستلامات</KPILabel>
            </KPIItem>
            <KPIItem>
              <KPIValue>{qualityStats.workDeliveries}</KPIValue>
              <KPILabel>استلامات اعمال</KPILabel>
            </KPIItem>
            <KPIItem>
              <KPIValue>{qualityStats.technicalApprovals}</KPIValue>
              <KPILabel>اعتمادات فنية</KPILabel>
            </KPIItem>
            <KPIItem>
              <KPIValue>{qualityStats.nonCompliance}</KPIValue>
              <KPILabel>عدم مطابقة</KPILabel>
            </KPIItem>
          </KPIGrid>

          <StatusLegend>
            <StatusItem>
              <StatusColor color="#EF4444" />
              <span>مرفوض</span>
            </StatusItem>
            <StatusItem>
              <StatusColor color="#F59E0B" />
              <span>متأخر</span>
            </StatusItem>
            <StatusItem>
              <StatusColor color="#10B981" />
              <span>معتمد مع ملاحظات</span>
            </StatusItem>
            <StatusItem>
              <StatusColor color="#F59E0B" />
              <span>يعاد التسليم</span>
            </StatusItem>
            <StatusItem>
              <StatusColor color="#06B6D4" />
              <span>تحت الدراسة</span>
            </StatusItem>
            <StatusItem>
              <StatusColor color="#059669" />
              <span>معتمد بدون ملاحظات</span>
            </StatusItem>
          </StatusLegend>

          <div style={{ marginTop: "1rem" }}>
            <div
              style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                marginBottom: "0.8rem",
                textAlign: "center",
              }}
            >
              اوامر التغير
            </div>
            <ChartContainer style={{ height: "12rem" }}>
              <CenterValue>14</CenterValue>
              <Doughnut data={changeOrdersData} options={doughnutOptions} />
            </ChartContainer>
            <div
              style={{
                textAlign: "center",
                fontSize: "1rem",
                color: "var(--color-grey-600)",
                marginTop: "0.5rem",
              }}
            >
              14 (100%)
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginTop: "0.5rem",
              }}
            >
              <StatusItem>
                <StatusColor color="#6B7280" />
                <span>مغلق</span>
              </StatusItem>
              <StatusItem>
                <StatusColor color="#E5E7EB" />
                <span>مفتوح</span>
              </StatusItem>
            </div>
          </div>
        </KPICard>

        {/* توزيع ميزانية البرنامج */}
        <KPICard>
          <KPITitle>توزيع ميزانية البرنامج</KPITitle>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "var(--color-brand-600)",
              }}
            >
              {budgetData.total}
            </div>
          </div>

          <BudgetBar>
            <BudgetSegment left={0} width={13.8} color="#F59E0B" />
            <BudgetSegment left={13.8} width={9.4} color="#3B82F6" />
            <BudgetSegment left={23.2} width={76.8} color="#1E40AF" />
          </BudgetBar>

          <BudgetLabels>
            <span>0M</span>
            <span>4.92M</span>
            <span>8.26M</span>
            <span>35.55M</span>
          </BudgetLabels>

          <div style={{ marginTop: "1rem" }}>
            <div
              style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                marginBottom: "0.8rem",
              }}
            >
              اجمالي الميزانية: 1.53 bn
            </div>
            <div
              style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                marginBottom: "0.8rem",
              }}
            >
              اجمالي التعاقدات: 922.63 M
            </div>
          </div>

          <StatusLegend>
            <StatusItem>
              <StatusColor color="#F59E0B" />
              <span>مبالغ تحت إجراءات الترسية</span>
            </StatusItem>
            <StatusItem>
              <StatusColor color="#3B82F6" />
              <span>مشاريع تمت ترسيتها</span>
            </StatusItem>
            <StatusItem>
              <StatusColor color="#F59E0B" />
              <span>الفرق بين التقديري و الفعلي</span>
            </StatusItem>
            <StatusItem>
              <StatusColor color="#1E40AF" />
              <span>المبلغ المتبقي</span>
            </StatusItem>
            <StatusItem>
              <StatusColor color="#3B82F6" />
              <span>المبلغ المنصرف</span>
            </StatusItem>
          </StatusLegend>
        </KPICard>

        {/* الخط الزمني لنسب إنجاز البرنامج */}
        <KPICard>
          <KPITitle>الخط الزمني لنسب إنجاز البرنامج</KPITitle>
          <ChartContainer>
            <Bar data={completionData} options={chartOptions} />
          </ChartContainer>
          <StatusLegend>
            <StatusItem>
              <StatusColor color="#3B82F6" />
              <span>المخطط التراكمي</span>
            </StatusItem>
            <StatusItem>
              <StatusColor color="#F59E0B" />
              <span>الفعلي التراكمي</span>
            </StatusItem>
            <StatusItem>
              <StatusColor color="#3B82F6" />
              <span>نسبة الانجاز المخطط</span>
            </StatusItem>
            <StatusItem>
              <StatusColor color="#F59E0B" />
              <span>نسبة الانجاز الفعلي</span>
            </StatusItem>
          </StatusLegend>
        </KPICard>
      </SecondPartGrid>

      <SecondPartGrid>
        {/* أعلى مشاريع إنشائية إنجازا */}
        <KPICard>
          <KPITitle>أعلى مشاريع إنشائية إنجازا</KPITitle>
          <ProjectTable>
            <thead>
              <tr>
                <TableHeader>الانجاز</TableHeader>
                <TableHeader>مسمى المشروع</TableHeader>
              </tr>
            </thead>
            <tbody>
              {topProjects.map((project, index) => (
                <tr key={index}>
                  <TableData>{project.achievement}</TableData>
                  <TableData>{project.name}</TableData>
                </tr>
              ))}
            </tbody>
          </ProjectTable>
        </KPICard>

        {/* ادارة المخاطر */}
        <KPICard>
          <KPITitle>ادارة المخاطر</KPITitle>
          <RiskTable>
            <thead>
              <tr>
                <TableHeader>الرقم</TableHeader>
                <TableHeader>المخاطر</TableHeader>
                <TableHeader>مقترح الحل</TableHeader>
              </tr>
            </thead>
            <tbody>
              {risks.map((risk) => (
                <RiskRow key={risk.id}>
                  <RiskCell>{risk.id}</RiskCell>
                  <RiskCell>{risk.risk}</RiskCell>
                  <RiskCell>{risk.solution}</RiskCell>
                </RiskRow>
              ))}
            </tbody>
          </RiskTable>
        </KPICard>

        {/* احصائيات وضع المشاريع */}
        <KPICard>
          <KPITitle>احصائيات وضع المشاريع</KPITitle>
          <ProjectStatusCard>
            <StatusValue>5</StatusValue>
            <StatusLabel>منتظم</StatusLabel>
          </ProjectStatusCard>

          <ScatterContainer>
            <Scatter data={riskScatterData} options={scatterOptions} />
          </ScatterContainer>
        </KPICard>
      </SecondPartGrid>
    </Container>
  );
}

export default Dashboard;
