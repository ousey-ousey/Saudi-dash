import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import { motion } from "framer-motion";
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
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 1rem;
  overflow-x: auto;
  box-sizing: border-box;
  background: var(--color-dark);
  min-height: 100vh;
  position: relative;
  direction: rtl;

  @media (max-width: 1200px) {
    padding: 0.8rem;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: stretch;

  @media (min-width: 2400px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1800px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  background: var(--color-dark);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(10px);

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
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(16, 185, 129, 0.3);

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    min-height: 240px;
    padding: 1.2rem;
  }
`;

const StatIcon = styled(motion.div)`
  width: 5rem;
  height: 5rem;
  border-radius: 16px;
  background: linear-gradient(135deg, #10b981, #22c55e, #16a34a);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.8rem;
  margin-bottom: 1.2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover::before {
    transform: translateX(100%);
  }
`;

const StatContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const StatNumber = styled(motion.div)`
  font-size: 2.4rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 0.3rem;
  background: linear-gradient(135deg, #10b981, #22c55e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #d1d5db;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const StatChange = styled(motion.div)`
  font-size: 0.85rem;
  color: ${(props) => (props.positive ? "#10b981" : "#ef4444")};
  font-weight: 600;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  background: ${(props) =>
    props.positive ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.1)"};
  border: 1px solid
    ${(props) =>
      props.positive ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.2)"};
  backdrop-filter: blur(10px);
  align-self: flex-start;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: stretch;

  @media (min-width: 2400px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 1800px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled(motion.div)`
  background: var(--color-dark);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
  min-height: 350px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(10px);

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
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(16, 185, 129, 0.3);

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    min-height: 300px;
    padding: 1.2rem;
  }
`;

const ChartTitle = styled(motion.h3)`
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  direction: rtl;
  text-align: right;
  background: linear-gradient(135deg, #10b981, #22c55e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ChartContainer = styled(motion.div)`
  height: 250px;
  position: relative;
  margin: 0.5rem 0;
  background: transparent;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1400px) {
    height: 220px;
  }

  @media (max-width: 1200px) {
    height: 200px;
  }

  @media (max-width: 768px) {
    height: 180px;
  }
`;

const CenterValue = styled(motion.div)`
  position: absolute;
  top: 0%;
  left: 0%;
  transform: translate(-50%, -50%);
  font-size: 2.5rem;
  font-weight: 900;
  color: #ffffff;
  z-index: 100;
  background: linear-gradient(135deg, #10b981, #22c55e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
  text-align: center;
  line-height: 1;
`;

const ChartLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.8rem;
  font-size: 0.8rem;
  direction: rtl;
  justify-content: flex-end;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #d1d5db;
  font-weight: 500;
`;

const LegendColor = styled.div`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const TableCard = styled(motion.div)`
  background: var(--color-dark);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(10px);

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
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(16, 185, 129, 0.3);

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: right;
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 600;
  color: #ffffff;
  font-size: 0.8rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.6rem 0;
  }
`;

const TableCell = styled.td`
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: #d1d5db;
  font-size: 0.8rem;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.6rem 0;
  }
`;

function Analytics() {
  // Chart options
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
          color: "rgba(255, 255, 255, 0.1)",
          lineWidth: 1,
        },
        ticks: {
          color: "#ffffff",
          font: {
            size: 10,
            weight: "500",
          },
        },
        border: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          lineWidth: 1,
        },
        ticks: {
          color: "#ffffff",
          font: {
            size: 10,
            weight: "500",
          },
        },
        border: {
          color: "rgba(255, 255, 255, 0.1)",
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
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    cutout: "60%",
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2500,
      easing: "easeInOutQuart",
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default") {
          delay = context.dataIndex * 100 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        borderColor: "#10b981",
        borderWidth: 2,
        cornerRadius: 8,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        callbacks: {
          title: function (context) {
            return context[0].label;
          },
          label: function (context) {
            return `المشاريع المكتملة: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          lineWidth: 1,
          drawBorder: false,
        },
        ticks: {
          color: "#ffffff",
          font: {
            size: 11,
            weight: "500",
          },
          padding: 8,
        },
        border: {
          display: false,
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
          lineWidth: 1,
          drawBorder: false,
        },
        ticks: {
          color: "#ffffff",
          font: {
            size: 11,
            weight: "500",
          },
          padding: 8,
        },
        border: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: "#22c55e",
        hoverBorderColor: "#ffffff",
        hoverBorderWidth: 3,
      },
      line: {
        borderCapStyle: "round",
        borderJoinStyle: "round",
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
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#22c55e",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 3,
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
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
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
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
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
          "#10b981",
          "#3b82f6",
          "#f59e0b",
          "#ef4444",
          "#6b7280",
        ],
        borderWidth: 0,
      },
    ],
    total: 100,
  };

  return (
    <Container>
      <Row type="horizontal" style={{margin: "3rem 0 1rem 0"}}>
        <Heading
          as="h1"
          style={{ color: "#ffffff", fontSize: "1.2rem", margin: "1rem 0" }}
        >
          التحليلات
        </Heading>
        <Button>تصدير التقرير</Button>
      </Row>

      <StatsGrid>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <StatIcon
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HiOutlineChartBarSquare />
          </StatIcon>
          <StatContent>
            <StatNumber
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              1,247
            </StatNumber>
            <StatLabel>إجمالي المشاريع</StatLabel>
            <StatChange
              positive
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              +12.5% من الشهر الماضي
            </StatChange>
          </StatContent>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <StatIcon
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <HiOutlineArrowTrendingUp />
          </StatIcon>
          <StatContent>
            <StatNumber
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              89.2%
            </StatNumber>
            <StatLabel>معدل النجاح</StatLabel>
            <StatChange
              positive
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              +3.1% من الشهر الماضي
            </StatChange>
          </StatContent>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <StatIcon
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <HiOutlineUsers />
          </StatIcon>
          <StatContent>
            <StatNumber
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              156
            </StatNumber>
            <StatLabel>العملاء النشطون</StatLabel>
            <StatChange
              positive
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              +8.7% من الشهر الماضي
            </StatChange>
          </StatContent>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <StatIcon
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <HiOutlineClock />
          </StatIcon>
          <StatContent>
            <StatNumber
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              24.5
            </StatNumber>
            <StatLabel>متوسط وقت التنفيذ (أيام)</StatLabel>
            <StatChange
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              -2.3% من الشهر الماضي
            </StatChange>
          </StatContent>
        </StatCard>
      </StatsGrid>

      <ChartsGrid>
        <ChartCard
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <ChartTitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            أداء المشاريع الشهرية
          </ChartTitle>
          <ChartContainer
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Line data={monthlyPerformanceData} options={lineOptions} />
          </ChartContainer>
        </ChartCard>

        <ChartCard
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <ChartTitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            توزيع أنواع المشاريع
          </ChartTitle>
          <ChartContainer
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Doughnut data={projectTypesData} options={doughnutOptions} />
            <CenterValue
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              100%
            </CenterValue>
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

      <TableCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <ChartTitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          أحدث المشاريع
        </ChartTitle>
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
        <ChartCard
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <ChartTitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            نمو الإيرادات ربع السنوي
          </ChartTitle>
          <ChartContainer
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Line data={revenueGrowthData} options={lineOptions} />
          </ChartContainer>
        </ChartCard>

        <ChartCard
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <ChartTitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            رضا العملاء
          </ChartTitle>
          <ChartContainer
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <Doughnut data={clientSatisfactionData} options={doughnutOptions} />
            <CenterValue
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              4.2
            </CenterValue>
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
