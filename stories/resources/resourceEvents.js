/** @import  { Event, Resource } from 'react-big-calendar'  */
export default {
  /** @type {Event[]} */
  events: [
    {
      title: 'Rencontre',
      resourceId: 'a',
      start: new Date(2015, 3, 2, 5, 30, 0, 0),
      end: new Date(2015, 3, 2, 10, 30, 0, 0),
    },
    {
      title: 'Another Meeting',
      resourceId: 'b',
      start: new Date(2015, 3, 1, 2, 30, 0, 0),
      end: new Date(2015, 3, 1, 4, 30, 0, 0),
    },
    {
      title: 'A',
      resourceId: 'a',
      start: new Date(2015, 3, 4, 5, 30, 0, 0),
      end: new Date(2015, 3, 4, 10, 30, 0, 0),
    },
    {
      title: 'B',
      resourceId: 'b',
      start: new Date(2015, 3, 4, 5, 30, 0, 0),
      end: new Date(2015, 3, 4, 10, 30, 0, 0),
    },
    {
      title: 'C',
      resourceId: 'c',
      start: new Date(2015, 3, 4, 5, 30, 0, 0),
      end: new Date(2015, 3, 4, 10, 30, 0, 0),
    },
    // My testing
    {
      title: 'D',
      start: new Date(2024, 8, 28, 0, 0, 0),
      end: new Date(2024, 8, 29, 4, 30, 0),
      resourceId: 'd',
    },
    {
      title: 'Conflict with D',
      start: new Date(2024, 8, 28, 0, 0, 0),
      end: new Date(2024, 8, 29, 4, 30, 0),
      resourceId: 'd',
    },
    {
      title: 'Another Conflict with D',
      start: new Date(2024, 8, 28, 0, 0, 0),
      end: new Date(2024, 8, 29, 4, 30, 0),
      resourceId: 'd',
    },
    {
      title: 'E',
      start: new Date(2024, 8, 28, 0, 0, 0),
      end: new Date(2024, 8, 30, 4, 30, 0),
      resourceId: 'e',
    },
    {
      title: 'D2',
      start: new Date(2024, 8, 30, 0, 0, 0),
      end: new Date(2024, 9, 1, 4, 30, 0),
      resourceId: 'd',
    },
    {
      title: 'Conflict with D2',
      start: new Date(2024, 8, 30, 0, 0, 0),
      end: new Date(2024, 9, 1, 4, 30, 0),
      resourceId: 'd',
    },
    {
      title: 'E2',
      start: new Date(2024, 8, 30, 0, 0, 0),
      end: new Date(2024, 9, 1, 4, 30, 0),
      resourceId: 'e',
    },
    {
      title: 'Conflict with E2',
      start: new Date(2024, 8, 30, 0, 0, 0),
      end: new Date(2024, 9, 1, 4, 30, 0),
      resourceId: 'e',
    },
  ],
  /** @type {Resource[]} */
  list: [
    {
      id: 'a',
      title: 'Room A',
    },
    {
      id: 'b',
      title: 'Room B',
    },
    {
      id: 'c',
      title: 'Room C',
    },
    {
      id: 'e',
      title: 'Tag E',
    },
    {
      id: 'd',
      title: 'Tag D',
    },
  ],
}
