import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import FormRow from "../ui/FormRow";
import Select from "../ui/Select";
// import Modal from "../ui/Modal";
import { useState } from "react";
import PropTypes from "prop-types";
import {
  HiOutlinePlus,
  HiOutlineMagnifyingGlass,
  HiOutlineChevronUpDown,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterTab = styled.button`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.5rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  background: ${(props) =>
    props.active ? "var(--color-brand-500)" : "var(--color-grey-0)"};
  color: ${(props) => (props.active ? "white" : "var(--color-grey-700)")};
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.active ? "var(--color-brand-600)" : "var(--color-grey-100)"};
  }
`;

const TabIndicator = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const TabCount = styled.span`
  background: ${(props) =>
    props.active ? "rgba(255,255,255,0.2)" : "var(--color-grey-200)"};
  color: ${(props) => (props.active ? "white" : "var(--color-grey-600)")};
  padding: 0.2rem 0.6rem;
  border-radius: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 2rem;
  flex-wrap: wrap;
`;

const SearchInput = styled.div`
  position: relative;
  flex: 1;
  min-width: 25rem;
`;

const SearchField = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 4rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  background: var(--color-grey-0);
  color: var(--color-grey-800);
  font-size: 1.4rem;

  &::placeholder {
    color: var(--color-grey-500);
  }

  &:focus {
    outline: none;
    border-color: var(--color-brand-500);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-grey-500);
  font-size: 1.6rem;
`;

const ShowSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const TableContainer = styled.div`
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background: var(--color-grey-50);
  padding: 1.5rem 1rem;
  text-align: right;
  font-weight: 600;
  color: var(--color-grey-700);
  border-bottom: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  position: relative;
  cursor: pointer;

  &:hover {
    background: var(--color-grey-100);
  }
`;

const SortIcon = styled.div`
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-grey-400);
  font-size: 1.2rem;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid var(--color-grey-100);

  &:hover {
    background: var(--color-grey-50);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 1.5rem 1rem;
  color: var(--color-grey-700);
  font-size: 1.4rem;
`;

const StatusBadge = styled.span`
  padding: 0.4rem 0.8rem;
  border-radius: var(--border-radius-sm);
  font-size: 1.2rem;
  font-weight: 500;
  background: ${(props) => {
    switch (props.status) {
      case "under_review":
        return "var(--color-yellow-100)";
      case "accepted":
        return "var(--color-green-100)";
      case "accepted_with_notes":
        return "var(--color-blue-100)";
      case "resubmit":
        return "var(--color-orange-100)";
      case "rejected":
        return "var(--color-red-100)";
      default:
        return "var(--color-grey-100)";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "under_review":
        return "var(--color-yellow-800)";
      case "accepted":
        return "var(--color-green-800)";
      case "accepted_with_notes":
        return "var(--color-blue-800)";
      case "resubmit":
        return "var(--color-orange-800)";
      case "rejected":
        return "var(--color-red-800)";
      default:
        return "var(--color-grey-800)";
    }
  }};
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  background: var(--color-grey-0);
  color: var(--color-grey-600);
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 0.5rem;
  z-index: 9999999 !important;
  &:hover {
    background: var(--color-grey-100);
    color: var(--color-grey-800);
  }

  &.edit:hover {
    background: var(--color-blue-100);
    color: var(--color-blue-600);
    border-color: var(--color-blue-200);
  }

  &.delete:hover {
    background: var(--color-red-100);
    color: var(--color-red-600);
    border-color: var(--color-red-200);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: var(--color-grey-500);
  font-size: 1.6rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background: var(--color-grey-50);
  border-top: 1px solid var(--color-grey-200);
`;

const PaginationInfo = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const PaginationButton = styled.button`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  background: var(--color-grey-0);
  color: var(--color-grey-700);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: var(--color-grey-100);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ModalContent = styled.div`
  width: 80%;
  max-height: 90vh;
  z-index: 9999999;
`;

const FormSection = styled.div`
  margin-bottom: 3rem;
  width: 100%;
`;

const SectionTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-grey-800);
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid var(--color-grey-200);
`;

const FormGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 2.5rem;
  margin-bottom: 2.5rem;
`;

const SpecializationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 1.5rem;
`;

const ToggleSwitch = styled.label`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--color-grey-700);
  padding: 1rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-grey-50);
  }
`;

const Switch = styled.input`
  position: relative;
  width: 5rem;
  height: 2.5rem;
  appearance: none;
  background: var(--color-grey-300);
  border-radius: 1.25rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:checked {
    background: var(--color-brand-500);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    width: 2rem;
    height: 2rem;
    background: white;
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:checked::before {
    transform: translateX(2.5rem);
  }
`;

const FileUploadArea = styled.div`
  border: 2px dashed var(--color-grey-300);
  border-radius: var(--border-radius-md);
  padding: 3rem;
  text-align: center;
  background: var(--color-grey-50);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--color-brand-500);
    background: var(--color-brand-50);
  }
`;

const FileUploadText = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  margin-bottom: 1rem;
`;

const FileUploadButton = styled.button`
  background: var(--color-brand-500);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: var(--border-radius-sm);
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-brand-600);
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 1.2rem 1.5rem;
  border: 2px solid var(--color-grey-300);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);
  color: var(--color-grey-800);
  font-size: 1.5rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--color-brand-500);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    background-color: var(--color-grey-100);
    color: var(--color-grey-600);
    cursor: not-allowed;
  }

  &::placeholder {
    color: var(--color-grey-500);
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 1.2rem 1.5rem;
  border: 2px solid var(--color-grey-300);
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-0);
  color: var(--color-grey-800);
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--color-brand-500);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:hover {
    border-color: var(--color-grey-400);
  }

  option {
    padding: 1rem;
    font-size: 1.4rem;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 9999999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalWrapper = styled.div`
  background: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  width: 95vw;
  max-width: 120rem;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 4rem;
  z-index: 9999999;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: none;
  border: none;
  font-size: 2.4rem;
  color: var(--color-grey-600);
  cursor: pointer;
  z-index: 9999999;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:hover {
    background: var(--color-grey-100);
    color: var(--color-grey-800);
  }
`;

const SimpleModal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        {children}
      </ModalWrapper>
    </ModalOverlay>
  );
};

SimpleModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

function NewRequest() {
  const [activeFilter, setActiveFilter] = useState("under_review");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEntries, setShowEntries] = useState(10);

  // Form state
  const [formData, setFormData] = useState({
    serialNumber: "001",
    reviewNumber: "00",
    requestDate: "2025-09-22T22:53:58",
    sector: "",
    project: "",
    form: "",
    specializations: {
      civil: false,
      architectural: false,
      mechanical: false,
      electrical: false,
      agricultural: false,
      surveying: false,
      general: false,
    },
  });

  // Dummy data for requests
  const requestsData = [
    {
      id: 1,
      serialNumber: "001",
      reviewNumber: "00",
      requestDate: "2025-09-22",
      sector: "الزراعة",
      project: "مشروع تطوير المزارع",
      form: "طلب استشارة",
      responsible: "أحمد محمد",
      currentTask: "مراجعة الطلب",
      status: "under_review",
    },
    {
      id: 2,
      serialNumber: "002",
      reviewNumber: "01",
      requestDate: "2025-09-21",
      sector: "التعليم",
      project: "تطوير المناهج",
      form: "طلب مشروع",
      responsible: "فاطمة علي",
      currentTask: "تحليل المتطلبات",
      status: "accepted",
    },
    {
      id: 3,
      serialNumber: "003",
      reviewNumber: "02",
      requestDate: "2025-09-20",
      sector: "الصحة",
      project: "نظام إدارة المستشفيات",
      form: "طلب تطوير",
      responsible: "محمد السعد",
      currentTask: "إعداد التقرير",
      status: "accepted_with_notes",
    },
  ];

  const filterTabs = [
    {
      id: "under_review",
      label: "طلبات تحت الدراسة",
      color: "#F59E0B",
      count: 8,
    },
    { id: "accepted", label: "طلبات مقبولة", color: "#10B981", count: 156 },
    {
      id: "accepted_with_notes",
      label: "طلبات مقبولة مع ملاحظات",
      color: "#6B7280",
      count: 12,
    },
    { id: "resubmit", label: "طلبات يعاد تقديمها", color: "#3B82F6", count: 5 },
    { id: "rejected", label: "طلبات مرفوضة", color: "#EF4444", count: 24 },
  ];

  const getStatusLabel = (status) => {
    const statusMap = {
      under_review: "تحت الدراسة",
      accepted: "مقبول",
      accepted_with_notes: "مقبول مع ملاحظات",
      resubmit: "يعاد تقديمه",
      rejected: "مرفوض",
    };
    return statusMap[status] || status;
  };

  const filteredRequests = requestsData.filter(
    (request) =>
      request.status === activeFilter &&
      (request.serialNumber.includes(searchTerm) ||
        request.project.includes(searchTerm) ||
        request.responsible.includes(searchTerm))
  );

  // Form handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSpecializationChange = (specialization, checked) => {
    setFormData((prev) => ({
      ...prev,
      specializations: {
        ...prev.specializations,
        [specialization]: checked,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your API
    setIsModalOpen(false);
    // Reset form or show success message
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Optionally reset form data
    setFormData({
      serialNumber: "001",
      reviewNumber: "00",
      requestDate: "2025-09-22T22:53:58",
      sector: "",
      project: "",
      form: "",
      specializations: {
        civil: false,
        architectural: false,
        mechanical: false,
        electrical: false,
        agricultural: false,
        surveying: false,
        general: false,
      },
    });
  };

  return (
    <Container>
      <Row type="horizontal">
        <Heading as="h1">قائمة طلباتي</Heading>
        <Button onClick={() => setIsModalOpen(true)}>
          <HiOutlinePlus style={{ marginLeft: "0.5rem" }} />
          إضافة طلب جديد
        </Button>
      </Row>

      <FilterTabs>
        {filterTabs.map((tab) => (
          <FilterTab
            key={tab.id}
            active={activeFilter === tab.id}
            onClick={() => setActiveFilter(tab.id)}
          >
            <TabIndicator color={tab.color} />
            <span>{tab.label}</span>
            <TabCount active={activeFilter === tab.id}>{tab.count}</TabCount>
          </FilterTab>
        ))}
      </FilterTabs>

      <SearchContainer>
        <SearchInput>
          <SearchIcon>
            <HiOutlineMagnifyingGlass />
          </SearchIcon>
          <SearchField
            type="text"
            placeholder="ابحث..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInput>
        <ShowSelect>
          <span>أظهر</span>
          <Select
            value={showEntries}
            onChange={(e) => setShowEntries(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Select>
          <span>مدخلات</span>
        </ShowSelect>
      </SearchContainer>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>
                تعديل
                <SortIcon>
                  <HiOutlineChevronUpDown />
                </SortIcon>
              </TableHeader>
              <TableHeader>
                الإجراء
                <SortIcon>
                  <HiOutlineChevronUpDown />
                </SortIcon>
              </TableHeader>
              <TableHeader>
                رقم تسلسل الطلب
                <SortIcon>
                  <HiOutlineChevronUpDown />
                </SortIcon>
              </TableHeader>
              <TableHeader>
                تاريخ الطلب
                <SortIcon>
                  <HiOutlineChevronUpDown />
                </SortIcon>
              </TableHeader>
              <TableHeader>
                نوع الطلب
                <SortIcon>
                  <HiOutlineChevronUpDown />
                </SortIcon>
              </TableHeader>
              <TableHeader>
                المهمة الحالية
                <SortIcon>
                  <HiOutlineChevronUpDown />
                </SortIcon>
              </TableHeader>
              <TableHeader>
                المسؤول
                <SortIcon>
                  <HiOutlineChevronUpDown />
                </SortIcon>
              </TableHeader>
              <TableHeader>
                اسم المشروع
                <SortIcon>
                  <HiOutlineChevronUpDown />
                </SortIcon>
              </TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <ActionButton className="edit">
                      <HiOutlinePencil />
                    </ActionButton>
                    <ActionButton className="delete">
                      <HiOutlineTrash />
                    </ActionButton>
                  </TableCell>
                  <TableCell>
                    <ActionButton>
                      <HiOutlineEye />
                    </ActionButton>
                  </TableCell>
                  <TableCell>{request.serialNumber}</TableCell>
                  <TableCell>{request.requestDate}</TableCell>
                  <TableCell>
                    <StatusBadge status={request.status}>
                      {getStatusLabel(request.status)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>{request.currentTask}</TableCell>
                  <TableCell>{request.responsible}</TableCell>
                  <TableCell>{request.project}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="8">
                  <EmptyState>ليست هناك بيانات متاحة في الجدول</EmptyState>
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </Table>
      </TableContainer>

      <PaginationContainer>
        <PaginationInfo>
          يعرض 0 إلى {filteredRequests.length} من أصل {filteredRequests.length}{" "}
          سجل
        </PaginationInfo>
        <PaginationButtons>
          <PaginationButton disabled>السابق</PaginationButton>
          <PaginationButton disabled>التالي</PaginationButton>
        </PaginationButtons>
      </PaginationContainer>

      <SimpleModal open={isModalOpen} onClose={handleModalClose}>
        <ModalContent>
          <Heading
            as="h2"
            style={{ marginBottom: "3rem", textAlign: "center" }}
          >
            انشاء / تعديل الطلبات
          </Heading>

          <form onSubmit={handleSubmit}>
            <FormSection>
              <SectionTitle>البيانات الاساسية</SectionTitle>
              <FormGrid>
                <FormRow label="رقم التسلسل">
                  <StyledInput
                    type="text"
                    value={formData.serialNumber}
                    readOnly
                    style={{ backgroundColor: "var(--color-grey-100)" }}
                  />
                </FormRow>
                <FormRow label="رقم المراجعة">
                  <StyledInput
                    type="text"
                    value={formData.reviewNumber}
                    readOnly
                    style={{ backgroundColor: "var(--color-grey-100)" }}
                  />
                </FormRow>
                <FormRow label="تاريخ الطلب *">
                  <StyledInput
                    type="datetime-local"
                    value={formData.requestDate}
                    onChange={(e) =>
                      handleInputChange("requestDate", e.target.value)
                    }
                    required
                  />
                </FormRow>
              </FormGrid>

              <FormGrid>
                <FormRow label="القطاع *">
                  <StyledSelect
                    value={formData.sector}
                    onChange={(e) =>
                      handleInputChange("sector", e.target.value)
                    }
                    required
                  >
                    <option value="">أختر القطاع</option>
                    <option value="agriculture">الزراعة</option>
                    <option value="education">التعليم</option>
                    <option value="health">الصحة</option>
                    <option value="technology">التكنولوجيا</option>
                  </StyledSelect>
                </FormRow>
                <FormRow label="المشروع *">
                  <StyledSelect
                    value={formData.project}
                    onChange={(e) =>
                      handleInputChange("project", e.target.value)
                    }
                    required
                  >
                    <option value="">أختر المشروع</option>
                    <option value="project1">مشروع تطوير المزارع</option>
                    <option value="project2">تطوير المناهج</option>
                    <option value="project3">نظام إدارة المستشفيات</option>
                  </StyledSelect>
                </FormRow>
                <FormRow label="النموذج *">
                  <StyledSelect
                    value={formData.form}
                    onChange={(e) => handleInputChange("form", e.target.value)}
                    required
                  >
                    <option value="">أختر النموذج</option>
                    <option value="consultation">طلب استشارة</option>
                    <option value="project">طلب مشروع</option>
                    <option value="development">طلب تطوير</option>
                  </StyledSelect>
                </FormRow>
              </FormGrid>

              <FormRow label="التخصص : *">
                <SpecializationGrid>
                  <ToggleSwitch>
                    <Switch
                      type="checkbox"
                      checked={formData.specializations.civil}
                      onChange={(e) =>
                        handleSpecializationChange("civil", e.target.checked)
                      }
                    />
                    <span>مدني</span>
                  </ToggleSwitch>
                  <ToggleSwitch>
                    <Switch
                      type="checkbox"
                      checked={formData.specializations.architectural}
                      onChange={(e) =>
                        handleSpecializationChange(
                          "architectural",
                          e.target.checked
                        )
                      }
                    />
                    <span>معماري</span>
                  </ToggleSwitch>
                  <ToggleSwitch>
                    <Switch
                      type="checkbox"
                      checked={formData.specializations.mechanical}
                      onChange={(e) =>
                        handleSpecializationChange(
                          "mechanical",
                          e.target.checked
                        )
                      }
                    />
                    <span>ميكانيكا</span>
                  </ToggleSwitch>
                  <ToggleSwitch>
                    <Switch
                      type="checkbox"
                      checked={formData.specializations.electrical}
                      onChange={(e) =>
                        handleSpecializationChange(
                          "electrical",
                          e.target.checked
                        )
                      }
                    />
                    <span>كهرباء</span>
                  </ToggleSwitch>
                  <ToggleSwitch>
                    <Switch
                      type="checkbox"
                      checked={formData.specializations.agricultural}
                      onChange={(e) =>
                        handleSpecializationChange(
                          "agricultural",
                          e.target.checked
                        )
                      }
                    />
                    <span>زراعي</span>
                  </ToggleSwitch>
                  <ToggleSwitch>
                    <Switch
                      type="checkbox"
                      checked={formData.specializations.surveying}
                      onChange={(e) =>
                        handleSpecializationChange(
                          "surveying",
                          e.target.checked
                        )
                      }
                    />
                    <span>مساحة</span>
                  </ToggleSwitch>
                  <ToggleSwitch>
                    <Switch
                      type="checkbox"
                      checked={formData.specializations.general}
                      onChange={(e) =>
                        handleSpecializationChange("general", e.target.checked)
                      }
                    />
                    <span>عام</span>
                  </ToggleSwitch>
                </SpecializationGrid>
              </FormRow>
            </FormSection>

            <FormSection>
              <SectionTitle>رفع الملفات</SectionTitle>
              <FileUploadArea>
                <FileUploadText>أختر الملف</FileUploadText>
                <FileUploadButton type="button">اضافة ملفات</FileUploadButton>
              </FileUploadArea>
            </FormSection>

            <Row
              type="horizontal"
              style={{ justifyContent: "center", marginTop: "3rem" }}
            >
              <Button
                type="button"
                variation="secondary"
                onClick={handleModalClose}
              >
                إلغاء
              </Button>
              <Button type="submit">انشاء</Button>
            </Row>
          </form>
        </ModalContent>
      </SimpleModal>
    </Container>
  );
}

export default NewRequest;
