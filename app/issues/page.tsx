import React from "react";
import { Button, Badge, Table, DropdownMenu } from "@radix-ui/themes";
import Link from "next/link";
import { Issue } from "@prisma/client";

const IssuesPage = async () => {
  const response = await fetch("http://localhost:3000/api/issues");
  const issues = await response.json();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "OPEN":
        return (
          <Badge color="red" className="font-bold">
            Open
          </Badge>
        );
      case "CLOSED":
        return <Badge color="green">Closed</Badge>;

      case "IN_PROGRESS":
        return <Badge color="purple">In progress</Badge>;
      default:
        return (
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
            Unknown
          </span>
        );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="outline" color="gray">
                Filter
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
        </div>
        <div>
          <Button>
            <Link href="/issues/new">New Issue</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-5 mt-5">
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body className="divide-y divide-gray-200">
            {issues.map((issue: Issue) => (
              <Table.Row key={issue.id} className="hover:bg-gray-50">
                <Table.RowHeaderCell>{issue.title}</Table.RowHeaderCell>
                <Table.Cell>{getStatusBadge(issue.status)}</Table.Cell>
                <Table.Cell>
                  {new Date(issue.createdAt).toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
};

export default IssuesPage;
