// "use client";

// import { Provider } from "react-redux";
// import { makeStore } from "./store";

// export default function ReduxProvider({
//   children,
//   preloadedState,
// }: {
//   children: React.ReactNode;
//   preloadedState?: { auth: { token: string | null } }
// }) {
//   const store = makeStore(preloadedState);
//   return <Provider store={store}>{children}</Provider>;
// }
"use client";

import { Provider } from "react-redux";
import { makeStore } from "./store";

interface PreloadedState {
  auth?: { token: string | null };
  user?: {
    id: string | null;
    email: string | null;
    royalId: string | null;
  };
}

export default function ReduxProvider({
  children,
  preloadedState,
}: {
  children: React.ReactNode;
  preloadedState?: PreloadedState;
}) {
  const store = makeStore(preloadedState);
  return <Provider store={store}>{children}</Provider>;
}
