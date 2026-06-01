const TOKEN = "641549ed-ccaf-4883-b908-20b4049650ce";

// Try to get user info and publications
fetch("https://gql.hashnode.com", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: TOKEN,
  },
  body: JSON.stringify({
    query: `{
      me {
        id
        username
        name
        publications(first: 10) {
          edges {
            node {
              id
              title
              url
            }
          }
        }
      }
    }`,
  }),
})
  .then((r) => {
    console.log("Status:", r.status);
    return r.text();
  })
  .then((text) => {
    try {
      const d = JSON.parse(text);
      const me = d?.data?.me;
      if (me) {
        console.log(`Username: ${me.username}`);
        console.log(`Name: ${me.name}`);
        const pubs = me.publications?.edges;
        if (pubs?.length > 0) {
          pubs.forEach(({ node }) => {
            console.log(`\nPublication:`);
            console.log(`  ID:    ${node.id}`);
            console.log(`  Title: ${node.title}`);
            console.log(`  URL:   ${node.url}`);
          });
        } else {
          console.log("No publications found — you may need to create a blog on Hashnode first.");
        }
      } else {
        console.log("Response:", JSON.stringify(d, null, 2));
      }
    } catch {
      console.log("Raw response:", text.substring(0, 500));
    }
  })
  .catch((e) => console.error(e.message));
