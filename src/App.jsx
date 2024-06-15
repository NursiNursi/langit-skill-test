import UserList from "./components/UserList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<UserList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
