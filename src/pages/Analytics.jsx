import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import {
  HiOutlineChartBarSquare,
  HiOutlineArrowTrendingUp,
  HiOutlineUsers,
  HiOutlineClock,
} from "react-icons/hi2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 2.4rem;
  margin-bottom: 3.2rem;
`;

const StatCard = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 2.4rem;
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const StatIcon = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--color-brand-500),
    var(--color-brand-600)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.4rem;
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const StatNumber = styled.div`
  font-size: 2.8rem;
  font-weight: 600;
  color: var(--color-grey-800);
`;

const StatLabel = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const StatChange = styled.div`
  font-size: 1.2rem;
  color: ${(props) =>
    props.positive ? "var(--color-green-700)" : "var(--color-red-700)"};
  font-weight: 500;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2.4rem;
  margin-bottom: 3.2rem;
`;

const ChartCard = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 2.4rem;
`;

const ChartTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-grey-800);
  margin-bottom: 1.6rem;
`;

const ChartContainer = styled.div`
  height: 30rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CenterValue = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--color-brand-800);
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

const TableCard = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 2.4rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: right;
  padding: 1.2rem 0;
  border-bottom: 1px solid var(--color-grey-200);
  font-weight: 600;
  color: var(--color-grey-700);
`;

const TableCell = styled.td`
  padding: 1.2rem 0;
  border-bottom: 1px solid var(--color-grey-100);
  color: var(--color-grey-600);
`;

function Analytics() {
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
      y: {
        beginAtZero: true,
        grid: {
          color: "#374151",
        },
        ticks: {
          color: "#F9FAFB",
        },
      },
      x: {
        grid: {
          color: "#374151",
        },
        ticks: {
          color: "#F9FAFB",
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
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

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
      y: {
        beginAtZero: true,
        grid: {
          color: "#374151",
        },
        ticks: {
          color: "#F9FAFB",
        },
      },
      x: {
        grid: {
          color: "#374151",
        },
        ticks: {
          color: "#F9FAFB",
        },
      },
    },
  };

  // Business data
  const monthlyPerformanceData = {
    labels: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    datasets: [
      {
        label: "المشاريع المكتملة",
        data: [45, 52, 48, 61, 55, 67, 72, 68, 75, 82, 78, 85],
        backgroundColor: "#3B82F6",
        borderColor: "#1D4ED8",
        borderWidth: 2,
      },
    ],
  };

  const projectTypesData = {
    labels: [
      "تطوير ويب",
      "تطبيقات موبايل",
      "استشارات تقنية",
      "أنظمة إدارية",
      "تطوير برمجيات",
    ],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
        ],
        borderWidth: 0,
      },
    ],
    total: 100,
  };

  const revenueGrowthData = {
    labels: ["Q1 2023", "Q2 2023", "Q3 2023", "Q4 2023", "Q1 2024", "Q2 2024"],
    datasets: [
      {
        label: "الإيرادات (مليون ريال)",
        data: [2.5, 3.2, 2.8, 3.8, 4.2, 4.9],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const clientSatisfactionData = {
    labels: ["ممتاز", "جيد جداً", "جيد", "مقبول", "ضعيف"],
    datasets: [
      {
        data: [45, 30, 15, 8, 2],
        backgroundColor: [
          "#10B981",
          "#3B82F6",
          "#F59E0B",
          "#EF4444",
          "#6B7280",
        ],
        borderWidth: 0,
      },
    ],
    total: 100,
  };

  return (
    <Container>
      <Row type="horizontal">
        <Heading as="h1">التحليلات</Heading>
        <Button>تصدير التقرير</Button>
      </Row>

      <StatsGrid>
        <StatCard>
          <StatIcon>
            <HiOutlineChartBarSquare />
          </StatIcon>
          <StatContent>
            <StatNumber>1,247</StatNumber>
            <StatLabel>إجمالي المشاريع</StatLabel>
            <StatChange positive>+12.5% من الشهر الماضي</StatChange>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon>
            <HiOutlineArrowTrendingUp />
          </StatIcon>
          <StatContent>
            <StatNumber>89.2%</StatNumber>
            <StatLabel>معدل النجاح</StatLabel>
            <StatChange positive>+3.1% من الشهر الماضي</StatChange>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon>
            <HiOutlineUsers />
          </StatIcon>
          <StatContent>
            <StatNumber>156</StatNumber>
            <StatLabel>العملاء النشطون</StatLabel>
            <StatChange positive>+8.7% من الشهر الماضي</StatChange>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon>
            <HiOutlineClock />
          </StatIcon>
          <StatContent>
            <StatNumber>24.5</StatNumber>
            <StatLabel>متوسط وقت التنفيذ (أيام)</StatLabel>
            <StatChange>-2.3% من الشهر الماضي</StatChange>
          </StatContent>
        </StatCard>
      </StatsGrid>

      <ChartsGrid>
        <ChartCard>
          <ChartTitle>أداء المشاريع الشهرية</ChartTitle>
          <ChartContainer>
            <Bar data={monthlyPerformanceData} options={chartOptions} />
          </ChartContainer>
        </ChartCard>

        <ChartCard>
          <ChartTitle>توزيع أنواع المشاريع</ChartTitle>
          <ChartContainer>
            <CenterValue>{projectTypesData.total}%</CenterValue>
            <Doughnut data={projectTypesData} options={doughnutOptions} />
          </ChartContainer>
          <ChartLegend>
            {projectTypesData.labels.map((label, index) => (
              <LegendItem key={index}>
                <LegendColor
                  color={projectTypesData.datasets[0].backgroundColor[index]}
                />
                <span>{label}</span>
              </LegendItem>
            ))}
          </ChartLegend>
        </ChartCard>
      </ChartsGrid>

      <TableCard>
        <ChartTitle>أحدث المشاريع</ChartTitle>
        <Table>
          <thead>
            <tr>
              <TableHeader>اسم المشروع</TableHeader>
              <TableHeader>العميل</TableHeader>
              <TableHeader>الحالة</TableHeader>
              <TableHeader>التاريخ</TableHeader>
              <TableHeader>القيمة</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableCell>مشروع التطوير الرقمي</TableCell>
              <TableCell>شركة النخيل</TableCell>
              <TableCell>قيد التنفيذ</TableCell>
              <TableCell>2024-01-15</TableCell>
              <TableCell>250,000 ريال</TableCell>
            </tr>
            <tr>
              <TableCell>تحديث النظام الإداري</TableCell>
              <TableCell>مؤسسة الرياض</TableCell>
              <TableCell>مكتمل</TableCell>
              <TableCell>2024-01-10</TableCell>
              <TableCell>180,000 ريال</TableCell>
            </tr>
            <tr>
              <TableCell>استشارة تقنية</TableCell>
              <TableCell>شركة الخليج</TableCell>
              <TableCell>معلق</TableCell>
              <TableCell>2024-01-08</TableCell>
              <TableCell>75,000 ريال</TableCell>
            </tr>
          </tbody>
        </Table>
      </TableCard>

      <ChartsGrid>
        <ChartCard>
          <ChartTitle>نمو الإيرادات ربع السنوي</ChartTitle>
          <ChartContainer>
            <Line data={revenueGrowthData} options={lineOptions} />
          </ChartContainer>
        </ChartCard>

        <ChartCard>
          <ChartTitle>رضا العملاء</ChartTitle>
          <ChartContainer>
            <CenterValue>{clientSatisfactionData.total}%</CenterValue>
            <Doughnut data={clientSatisfactionData} options={doughnutOptions} />
          </ChartContainer>
          <ChartLegend>
            {clientSatisfactionData.labels.map((label, index) => (
              <LegendItem key={index}>
                <LegendColor
                  color={
                    clientSatisfactionData.datasets[0].backgroundColor[index]
                  }
                />
                <span>{label}</span>
              </LegendItem>
            ))}
          </ChartLegend>
        </ChartCard>
      </ChartsGrid>
    </Container>
  );
}

export default Analytics;
