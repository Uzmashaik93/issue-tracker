import React from "react";
import { Box, Button, Card, Text, Badge } from "@radix-ui/themes";
import Link from "next/link";
import { Issue } from "@prisma/client";

const IssuesPage = async () => {
  const response = await fetch("http://localhost:3000/api/issues");
  const issues = await response.json();

  return (
    <div>
      <Button color="indigo" variant="soft">
        <Link href="/issues/new">New Issue</Link>
      </Button>

      <div className="flex flex-col space-y-5 mt-5">
        {issues.map((issue: Issue) => {
          return (
            <Box maxWidth="350px" key={issue.id}>
              <Card asChild>
                <div>
                  <Text as="div" size="4" weight="bold">
                    {issue.title}
                  </Text>
                  <Text as="div" size="2" color="gray">
                    {issue.description}
                  </Text>
                  <p className="text-xs font-light text-gray-500">
                    {issue.createdAt.toString()}
                  </p>
                  <Badge color="orange" className="mt-2 mb-2">
                    {issue.status}
                  </Badge>

                  <div className="flex gap-3">
                    <Button color="cyan" variant="soft">
                      Edit
                    </Button>
                    <Button color="crimson" variant="soft">
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            </Box>
          );
        })}
      </div>
    </div>
  );
};

export default IssuesPage;
