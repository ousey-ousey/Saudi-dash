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

function Schedules() {
  return (
    <Container>
      <Row type="horizontal">
        <Heading as="h1">الجداول الزمنية</Heading>
      </Row>

      <Row>
        <p>الجداول الزمنية للمشاريع والمهام المختلفة.</p>
        {/* Add your schedules components here */}
      </Row>
    </Container>
  );
}

export default Schedules;
