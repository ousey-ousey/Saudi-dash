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

function QualityReports() {
  return (
    <Container>
      <Row type="horizontal">
        <Heading as="h1">تقارير الجودة</Heading>
      </Row>

      <Row>
        <p>التقارير التفصيلية حول معايير الجودة والأداء.</p>
        {/* Add your quality reports components here */}
      </Row>
    </Container>
  );
}

export default QualityReports;
