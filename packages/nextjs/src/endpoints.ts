// TODO - Catch All Endpoints


function 

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
    push: {
      post: () => {
        return {
          status: 200,
          body: "Hello World",
        };
      },
    },
    pull: {
      get: () => {
        return {
          status: 200,
          body: "Hello World",
        };
      },
    },
    sync: {
      post: () => {
        return {
          status: 200,
          body: "Hello World",
        };
      },
    },
    cache: {
      get: {
        post: () => {
          return {
            status: 200,
            body: "Hello World",
          };
        },
      },
      set: {
        post: () => {
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
