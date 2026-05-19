import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import DayLesson from "./pages/DayLesson";
import SubjectView from "./pages/SubjectView";
import MockTest from "./pages/MockTest";
import Progress from "./pages/Progress";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/day/:dayId" element={<DayLesson />} />
          <Route path="/subject/:slug" element={<SubjectView />} />
          <Route path="/mock" element={<MockTest />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
