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
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProjectTitle = styled.h1`
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--color-grey-800);
  margin: 0;
`;

const ProjectDate = styled.div`
  font-size: 1.6rem;
  color: var(--color-grey-600);
  background: var(--color-grey-100);
  padding: 0.8rem 1.6rem;
  border-radius: var(--border-radius-sm);
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2.4rem;
  margin-bottom: 3.2rem;
`;

const Card = styled.div`
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 2.4rem;
`;

const CardTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-grey-800);
  margin-bottom: 1.6rem;
`;

const ChartContainer = styled.div`
  position: relative;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProjectDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
  margin-bottom: 3.2rem;
`;

const DetailsCard = styled.div`
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 2.4rem;
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
  color: var(--color-grey-600);
  font-weight: 500;
`;

const DetailValue = styled.span`
  font-size: 1.4rem;
  color: var(--color-grey-800);
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
  height: 1.2rem;
  background: var(--color-grey-200);
  border-radius: 0.6rem;
  overflow: hidden;
  margin: 1.6rem 0;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--color-brand-500),
    var(--color-brand-600)
  );
  width: ${(props) => props.percentage}%;
  transition: width 0.3s ease;
`;

const ScopeSection = styled.div`
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 2.4rem;
`;

const ScopeTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-grey-800);
  margin-bottom: 1.6rem;
`;

const ScopeDescription = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-700);
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
  color: var(--color-grey-700);
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

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
  background: var(--color-brand-500);
  color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--color-brand-600);
    transform: translateY(-2px);
  }

  &:disabled {
    background: var(--color-grey-300);
    cursor: not-allowed;
    transform: none;
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
  color: var(--color-grey-700);
  background: var(--color-grey-50);
`;

const TableCell = styled.td`
  padding: 1.2rem;
  border-bottom: 1px solid var(--color-grey-100);
  color: var(--color-grey-600);
  font-size: 1.3rem;
`;

const AchievementList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.6rem 0 0 0;
`;

const AchievementItem = styled.li`
  font-size: 1.3rem;
  color: var(--color-grey-700);
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);
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
`;

const EmptySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20rem;
  background: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  color: var(--color-grey-500);
  font-size: 1.6rem;
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
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const doughnutOptions = {
    ...chartOptions,
    cutout: "70%",
    plugins: {
      ...chartOptions.plugins,
      legend: {
        ...chartOptions.plugins.legend,
        position: "bottom",
      },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
    },
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
        backgroundColor: ["#6B7280", "#F59E0B"],
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
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
      },
      {
        label: "الفعلي",
        data: currentProject.performance.actual,
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const stagesData = {
    labels: currentProject.stages.labels,
    datasets: [
      {
        label: "المخطط",
        data: currentProject.stages.planned,
        backgroundColor: "#F59E0B",
      },
      {
        label: "الفعلي",
        data: currentProject.stages.actual,
        backgroundColor: "#3B82F6",
      },
    ],
  };

  const qualityDeliverablesData = {
    labels: ["معتمد مع ملاحظات"],
    datasets: [
      {
        data: [currentProject.quality.deliverables.approved],
        backgroundColor: ["#F59E0B"],
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
          "#10B981",
          "#34D399",
          "#F59E0B",
          "#8B5CF6",
          "#3B82F6",
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
        backgroundColor: ["#F59E0B", "#EF4444"],
        borderColor: ["#F59E0B", "#EF4444"],
        pointRadius: 15,
        pointHoverRadius: 20,
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
                    color: "var(--color-grey-800)",
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
            </div>
            <div>
              <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                <div
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "600",
                    color: "var(--color-grey-800)",
                  }}
                >
                  اعتمادات فنية
                </div>
                <div
                  style={{
                    fontSize: "2.4rem",
                    fontWeight: "700",
                    color: "var(--color-brand-600)",
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
                  backgroundColor: "#EF4444",
                  borderRadius: "50%",
                }}
              ></div>
              <span>مرفوض</span>
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
                  backgroundColor: "#F59E0B",
                  borderRadius: "50%",
                }}
              ></div>
              <span>متأخر</span>
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
                  backgroundColor: "#8B5CF6",
                  borderRadius: "50%",
                }}
              ></div>
              <span>معتمد مع ملاحظات</span>
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
                  backgroundColor: "#34D399",
                  borderRadius: "50%",
                }}
              ></div>
              <span>يعاد التسليم</span>
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
                  backgroundColor: "#10B981",
                  borderRadius: "50%",
                }}
              ></div>
              <span>تحت الدراسة</span>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  backgroundColor: "#3B82F6",
                  borderRadius: "50%",
                }}
              ></div>
              <span>معتمد بدون ملاحظات</span>
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
                color: "var(--color-grey-800)",
              }}
            >
              {currentProject.financial.total}
            </div>
            <div style={{ fontSize: "1.2rem", color: "var(--color-grey-600)" }}>
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
                color: "var(--color-brand-600)",
              }}
            >
              {
                currentProject.performance.actual[
                  currentProject.performance.actual.length - 1
                ]
              }
              %
            </div>
            <div style={{ fontSize: "1.4rem", color: "var(--color-grey-600)" }}>
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
            <DetailValue style={{ color: "var(--color-red-600)" }}>
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
