import React, { useState, useEffect } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import { useLocation } from "react-router-dom";
import { fetchUser, fetchOrgs } from "./apiUtil";
import styled from "styled-components";
import moment from "moment";

//styled components
const Container = styled.div`
  width: 100vw;
  height: 90vh;
  background-color: cornflowerblue;
  display: flex;
`;
const Header = styled.div`
  width: 100vw;
  height: 10vh;
  background-color: cornflowerblue;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;
const TitleBar = styled.h2`
  font-size: 40pt;
  color: white;
  font-weight: bolder;
`;
const Main = styled.div`
  margin: 20px;
  width: 100%;
  background-color: white;
`;
const SideBar = styled.div`
  width: 40%;
  background-color: cornflowerblue;
  display: flex;
  align-items: stretch;
`;
const EventPanel = styled.div`
  margin: 20px;
  background-color: lightgrey;
  width: 100%;
  border-radius: 5px;
  padding: 8px;
`;
let allViews = Object.keys(Views).map(k => Views[k]);
const localizer = momentLocalizer(moment);
const selectEvent = e => {
  console.log(e);
};

function EventTool() {
  let { hash } = useLocation();
  let [events, setEvents] = useState([]);
  let token = hash.split("=")[2];
  useEffect(() => {
    async function apiCalls(key) {
      let userData = await fetchUser(key);
      let orgData = await fetchOrgs(userData.id, key);
      let orgIds = orgData.organizations.map(org => org.id);
      async function fetchEvents(orgIds, token) {
        let urls = orgIds.map(id =>
          fetch(
            `https://www.eventbriteapi.com/v3/organizations/${id}/events/?token=${token}&status=live`
          )
        );
        Promise.all(urls).then(promises => {
          Promise.all(promises.map(res => res.json())).then(data => {
            let eventsArray = [];
            data.forEach(array => {
              eventsArray = eventsArray.concat(array.events);
              eventsArray = eventsArray.map(event => {
                return {
                  ...event,
                  title: event.name.text,
                  start: new Date(event.start.local),
                  end: new Date(event.end.local)
                };
              });
            });
            setEvents(eventsArray);
          });
        });
      }
      fetchEvents(orgIds, key);
    }
    if (token) {
      apiCalls(token);
    }
  }, [token]);
  return (
    <>
      <Header>
        <TitleBar>Event Tool</TitleBar>
      </Header>
      <Container>
        <Main>
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            showMultiDayTimes
            step={60}
            views={allViews}
            defaultView="month"
            events={events}
            onSelectEvent={selectEvent}
            style={{ borderRadius: "5px" }}
          />
        </Main>
        <SideBar>
          <EventPanel>test</EventPanel>
        </SideBar>
      </Container>
    </>
  );
}

export default EventTool;
