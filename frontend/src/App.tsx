import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/app-header/AppLayout";
import { Loader } from "./components/shared/loader/Loader";
import NotFoundPage from "./pages/not-found/NotFoundPage";

const QuizDashboard = lazy(() => import("./pages/dashboard/QuizDashboard"));
const QuizCreatePage = lazy(() => import("./pages/create-quiz/QuizCreate"));
const QuizDetailPage = lazy(() => import("./pages/quiz-details/QuizDetails"));

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Suspense fallback={<Loader label="Loading page..." />}>
          <Routes>
            <Route path="/" element={<QuizDashboard />} />
            <Route path="/create" element={<QuizCreatePage />} />
            <Route path="/quizzes/:id" element={<QuizDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
