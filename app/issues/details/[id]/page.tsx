import {
  Badge,
  Heading,
  TextArea,
  DropdownMenu,
  Button,
} from "@radix-ui/themes";
import { Text } from "@radix-ui/themes/components/callout";

interface IssueProps {
  params: {
    id: string;
  };
}

const IssueDetailPage = async ({ params }: IssueProps) => {
  const response = await fetch(
    `http://localhost:3000/api/issues/details/${params.id}`
  );
  const issueDetails = await response.json();

  return (
    <div className="flex flex-col md:flex-row justify-between gap-10 mt-8">
      {/* Left Side – 60% width */}
      <div className="w-full md:w-3/4">
        <Heading size="7" className="mb-3">
          {issueDetails.title}
        </Heading>

        <div className="flex items-center space-x-3 mb-4">
          <Badge
            color={
              issueDetails.status === "OPEN"
                ? "red"
                : issueDetails.status === "CLOSED"
                ? "green"
                : "purple"
            }
          >
            {issueDetails.status}
          </Badge>
          <Text size="3" className="text-gray-600">
            {new Date(issueDetails.createdAt).toDateString()}
          </Text>
        </div>

        <TextArea
          className="w-full h-40 "
          defaultValue={issueDetails.description}
          readOnly
        />
      </div>

      <div className="w-full md:w-1/6 flex flex-col gap-4">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="outline" className="w-full">
              Unassigned
              <DropdownMenu.TriggerIcon />
            </Button>
          </DropdownMenu.Trigger>
        </DropdownMenu.Root>

        <Button color="indigo" className="w-full">
          Edit Issue
        </Button>

        <Button color="red" className="w-full">
          Delete Issue
        </Button>
      </div>
    </div>
  );
};

export default IssueDetailPage;
