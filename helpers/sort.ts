import { Event } from "@prisma/client";

const sortEvents = (arr: Event[], sorter: number | string): Event[] => {
  let sortedArr: Event[];
  if (sorter.toString().toLowerCase().includes("tickets")) {
    sortedArr = arr.sort((a, b) => a.tickets - b.tickets);
  } else if (sorter.toString().toLowerCase() === "date") {
    sortedArr = [...arr].sort(
      (a, b) => a.eventDate.getTime() - b.eventDate.getTime()
    );
  } else if (sorter.toString().toLowerCase() === "event") {
    sortedArr = arr.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      return titleA.localeCompare(titleB);
    });
  } else if (sorter.toString().toLowerCase() === "organizer") {
    sortedArr = arr.sort((a, b) => {
      const organizerA = a.organizerName.toLowerCase();
      const organizerB = b.organizerName.toLowerCase();
      return organizerA.localeCompare(organizerB);
    });
  } else if (sorter.toString().toLowerCase() === "location") {
    sortedArr = arr.sort((a, b) => {
      const locationA = a.location.toLowerCase();
      const locationB = b.location.toLowerCase();
      return locationA.localeCompare(locationB);
    });
  } else {
    sortedArr = arr;
  }

  return sortedArr;
};


export { sortEvents };