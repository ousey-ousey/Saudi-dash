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

function RisksLog() {
  usePageTitle("سجل المخاطر");
  return (
    <Container>
      <Row type="horizontal">
        <Heading as="h1">سجل المخاطر</Heading>
      </Row>

      <Row>
        <p>سجل المخاطر المحتملة والإجراءات المتخذة للتعامل معها.</p>
        {/* Add your risks log components here */}
      </Row>
    </Container>
  );
}

export default RisksLog;
