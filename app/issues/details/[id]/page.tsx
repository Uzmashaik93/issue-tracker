import IssueDetailClient from "./issueDetailClient";

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
  return <IssueDetailClient issueDetails={issueDetails} />;
};

export default IssueDetailPage;
