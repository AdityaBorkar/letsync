// TODO - Catch All Endpoints

const endpoints = {
  rest: {
    auth: {
      get() {
        return {
          status: 200,
          body: "Hello World",
        };
      },
      refresh: {
        get: () => {
          return {
            status: 200,
            body: "Hello World",
          };
        },
      },
      revoke: {
        get: () => {
          return {
            status: 200,
            body: "Hello World",
          };
        },
      },
    },
    devices: {
      register: {
        post: () => {
          return {
            status: 200,
            body: "Hello World",
          };
        },
      },
      deregister: {
        post: () => {
          return {
            status: 200,
            body: "Hello World",
          };
        },
      },
    },
  },
};

// Event Driven Architecture
// Subscribe/Unsubscribe events on client/server
