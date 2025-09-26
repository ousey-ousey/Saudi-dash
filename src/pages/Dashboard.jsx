import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Chart from "react-apexcharts";
import Heading from "../ui/Heading";
import PropTypes from "prop-types";
import usePageTitle from "../hooks/usePageTitle";
import {
  Activity,
  Building,
  Clock,
  FileText,
  RefreshCw,
  Home,
  Maximize2,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Users,
  GitCommit,
  Zap,
} from "lucide-react";

// --- Styled Components --

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 2rem;
  margin:"1rem 0"
  grid-auto-flow: row;
  grid-template-areas:
  "distripution firstcharts secondcharts thiardcharts timeline timeline"
    "distripution firstcharts secondcharts thiardcharts achiveandabstract achiveandabstract"
    "qualitycheck qualitycheck budget budget budget posibilityanddanger"
    "qualitycheck qualitycheck lineofhalfyearsandstate lineofhalfyearsandstate lineofhalfyearsandstate posibilityanddanger";
  width: 100vw;
  height: auto;
  box-sizing: border-box;
`;

const Distripution = styled.div`
  grid-area: distripution;
`;

const Firstcharts = styled.div`
  grid-area: firstcharts;
`;

const Secondcharts = styled.div`
  grid-area: secondcharts;
`;

const Budget = styled.div`
  grid-area: budget;
`;

const Lineofhalfyearsandstate = styled.div`
  grid-area: lineofhalfyearsandstate;
`;

const Thiardcharts = styled.div`
  grid-area: thiardcharts;
`;

const Timeline = styled.div`
  grid-area: timeline;
`;

const Achiveandabstract = styled.div`
  grid-area: achiveandabstract;
`;

const Posibilityanddanger = styled.div`
  grid-area: posibilityanddanger;
`;

const Qualitycheck = styled.div`
  grid-area: qualitycheck;
`;

const CardTitle = styled(motion.h3)`
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  display: flex;

  gap: 0.5rem;
  direction: rtl;
  text-align: center;
  background: linear-gradient(135deg, #10b981, #22c55e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.5rem;
  font-size: 1.4rem;
  direction: rtl;
  justify-content: flex-end;

  @media (max-width: 768px) {
    font-size: 0.55rem;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  color: #d1d5db;
`;

const LegendDot = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: ${(props) => props.color};
`;

const Table = styled.div`
  margin-top: 0.5rem;
`;

const TableRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 1rem;
  direction: rtl;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    font-size: 0.65rem;
  }
`;

const TableCell = styled.div`
  font-size: 1rem;
  color: ${(props) => (props.emphasis === "true" ? "#ffffff" : "#d1d5db")};
  font-weight: ${(props) => (props.emphasis === "true" ? "600" : "400")};
  text-align: ${(props) => (props.rtl === "true" ? "right" : "left")};
  flex-basis: ${(props) => props.basis || "auto"};

  @media (max-width: 768px) {
    font-size: 0.65rem;
  }
`;

const QualityStatCard = styled.div`
  background: ${(props) => props.color}20;
  border-radius: 6px;
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100px;
`;

const QualityValue = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: ${(props) => props.color};
  line-height: 1;
`;

const QualityLabel = styled.div`
  font-size: 1.5rem;
  color: #ffffff;
  font-weight: 500;
  margin-top: 0.3rem;
  direction: rtl;
`;

// Small Donut Card for Quality Section
const SmallDonutCard = ({
  title = "",
  options = {},
  series = [],
  labels = [],
  chartOptions = {},
  style = {},
  centerValue = "",
}) => (
  <div
    style={{
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "6px",
      padding: "1.5rem",
      background: "#0f172a",
      ...style,
    }}
  >
    <div
      style={{
        fontSize: "1.5rem",
        fontWeight: 600,
        color: "#ffffff",
        marginBottom: "0.3rem",
        textAlign: "right",
        background: "#0f172a",
        direction: "rtl",
      }}
    >
      {title}
    </div>
    <div
      style={{
        position: "relative",
        height: "150px",
        background: "#0f172a !important",
      }}
    >
      <Chart
        options={{
          ...options,
          plotOptions: {
            pie: {
              donut: {
                size: "70%",
                labels: { show: false },
              },
            },
          },
          legend: { show: false },
          dataLabels: { enabled: false },
        }}
        series={series}
        type="donut"
        height={150}
        style={{ background: "#0f172a !important" }}
      />
      {/* Center Value */}
      {centerValue && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "1rem",
            fontWeight: "700",
            color: "#fff",
            textAlign: "center",
            zIndex: 10,
            background: "linear-gradient(135deg, #10b981, #22c55e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {centerValue}
        </div>
      )}
    </div>
    <Legend style={{ fontSize: ".8rem", justifyContent: "flex-end" }}>
      {labels.map((label, index) => (
        <LegendItem key={label}>
          <LegendDot
            color={chartOptions.colors[index % chartOptions.colors.length]}
          />
          {label}
        </LegendItem>
      ))}
    </Legend>
  </div>
);

SmallDonutCard.propTypes = {
  title: PropTypes.string,
  options: PropTypes.object,
  series: PropTypes.array,
  labels: PropTypes.array,
  chartOptions: PropTypes.object,
  style: PropTypes.object,
  centerValue: PropTypes.string,
};

// --- Dashboard Component ---

function Dashboard() {
  // Set page title
  usePageTitle("لوحة بيانات المشاريع");

  // Chart options for dark theme
  const chartOptions = {
    theme: {
      mode: "dark",
    },
    chart: {
      background: "transparent",
      toolbar: {
        show: false,
      },
      fontFamily: "inherit",
      locales: [
        {
          name: "ar",
          options: {
            toolbar: {
              download: "تحميل",
              selection: "تحديد",
              zoom: "تكبير",
              zoomin: "تكبير",
              zoomout: "تصغير",
              pan: "تحريك",
              reset: "إعادة تعيين",
            },
          },
        },
      ],
      defaultLocale: "ar",
    },
    colors: [
      "#8b5cf6",
      "#f59e0b",
      "#fbbf24",
      "#fde047",
      "#86efac",
      "#22c55e",
      "#ef4444",
      "#f97316",
      "#06b6d4",
      "#3b82f6",
      "#84cc16",
      "#10b981",
      "#6366f1",
      "#d946ef",
    ],
    legend: {
      labels: {
        colors: "#ffffff",
      },
      position: "bottom",
      horizontalAlign: "center",
      fontFamily: "inherit",
      fontSize: "4px",
    },
    tooltip: {
      theme: "dark",
      rtl: true,
      y: {
        formatter: function (value) {
          if (typeof value === "number") {
            if (value > 1000000000)
              return (value / 1000000000).toFixed(2) + " بليون";
            if (value > 1000000) return (value / 1000000).toFixed(2) + " مليون";
            if (value > 1000) return (value / 1000).toFixed(0) + " ألف";
          }
          return value;
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  // Base donut options for sectors, stages, types
  const baseDonutOptions = {
    ...chartOptions,
    chart: {
      ...chartOptions.chart,
      type: "donut",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "",
              fontSize: "14px",
              fontWeight: 600,
              color: "#ffffff",
            },
          },
        },
      },
    },
    legend: { show: false },
  };

  // Geographical Distribution Chart
  const geographicalDistributionOptions = {
    ...chartOptions,
    chart: {
      ...chartOptions.chart,
      type: "bar",
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "80%",
      },
    },
    xaxis: {
      categories: [
        "الجوف",
        "تبوك",
        "الباحة",
        "عسير",
        "الحدود الشمالية",
        "القصيم",
        "حائل",
        "نجران",
        "المدينة المنورة",
        "المنطقة الشرقية",
        "مكة المكرمة",
        "الرياض",
        "مناطق المملكة",
        "جازان",
      ],
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
    grid: {
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
    legend: {
      ...chartOptions.legend,
      position: "bottom",
      itemMargin: { horizontal: 5, vertical: 0 },
      markers: {
        width: 8,
        height: 8,
      },
      onItemClick: { toggleDataSeries: false },
    },
  };

  const geographicalDistributionSeries = [
    { name: "الورد", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { name: "المواشي", data: [0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 2, 4, 4] },
    {
      name: "المحاصيل البعليه",
      data: [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 2, 2, 3, 3],
    },
    {
      name: "القيمة المضافة",
      data: [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 2, 2],
    },
    { name: "الفاكهة", data: [0, 1, 1, 1, 0, 0, 0, 1, 1, 2, 1, 2, 3, 2] },
    { name: "العسل", data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 2, 4, 3] },
    { name: "البن العربي", data: [0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 2, 1, 3, 2] },
    { name: "الاسماك", data: [0, 1, 1, 2, 1, 0, 1, 1, 1, 1, 3, 2, 5, 3] },
  ];

  // Sector Distribution
  const sectorDistributionLabels = [
    "الاسماك",
    "البن العربي",
    "العسل",
    "الفاكهة",
    "القيمة المضافة",
    "المحاصيل البعليه",
    "المواشي",
    "الورد",
  ];
  const sectorDistributionSeriesCount = [20, 18, 6, 18, 12, 12, 9, 16];
  const sectorDistributionSeriesValue = [
    0.37, 0.24, 0.19, 0.12, 0.13, 0.09, 0.17, 0.22,
  ];

  const sectorDistributionCountOptions = {
    ...baseDonutOptions,
    labels: sectorDistributionLabels,
    plotOptions: {
      ...baseDonutOptions.plotOptions,
      pie: {
        ...baseDonutOptions.plotOptions.pie,
        donut: {
          ...baseDonutOptions.plotOptions.pie.donut,
          labels: {
            ...baseDonutOptions.plotOptions.pie.donut.labels,
            total: {
              ...baseDonutOptions.plotOptions.pie.donut.labels.total,
              formatter: () =>
                sectorDistributionSeriesCount.reduce((a, b) => a + b, 0),
            },
          },
        },
      },
    },
  };

  const sectorDistributionValueOptions = {
    ...baseDonutOptions,
    labels: sectorDistributionLabels,
    plotOptions: {
      ...baseDonutOptions.plotOptions,
      pie: {
        ...baseDonutOptions.plotOptions.pie,
        donut: {
          ...baseDonutOptions.plotOptions.pie.donut,
          labels: {
            ...baseDonutOptions.plotOptions.pie.donut.labels,
            total: {
              ...baseDonutOptions.plotOptions.pie.donut.labels.total,
              formatter: () =>
                sectorDistributionSeriesValue
                  .reduce((a, b) => a + b, 0)
                  .toFixed(2) + " B",
            },
          },
        },
      },
    },
    tooltip: {
      ...chartOptions.tooltip,
      y: {
        formatter: (val) => val.toFixed(2) + " B",
      },
    },
  };

  // Project Stages
  const projectStagesLabels = [
    "بدء المشروع",
    "لجنة فحص العروض",
    "تم الترسية",
    "تم التوقيع",
    "الطرح",
    "إنتهاء المشروع",
  ];
  const projectStagesSeriesCount = [63, 21, 13, 9, 11, 4];
  const projectStagesSeriesValue = [0.74, 0.34, 0.05, 0.01, 0.13, 0.04];

  const projectStagesCountOptions = {
    ...baseDonutOptions,
    labels: projectStagesLabels,
    plotOptions: {
      ...baseDonutOptions.plotOptions,
      pie: {
        ...baseDonutOptions.plotOptions.pie,
        donut: {
          ...baseDonutOptions.plotOptions.pie.donut,
          labels: {
            ...baseDonutOptions.plotOptions.pie.donut.labels,
            total: {
              ...baseDonutOptions.plotOptions.pie.donut.labels.total,
              formatter: () =>
                projectStagesSeriesCount.reduce((a, b) => a + b, 0),
            },
          },
        },
      },
    },
  };

  const projectStagesValueOptions = {
    ...baseDonutOptions,
    labels: projectStagesLabels,
    plotOptions: {
      ...baseDonutOptions.plotOptions,
      pie: {
        ...baseDonutOptions.plotOptions.pie,
        donut: {
          ...baseDonutOptions.plotOptions.pie.donut,
          labels: {
            ...baseDonutOptions.plotOptions.pie.donut.labels,
            total: {
              ...baseDonutOptions.plotOptions.pie.donut.labels.total,
              formatter: () =>
                projectStagesSeriesValue.reduce((a, b) => a + b, 0).toFixed(2) +
                " B",
            },
          },
        },
      },
    },
    tooltip: {
      ...chartOptions.tooltip,
      y: {
        formatter: (val) => val.toFixed(2) + " B",
      },
    },
  };

  // Project Types
  const projectTypesLabels = [
    "انشاءات",
    "اعمال الخدمات",
    "توريدات",
    "تشغيل",
    "الاشراف",
    "استشارات",
    "تقنية المعلومات",
  ];
  const projectTypesSeriesCount = [65, 19, 17, 3, 2, 2, 3];
  const projectTypesSeriesValue = [0.8, 0.25, 0.03, 0.05, 0.09, 0.03, 0.07];

  const projectTypesCountOptions = {
    ...baseDonutOptions,
    labels: projectTypesLabels,
    plotOptions: {
      ...baseDonutOptions.plotOptions,
      pie: {
        ...baseDonutOptions.plotOptions.pie,
        donut: {
          ...baseDonutOptions.plotOptions.pie.donut,
          labels: {
            ...baseDonutOptions.plotOptions.pie.donut.labels,
            total: {
              ...baseDonutOptions.plotOptions.pie.donut.labels.total,
              formatter: () =>
                projectTypesSeriesCount.reduce((a, b) => a + b, 0),
            },
          },
        },
      },
    },
  };

  const projectTypesValueOptions = {
    ...baseDonutOptions,
    labels: projectTypesLabels,
    plotOptions: {
      ...baseDonutOptions.plotOptions,
      pie: {
        ...baseDonutOptions.plotOptions.pie,
        donut: {
          ...baseDonutOptions.plotOptions.pie.donut,
          labels: {
            ...baseDonutOptions.plotOptions.pie.donut.labels,
            total: {
              ...baseDonutOptions.plotOptions.pie.donut.labels.total,
              formatter: () =>
                projectTypesSeriesValue.reduce((a, b) => a + b, 0).toFixed(2) +
                " B",
            },
          },
        },
      },
    },
    tooltip: {
      ...chartOptions.tooltip,
      y: {
        formatter: (val) => val.toFixed(2) + " B",
      },
    },
  };

  // Budget Distribution
  const budgetChartOptions = {
    ...chartOptions,
    chart: {
      ...chartOptions.chart,
      type: "bar",
      stacked: true,
      horizontal: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "50%",
        borderRadius: 4,
      },
    },
    xaxis: {
      categories: ["الميزانية"],
      labels: {
        show: false,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      ...chartOptions.tooltip,
      y: {
        formatter: (val) => val.toFixed(2) + " M",
      },
    },
  };

  const budgetChartSeries = [
    {
      name: "مبالغ تحت إجراءات الترسية",
      data: [366.45],
      color: "#f97316",
    },
    {
      name: "مشاريع تمت ترسيتها",
      data: [221.42],
      color: "#fbbf24",
    },
    {
      name: "الفرق بين التقديري و الفعلي",
      data: [2.22],
      color: "#22c55e",
    },
    {
      name: "المبلغ المتبقي",
      data: [226.28],
      color: "#8b5cf6",
    },
  ];

  // Program Completion Timeline - Line Chart Only
  const completionTimelineLineOptions = {
    ...chartOptions,
    chart: {
      ...chartOptions.chart,
      type: "line",
      stacked: false,
    },
    stroke: {
      width: [4, 4, 3, 3],
      curve: "smooth",
    },
    xaxis: {
      categories: [
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
      labels: {
        style: {
          colors: "#ffffff",
        },
        rotate: -45,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#ffffff",
          fontSize: "1rem",
        },
        formatter: (val) => val + "%",
      },
      title: {
        text: "النسبة المئوية",
        style: { color: "#ffffff" },
      },
      min: 0,
      max: 100,
    },
    series: [
      {
        name: "المخطط التراكمي",
        type: "line",
        data: [5, 15, 24, 31, 41, 54, 66, 74, 81, 89, 95, 100],
        color: "#3b82f6",
      },
      {
        name: "الفعلي التراكمي",
        type: "line",
        data: [4, 14, 22, 29, 39, 52, 64, 72, 79, 87, 93, 98],
        color: "#ef4444",
      },
      {
        name: "نسبة الانجاز المخطط",
        type: "line",
        data: [5, 12, 10, 7, 13, 22, 8, 13, 7, 8, 6, 5],
        color: "#fbbf24",
      },
      {
        name: "نسبة الانجاز الفعلي",
        type: "line",
        data: [4, 10, 8, 6, 10, 11, 7, 7, 6, 2, 5, 4],
        color: "#06b6d4",
      },
    ],
    grid: {
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
    legend: {
      ...chartOptions.legend,
      position: "bottom",
      fontSize: "9px",
    },
  };

  // Work Receipts and Technical Approvals base
  const baseStatusDonutOptions = {
    ...chartOptions,
    chart: { ...chartOptions.chart, type: "donut" },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          labels: {
            show: true,
            name: { show: false },
            value: { show: false },
            total: {
              show: true,
              label: "",
              fontSize: "10px",
              fontWeight: 400,
              color: "#d1d5db",
            },
          },
        },
      },
    },
    labels: [
      "مرفوض",
      "متأخر",
      "معتمد مع ملاحظات",
      "يعاد التسليم",
      "تحت الدراسة",
      "معتمد بدون ملاحظات",
    ],
    legend: { show: false },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return (
          opts.w.config.series[opts.seriesIndex] + " (" + val.toFixed(0) + "%)"
        );
      },
      style: {
        fontSize: "10px",
        colors: ["#fff"],
      },
      dropShadow: {
        enabled: true,
      },
    },
  };

  const workReceiptsOptions = {
    ...baseStatusDonutOptions,
    plotOptions: {
      ...baseStatusDonutOptions.plotOptions,
      pie: {
        ...baseStatusDonutOptions.plotOptions.pie,
        donut: {
          ...baseStatusDonutOptions.plotOptions.pie.donut,
          labels: {
            ...baseStatusDonutOptions.plotOptions.pie.donut.labels,
            total: {
              ...baseStatusDonutOptions.plotOptions.pie.donut.labels.total,
              label: "اجمالي استلام",
              formatter: () => "5595",
            },
          },
        },
      },
    },
    series: [3994, 916, 195, 119, 130, 19],
  };

  const workReceiptsLabels = [
    "مرفوض",
    "متأخر",
    "معتمد مع ملاحظات",
    "يعاد التسليم",
    "تحت الدراسة",
    "معتمد بدون ملاحظات",
  ];

  const technicalApprovalsOptions = {
    ...baseStatusDonutOptions,
    plotOptions: {
      ...baseStatusDonutOptions.plotOptions,
      pie: {
        ...baseStatusDonutOptions.plotOptions.pie,
        donut: {
          ...baseStatusDonutOptions.plotOptions.pie.donut,
          labels: {
            ...baseStatusDonutOptions.plotOptions.pie.donut.labels,
            total: {
              ...baseStatusDonutOptions.plotOptions.pie.donut.labels.total,
              label: "اجمالي اعتمادات",
              formatter: () => "7715",
            },
          },
        },
      },
    },
    series: [3988, 2764, 398, 140, 56, 26],
  };

  const technicalApprovalsLabels = [
    "مرفوض",
    "متأخر",
    "معتمد مع ملاحظات",
    "يعاد التسليم",
    "تحت الدراسة",
    "معتمد بدون ملاحظات",
  ];

  // Change Orders and Non-Conformance specific
  const changeOrdersOptions = {
    ...chartOptions,
    chart: { type: "donut" },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: { show: false },
        },
      },
    },
    labels: ["مرفوض", "مفتوح", "معتمد"],
    legend: { show: false },
    dataLabels: { enabled: false },
    series: [1, 1, 14],
  };

  const changeOrdersLabels = ["مرفوض", "مفتوح", "معتمد"];

  const nonConformanceOptions = {
    ...chartOptions,
    chart: { type: "donut" },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: { show: false },
        },
      },
    },
    labels: ["غير مطابق", "تحت المعالجة", "مطابق"],
    legend: { show: false },
    dataLabels: { enabled: false },
    series: [3, 3, 11],
  };

  const nonConformanceLabels = ["غير مطابق", "تحت المعالجة", "مطابق"];

  // Project Status Gauge
  const actualCompletionSeries = [28];
  const actualCompletionOptions = {
    ...chartOptions,
    chart: {
      ...chartOptions.chart,
      type: "radialBar",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 2000,
        animateGradually: {
          enabled: true,
          delay: 100,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "70%",
        },
        dataLabels: {
          showOn: "always",
          name: { show: false },
          value: {
            color: "#ffffff",
            fontSize: "20px",
            fontWeight: 700,
            show: true,
            offsetY: 8,
            formatter: (val) => val + "%",
          },
        },
        track: {
          background: "#4b5563",
          margin: 0,
        },
      },
    },
    fill: {
      colors: ["#26df16"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["نسبة الإنجاز الفعلي"],
    legend: { show: false },
  };

  // Risk Matrix
  const riskMatrixOptions = {
    ...chartOptions,
    chart: {
      ...chartOptions.chart,
      type: "scatter",
      toolbar: { show: true },
    },
    xaxis: {
      title: {
        text: "الاحتمالية",
        style: { colors: "#ffffff" },
      },
      tickAmount: 5,
      min: 1,
      max: 5,
      labels: {
        style: { colors: "#ffffff" },
      },
    },
    yaxis: {
      title: {
        text: "التأثير",
        style: { colors: "#ffffff" },
      },
      tickAmount: 5,
      min: 1,
      max: 5,
      labels: {
        style: { colors: "#ffffff" },
      },
    },
    grid: {
      borderColor: "rgba(255, 255, 255, 0.1)",
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
    markers: {
      size: 10,
      colors: ["#ef4444"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 12 },
    },
    tooltip: {
      ...chartOptions.tooltip,
      y: {
        formatter: (val) => "التأثير: " + val,
      },
      x: {
        formatter: (val) => "الاحتمالية: " + val,
      },
    },
  };

  const riskMatrixSeries = [
    {
      name: "المخاطر",
      data: [
        { x: 3, y: 4, meta: "تأخر تورسية المشاريع" },
        { x: 4, y: 3, meta: "تأخر في صرف المستحقات" },
        { x: 4, y: 4, meta: "عدم تفرغ الكادر" },
      ],
    },
  ];

  const risksTableData = [
    { id: 1, name: "تأخر تورسية المشاريع", impact: 4, probability: 3 },
    { id: 2, name: "تأخر في صرف المستحقات", impact: 3, probability: 4 },
    { id: 3, name: "عدم تفرغ الكادر", impact: 4, probability: 4 },
  ];

  return (
    <>
      <Container style={{}}>
        <Distripution style={{ height: "fit-content", width: "280px" }}>
          <CardTitle style={{ alignItems: "center", justifyContent: "center" }}>
            <BarChart3 size={16} />
            التوزيع الجغرافي للمشاريع
          </CardTitle>
          <Chart
            options={geographicalDistributionOptions}
            series={geographicalDistributionSeries}
            type="bar"
            height={600}
          />
        </Distripution>
        <Firstcharts style={{ height: "fit-content", width: "230px" }}>
          <CardTitle style={{ alignItems: "center", justifyContent: "center" }}>
            <BarChart3 size={16} />
            توزيع المشاريع بالقطاعات
          </CardTitle>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#ffffff",
                  marginBottom: "0.5rem",
                  textAlign: "center",
                }}
              >
                العدد
              </div>
              <Chart
                options={sectorDistributionCountOptions}
                series={sectorDistributionSeriesCount}
                type="donut"
                height={300}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#ffffff",
                  marginBottom: "0.5rem",
                  textAlign: "center",
                }}
              >
                القيمة (B)
              </div>
              <Chart
                options={sectorDistributionValueOptions}
                series={sectorDistributionSeriesValue}
                type="donut"
                height={300}
              />
            </div>
          </div>
          <Legend style={{ justifyContent: "center" }}>
            {sectorDistributionLabels.map((label, index) => (
              <LegendItem key={label}>
                <LegendDot
                  color={
                    chartOptions.colors[index % chartOptions.colors.length]
                  }
                />
                {label}
              </LegendItem>
            ))}
          </Legend>
        </Firstcharts>
        <Secondcharts style={{ height: "fit-content", width: "230px" }}>
          <CardTitle style={{ alignItems: "center", justifyContent: "center" }}>
            <BarChart3 size={16} />
            توزيع مراحل المشاريع
          </CardTitle>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#ffffff",
                  marginBottom: "0.5rem",
                  textAlign: "center",
                }}
              >
                العدد
              </div>
              <Chart
                options={projectStagesCountOptions}
                series={projectStagesSeriesCount}
                type="donut"
                height={300}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#ffffff",
                  marginBottom: "0.5rem",
                  textAlign: "center",
                }}
              >
                القيمة (B)
              </div>
              <Chart
                options={projectStagesValueOptions}
                series={projectStagesSeriesValue}
                type="donut"
                height={300}
              />
            </div>
          </div>
          <Legend style={{ justifyContent: "center" }}>
            {projectStagesLabels.map((label, index) => (
              <LegendItem key={label}>
                <LegendDot
                  color={
                    chartOptions.colors[index % chartOptions.colors.length]
                  }
                />
                {label}
              </LegendItem>
            ))}
          </Legend>
        </Secondcharts>
        <Thiardcharts style={{ height: "fit-content", width: "230px" }}>
          <CardTitle style={{ alignItems: "center", justifyContent: "center" }}>
            <Building size={16} />
            توزيع أنواع المشاريع
          </CardTitle>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#ffffff",
                  marginBottom: "0.5rem",
                  textAlign: "center",
                }}
              >
                العدد
              </div>
              <Chart
                options={projectTypesCountOptions}
                series={projectTypesSeriesCount}
                type="donut"
                height={300}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "#ffffff",
                  marginBottom: "0.5rem",
                  textAlign: "center",
                }}
              >
                القيمة (B)
              </div>
              <Chart
                options={projectTypesValueOptions}
                series={projectTypesSeriesValue}
                type="donut"
                height={300}
              />
            </div>
          </div>
          <Legend style={{ justifyContent: "center" }}>
            {projectTypesLabels.map((label, index) => (
              <LegendItem key={label}>
                <LegendDot
                  color={
                    chartOptions.colors[index % chartOptions.colors.length]
                  }
                />
                {label}
              </LegendItem>
            ))}
          </Legend>
        </Thiardcharts>
        <Timeline style={{}}>
          <CardTitle style={{}}>
            <Clock size={20} />
            الخط الزمني للبرنامج
          </CardTitle>

          {/* Timeline Bar */}
          <div
            style={{
              position: "relative",
              height: "15%",
              margin: "2rem 1rem 1rem 1rem",
              background: "linear-gradient(90deg, #1d6327 0%, #581d1d 100%)",
              borderRadius: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 1rem",
              top: "26%",
              width: "70%",
            }}
          >
            {/* Start Indicator */}
            <div
              style={{
                position: "absolute",
                left: "-26px",
                top: "75%",
                transform: "translateY(-100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "47%",
                  color: "#ffffff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                البداية
                <br />
                2021
              </div>
            </div>

            {/* Current Time Indicator */}
            <div
              style={{
                position: "absolute",
                left: "70%",
                top: "75%",
                transform: "translateY(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  background: "#fbbf24",
                  borderRadius: "50%",
                  border: "2px solid #ffffff",
                  marginBottom: "5px",
                  boxShadow: "0 0 5px rgba(251, 191, 36, 0.5)",
                }}
              ></div>
              <div
                style={{
                  fontSize: "47%",
                  color: "#fbbf24",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                الوقت الحالي
                <br />
                2025
              </div>
            </div>

            {/* End Indicator */}
            <div
              style={{
                position: "absolute",
                right: "-26px",
                top: "75%",
                transform: "translateY(-100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "47%",
                  color: "#ffffff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                النهاية
                <br />
                2026
              </div>
            </div>

            {/* Year Labels */}
            <div
              style={{
                position: "absolute",
                top: "-25px",
                left: "-20px",
                right: "0",
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "space-between",
                padding: "0 1rem",
              }}
            >
              {[2021, 2022, 2023, 2024, 2025, 2026].map((year) => (
                <span
                  key={year}
                  style={{
                    fontSize: "61%",
                    margin: "1rem",
                    fontWeight: year === 2025 ? "bold" : "normal",
                    color: year === 2025 ? "#fbbf24" : "#94a3b8",
                  }}
                >
                  {year}
                </span>
              ))}
            </div>
          </div>
        </Timeline>
        <Achiveandabstract
          style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
        >
          <div style={{ width: "30%", height: "fit-content" }}>
            <CardTitle
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              ملخص تنفيذي
            </CardTitle>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                padding: "1.5rem",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                height: "100%",
                margin: "1rem 0 0 0",
                overflowY: "auto",
              }}
            >
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  color: "#e2e8f0",
                }}
              >
                <li
                  style={{
                    marginBottom: "1rem",
                    paddingLeft: "1.5rem",
                    position: "relative",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "0",
                      top: "0.5rem",
                      width: "6px",
                      height: "6px",
                      background: "#3b82f6",
                      borderRadius: "50%",
                    }}
                  ></div>
                  تم تسليم 6 أراضي مخصصين لقطاعات الأسماك والورد والماشية
                </li>
                <li
                  style={{
                    marginBottom: "1rem",
                    paddingLeft: "1.5rem",
                    position: "relative",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "0",
                      top: "0.5rem",
                      width: "6px",
                      height: "6px",
                      background: "#3b82f6",
                      borderRadius: "50%",
                    }}
                  ></div>
                  تم تسليم 6 أراضي مخصصين لقطاعات الأسماك والورد والماشية
                </li>
                <li
                  style={{
                    marginBottom: "1rem",
                    paddingLeft: "1.5rem",
                    position: "relative",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "0",
                      top: "0.5rem",
                      width: "6px",
                      height: "6px",
                      background: "#3b82f6",
                      borderRadius: "50%",
                    }}
                  ></div>
                  تم تسليم 6 أراضي مخصصين لقطاعات الأسماك والورد والماشية
                </li>
              </ul>
            </div>
          </div>

          <div style={{ width: "70%", height: "fit-content" }}>
            <CardTitle style={{ textAlign: "center" }}>
              نسبة الانجاز الفعلية للبرنامج
            </CardTitle>
            <div
              style={{
                width: "100%",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "100px",
                  left: "25%",
                }}
              >
                <Chart
                  options={actualCompletionOptions}
                  series={actualCompletionSeries}
                  type="radialBar"
                  height={100}
                />
              </div>

              {/* Metrics Table */}
              <div
                style={{
                  gap: "1rem",
                  marginTop: "1rem",
                  dispaly: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    padding: "0.75rem",
                    borderRadius: "8px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#ef4444",
                      marginBottom: "0.25rem",
                    }}
                  >
                    نسبة الحيادالناتج
                  </div>
                  <div
                    style={{
                      fontSize: "1rem",
                      color: "#ef4444",
                      fontWeight: "bold",
                    }}
                  >
                    -4%
                  </div>
                </div>
                <div
                  style={{
                    padding: "0.75rem",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#22c55e",
                      marginBottom: "0.25rem",
                    }}
                  >
                    نسبة الانجاز المخطط
                  </div>
                  <div
                    style={{
                      fontSize: "1rem",
                      color: "#22c55e",
                      fontWeight: "bold",
                    }}
                  >
                    32%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Achiveandabstract>

        <Qualitycheck style={{}}>
          <CardTitle style={{ alignItems: "center", justifyContent: "center" }}>
            <Zap size={16} />
            احصائيات الجودة
          </CardTitle>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            <QualityStatCard color="#22c55e">
              <QualityValue color="#22c55e">350</QualityValue>
              <QualityLabel>اجمالي زيارات ميدانية</QualityLabel>
            </QualityStatCard>
            <QualityStatCard color="#8b5cf6">
              <QualityValue color="#8b5cf6">13505</QualityValue>
              <QualityLabel>اجمالي الاعتمادات و الاستلامات</QualityLabel>
            </QualityStatCard>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                width: "50%",
                height: "100%",
              }}
            >
              <SmallDonutCard
                title="استلام الأعمال"
                options={workReceiptsOptions}
                series={workReceiptsOptions.series}
                labels={workReceiptsLabels}
                chartOptions={chartOptions}
                centerValue="100%"
              />
              <SmallDonutCard
                title="الاعتمادات الفنية"
                options={technicalApprovalsOptions}
                series={technicalApprovalsOptions.series}
                labels={technicalApprovalsLabels}
                chartOptions={chartOptions}
                centerValue="42"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                width: "50%",
                height: "100%",
              }}
            >
              <SmallDonutCard
                title="اوامر التغيير"
                options={technicalApprovalsOptions}
                series={technicalApprovalsOptions.series}
                labels={changeOrdersLabels}
                chartOptions={technicalApprovalsOptions}
                centerValue="16"
              />
              <SmallDonutCard
                title="عدم المطابقة"
                options={technicalApprovalsOptions}
                series={technicalApprovalsOptions.series}
                labels={nonConformanceLabels}
                chartOptions={technicalApprovalsOptions}
                centerValue="17"
              />
            </div>
          </div>
        </Qualitycheck>
        <Budget
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            top: "20%",
          }}
        >
          <CardTitle style={{ alignItems: "center", justifyContent: "center" }}>
            <Activity size={16} />
            توزيع ميزانية البرنامج
          </CardTitle>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "1rem 0",
            }}
          >
            <div>
              <div
                style={{
                  color: "#ffffff",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                }}
              >
                1.53 bn
              </div>
              <div style={{ color: "#d1d5db", fontSize: "0.7rem" }}>
                اجمالي الميزانية
              </div>
            </div>
            <div>
              <div
                style={{
                  color: "#86efac",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                }}
              >
                922.63 M
              </div>
              <div style={{ color: "#d1d5db", fontSize: "0.7rem" }}>
                اجمالي التعاقدات
              </div>
            </div>
          </div>
          <Chart
            options={budgetChartOptions}
            series={budgetChartSeries}
            type="bar"
            height={60}
          />
          <Legend style={{ justifyContent: "space-around" }}>
            {budgetChartSeries.map((item, index) => (
              <LegendItem key={item.name}>
                <LegendDot color={item.color} />
                {item.name}
              </LegendItem>
            ))}
          </Legend>
        </Budget>
        <Posibilityanddanger style={{}}>
          <div>
            <CardTitle>
              <AlertTriangle size={16} />
              إدارة المخاطر
            </CardTitle>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                height: "100%",
              }}
            >
              <Table
                style={{ maxHeight: "100%", margin: "2rem 0", width: "169px" }}
              >
                <TableRow
                  style={{
                    fontWeight: "600",
                    color: "#ffffff",
                    padding: "0.6rem 0",
                  }}
                >
                  <TableCell basis="10%" emphasis="true" rtl="true">
                    #
                  </TableCell>
                  <TableCell basis="60%" emphasis="true" rtl="true">
                    المخاطر
                  </TableCell>
                  <TableCell basis="15%" emphasis="true" rtl="true">
                    التأثير
                  </TableCell>
                  <TableCell basis="15%" emphasis="true" rtl="true">
                    الاحتمالية
                  </TableCell>
                </TableRow>
                {risksTableData.map((risk) => (
                  <TableRow key={risk.id}>
                    <TableCell basis="10%" rtl="true">
                      {risk.id}
                    </TableCell>
                    <TableCell basis="60%" rtl="true">
                      {risk.name}
                    </TableCell>
                    <TableCell
                      basis="15%"
                      emphasis="true"
                      style={{ color: "#ef4444" }}
                      rtl="true"
                    >
                      {risk.impact}
                    </TableCell>
                    <TableCell
                      basis="15%"
                      emphasis="true"
                      style={{ color: "#f59e0b" }}
                      rtl="true"
                    >
                      {risk.probability}
                    </TableCell>
                  </TableRow>
                ))}
              </Table>
              <CardTitle style={{ textAlign: "center", margin: "1rem 0" }}>
                <CheckCircle size={14} />
                أعلى مهام الإنجاز المطلوبة
              </CardTitle>
              <div style={{ width: "150px", margin: "1rem 0" }}>
                <Table>
                  <TableRow style={{ fontWeight: "500", color: "#ffffff" }}>
                    <TableCell basis="20%" emphasis="true" rtl="true">
                      الانجاز
                    </TableCell>
                    <TableCell basis="80%" emphasis="true" rtl="true">
                      مسمى المشروع
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      basis="20%"
                      emphasis="true"
                      rtl="true"
                      style={{ color: "#86efac" }}
                    >
                      99%
                    </TableCell>
                    <TableCell basis="80%" rtl="true">
                      إعادة محطة تربية الكائنات المائية بـ روابح جازان
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      basis="20%"
                      emphasis="true"
                      rtl="true"
                      style={{ color: "#86efac" }}
                    >
                      78%
                    </TableCell>
                    <TableCell basis="80%" rtl="true">
                      تنفيذ محطات فرز التمور في رياض الخبراء بالقصيم
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      basis="20%"
                      emphasis="true"
                      rtl="true"
                      style={{ color: "#86efac" }}
                    >
                      75%
                    </TableCell>
                    <TableCell basis="80%" rtl="true">
                      إعادة محطات تربية الكائنات المائية في روابح جازان
                    </TableCell>
                  </TableRow>
                </Table>
              </div>
              <Chart
                options={riskMatrixOptions}
                series={riskMatrixSeries}
                type="scatter"
                height={250}
                width={180}
              />
            </div>
          </div>
        </Posibilityanddanger>
        <Lineofhalfyearsandstate
          style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
        >
          <div
            style={{ width: "70%", display: "flex", flexDirection: "column" }}
          >
            <CardTitle
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Clock size={16} />
              الخط الزمني لنسب إنجاز البرنامج
            </CardTitle>
            <Chart
              options={completionTimelineLineOptions}
              series={completionTimelineLineOptions.series}
              type="line"
              height="100%"
            />
          </div>
          <div style={{ width: "30%", overflowY: "auto" }}>
            <div>
              <CardTitle
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                حالة المشاريع
              </CardTitle>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  padding: "1rem",
                  borderRadius: "12px",
                  height: "280px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(59, 130, 246, 0.1)",
                      borderRadius: "8px",
                      border: "1px solid rgba(59, 130, 246, 0.2)",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "#3b82f6",
                        fontWeight: "bold",
                        marginBottom: "0.25rem",
                      }}
                    >
                      88
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#3b82f6" }}>
                      منتظم
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(34, 197, 94, 0.1)",
                      borderRadius: "8px",
                      border: "1px solid rgba(34, 197, 94, 0.2)",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "#22c55e",
                        fontWeight: "bold",
                        marginBottom: "0.25rem",
                      }}
                    >
                      12
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#22c55e" }}>
                      مكتمل
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(245, 158, 11, 0.1)",
                      borderRadius: "8px",
                      border: "1px solid rgba(245, 158, 11, 0.2)",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "#f59e0b",
                        fontWeight: "bold",
                        marginBottom: "0.25rem",
                      }}
                    >
                      13
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#f59e0b" }}>
                      متأخر
                    </div>
                  </div>
                  <div
                    style={{
                      background: "rgba(239, 68, 68, 0.1)",
                      borderRadius: "8px",
                      border: "1px solid rgba(239, 68, 68, 0.2)",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "#ef4444",
                        fontWeight: "bold",
                        marginBottom: "0.25rem",
                      }}
                    >
                      5
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#ef4444" }}>
                      متوقف
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                    paddingTop: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                      إجمالي المشاريع
                    </span>
                    <span
                      style={{
                        color: "#ffffff",
                        fontSize: "0.7rem",
                        fontWeight: "bold",
                      }}
                    >
                      118
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                      نسبة الإنجاز الإجمالي
                    </span>
                    <span
                      style={{
                        color: "#22c55e",
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                      }}
                    >
                      84.7%
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                      المشاريع النشطة
                    </span>
                    <span
                      style={{
                        color: "#3b82f6",
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                      }}
                    >
                      101
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Lineofhalfyearsandstate>
      </Container>
    </>
  );
}

export default Dashboard;
