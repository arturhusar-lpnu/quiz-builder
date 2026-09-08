import type { FC } from "react";
import { Link } from "react-router-dom";
import { PageStatus } from "@/components/shared/page-status/PageStatus";

const NotFoundPage: FC = () => {
  return (
    <PageStatus
      variant="not-found"
      title="We can’t find that page"
      message="The page may have moved, or the link you followed is no longer available."
      action={<Link to="/">Back to quizzes</Link>}
    />
  );
};

export default NotFoundPage;
