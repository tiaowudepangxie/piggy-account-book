import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import SignUpScreen from "./pages/SignUpScreen";


function App() {
  return (
    <Router>
      <Header />
      <Container className="mt-3">
        <Switch>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/signup" component={SignUpScreen} exact />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;