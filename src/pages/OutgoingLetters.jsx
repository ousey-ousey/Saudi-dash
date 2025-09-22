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

function OutgoingLetters() {
  return (
    <Container>
      <Row type="horizontal">
        <Heading as="h1">الخطابات الصادرة</Heading>
      </Row>

      <Row>
        <p>إدارة وتتبع الخطابات والمراسلات الصادرة.</p>
        {/* Add your outgoing letters components here */}
      </Row>
    </Container>
  );
}

export default OutgoingLetters;
