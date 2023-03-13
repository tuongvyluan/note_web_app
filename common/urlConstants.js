export default {
  endpoints: {
    notes: {
      base: '/notes',
      uri: {
        update: '/{noteId}',
      },
    },
    cards: {
      base: '/cards',
      uri: {
        getByNote: '/{noteId}?sortType={sortType}&isAsc={isAsc}',
      },
    },
    tasks: {
      base: '/tasks',
      uri: {
        getAll: '?orderBy={orderBy}&isAsc={isAsc}&dateFrom={dateFrom}&dateTo={dateTo}',
        delete: '?id={id}',
      },
    },
    taskItems: {
      base: '/tasks/taskitems',
      uri: {
        delete: '?id={id}',
      },
    },
    todo: {
      base: '/todo',
    },
    login: {
      base: '/login',
    },
    users: {
      base: '/users',
      uri: {
        CREATE: '/create',
      },
    },
  },
}
