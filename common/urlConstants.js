export default {
  endpoints: {
    notes: {
      base: '/notes',
      uri: {
        delete: '?id={id}',
      },
    },
    cards: {
      base: '/cards',
      uri: {
        getByNote: '?noteId={noteId}&orderBy={sortType}&isAsc={isAsc}',
        getById: '/{cardId}',
        deleteCard: '?id={cardId}',
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
