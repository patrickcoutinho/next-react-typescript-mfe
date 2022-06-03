import dynamic from "next/dynamic";
import Router from "next/router";
import React from "react";

const RemotePage: any = dynamic(() => import("remote/Page"), {
  ssr: false,
});

export default function FederatedPage() {
  const [user, setUser] = React.useState<any>();

  return (
    <RemotePage
      user={user}
      setUser={setUser}
      onGoHome={() => Router.push("/")}
    />
  );
}
