"use client";
import {
  Badge,
  Heading,
  TextArea,
  DropdownMenu,
  Button,
} from "@radix-ui/themes";
import { FaRegEdit } from "react-icons/fa";
import Spinner from "@/app/components/Spinner";
import { Text } from "@radix-ui/themes/components/callout";
import { useState } from "react";
import { Issue } from "@prisma/client";
import { set } from "zod";
import { useRouter } from "next/navigation";

const IssueDetailClient = ({ issueDetails }: { issueDetails: Issue }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState(issueDetails.title);

  const [description, setDescription] = useState(issueDetails.description);

  const handleSave = async () => {
    setIsSaving(true);
    const res = await fetch(
      `http://localhost:3000/api/issues/details/${issueDetails.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          ...issueDetails,
          description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      setIsEditing(false);
    } else {
      setIsSaving(false);
      console.error("Failed to save changes");
    }
  };

  const handleDelete = async () => {
    const res = await fetch(
      `http://localhost:3000/api/issues/details/${issueDetails.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      router.push("/issues");
      console.log("Issue deleted successfully");
    } else {
      console.error("Failed to delete issue");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-10 mt-3">
      {/* Left Side – 60% width */}
      <div className="w-full md:w-3/4 flex flex-col gap-3">
        {isEditing ? (
          <TextArea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-bold border border-gray-300 rounded px-3 py-2 w-full"
          />
        ) : (
          <Text size="7" className="mb-3 font-bold">
            {title}
          </Text>
        )}

        <div className="flex items-center space-x-3">
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
          defaultValue={description}
          readOnly={!isEditing}
          onChange={(e) => setDescription(e.target.value)}
          onClick={() => setIsEditing(true)}
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
          <DropdownMenu.Content>
            <DropdownMenu.Item>All</DropdownMenu.Item>
            <DropdownMenu.Item>Open</DropdownMenu.Item>
            <DropdownMenu.Item>In progress</DropdownMenu.Item>
            <DropdownMenu.Item>Closed</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <Button
          color="violet"
          className="w-full"
          onClick={() => setIsEditing(true)}
        >
          <FaRegEdit />
          Edit Issue
        </Button>

        <Button color="red" className="w-full" onClick={handleDelete}>
          Delete Issue
        </Button>
        {isEditing && (
          <div className="flex justify-between mt-3">
            <Button
              variant="outline"
              color="gray"
              className="text-black"
              onClick={handleSave}
            >
              Save{isSaving && <Spinner />}
            </Button>
            <Button
              variant="outline"
              color="red"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueDetailClient;
