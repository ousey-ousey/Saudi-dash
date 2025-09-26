import Heading from "../ui/Heading";
import usePageTitle from "../hooks/usePageTitle";

function Settings() {
  // Set page title
  usePageTitle("الإعدادات");

  return <Heading as="h1">Update hotel settings</Heading>;
}

export default Settings;
