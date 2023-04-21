import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppContextProvider(Component) {
  return function Context(props) {
    const [member, setMember] = useState({});
    const drone = new window.Scaledrone("DPTIAelCAPjcSm6a", {data: member});

    return (
      <AppContext.Provider
        value={{
          member,
          setMember,
          drone,
        }}
      >
        <Component {...props} />
      </AppContext.Provider>
    );
  };
}
