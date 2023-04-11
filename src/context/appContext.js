import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppContextProvider(Component) {
  return function Context(props) {
    const [member, setMember] = useState({});
    const memberSet = (x, y) => {
      setMember({username: x, color: y})
    }

    return (
      <AppContext.Provider
        value={{
          member,
          memberSet,
        }}
      >
        <Component {...props} />
      </AppContext.Provider>
    );
  };
}
