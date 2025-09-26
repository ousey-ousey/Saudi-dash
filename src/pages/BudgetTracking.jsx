import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import usePageTitle from "../hooks/usePageTitle";

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function BudgetTracking() {
  usePageTitle("تتبع الميزانية");
  return (
    <Container>
      <Row type="horizontal">
        <Heading as="h1">تتبع الميزانية</Heading>
      </Row>

      <Row>
        <p>تتبع ومراقبة استخدام الميزانية في المشاريع.</p>
        {/* Add your budget tracking components here */}
      </Row>
    </Container>
  );
}

export default BudgetTracking;
