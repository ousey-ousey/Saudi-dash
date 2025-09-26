import Heading from "../ui/Heading";
import usePageTitle from "../hooks/usePageTitle";

function NewUsers() {
  // Set page title
  usePageTitle("إدارة المستخدمين");

  return <Heading as="h1">Create a new user</Heading>;
}

export default NewUsers;
