import React from "react";
import buildClient from "../api/build-client";

function LandingPage({ currentUser }) {
  // console.log("current user: ", currentUser);
  return (
    <div>
      <h1>Landing Page</h1>
    </div>
  );
}

// LandingPage.getInitialProps = async (context) => {
//   const client = buildClient(context);
//   const { data } = await client.get("/api/users/currentuser");

//   console.log("Landing data:", data);
//   return { currentUser: data };
// };

export default LandingPage;
