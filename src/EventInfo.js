import React from "react";

function EventInfo({ event }) {
  console.log(event);
  return event ? (
    <div>
      {event.logo ? <img src={event.logo.url} /> : null}
      {event.start ? <p>{event.start.toLocaleString()}</p> : null}
      <h1>
        <a href={event.url}>{event.title}</a>
      </h1>
      <p>{event.summary}</p>
      <p>capacity: {event.capacity}</p>
    </div>
  ) : null;
}

export default EventInfo;
