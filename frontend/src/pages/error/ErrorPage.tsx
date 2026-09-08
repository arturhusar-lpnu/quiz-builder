import type { FC } from "react";
import { Link } from "react-router-dom";
import { PageStatus } from "@/components/shared/page-status/PageStatus";

interface Props {
  message?: string;
}

const ErrorPage: FC<Props> = ({
  message = "We couldn’t load this page right now. Please try again.",
}) => {
  return (
    <PageStatus
      variant="error"
      title="Something went wrong"
      message={message}
      action={
        <>
          <button type="button" onClick={() => window.location.reload()}>
            Try again
          </button>
          <Link to="/">Back to quizzes</Link>
        </>
      }
    />
  );
};

export default ErrorPage;
