---
index: 2
group: "Getting Started"
title: "Installation"
description: "This is a test description"
---

    {/* <!-- <div>Do you need a Peer-To-Peer Synced Database?</div> --> */}

    {/* <!-- <div>Do you need a Local-Network Synced Database?</div> --> */}

    {/* <!-- <div>Do you need End-to-End Encryption?</div> --> */}

Here is my _great_ post!

/\*\*

- Returns reads from local database
  \*/
  function useDbQuery() {
  // return db.query.users.findMany()
  }

/\*\*

- Returns only incoming changes from local database
  \*/
  function useDbChanges() {
  // return db.query.users.findMany()
  }

/\*\*

- Returns subscription (query + changes) to local database
  \*/
  function useDbSubscription() {
  // return db.query.users.findMany()
  }
