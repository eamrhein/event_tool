import "css-reset-and-normalize";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { apikey } from "./apiKey";
import EventTool from "./EventTool";

function Login() {
  let url = `https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=${apikey}&redirect_uri=http://localhost:3000/event/`;
  return (
    <div>
      <a href={url}>Login</a>
    </div>
  );
}
function App() {
  return (
    <BrowserRouter>
      <Route exact path="/event" component={EventTool} />
      <Route path="/" component={Login} />
    </BrowserRouter>
  );
}

export default App;
