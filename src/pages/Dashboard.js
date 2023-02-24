import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [userCred, setUserCred] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userCred = JSON.parse(localStorage.getItem("userCred"));
    setUserCred(userCred);
    setUser(user);
    console.log(user, userCred);
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
