import styled from "styled-components";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function BudgetPlanning() {
  return (
    <Container>
      <Row type="horizontal">
        <Heading as="h1">تخطيط الميزانية</Heading>
      </Row>

      <Row>
        <p>تخطيط وإدارة ميزانية المشاريع.</p>
        {/* Add your budget planning components here */}
      </Row>
    </Container>
  );
}

export default BudgetPlanning;
