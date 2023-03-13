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
