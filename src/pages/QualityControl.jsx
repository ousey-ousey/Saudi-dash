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

function QualityControl() {
  return (
    <Container>
      <Row type="horizontal">
        <Heading as="h1">مراقبة الجودة</Heading>
      </Row>

      <Row>
        <p>نظام مراقبة الجودة وضمان المعايير.</p>
        {/* Add your quality control components here */}
      </Row>
    </Container>
  );
}

export default QualityControl;
