import { createContext, useContext, useState, useCallback } from "react";



export const StreamContext = createContext();

export const StreamProvider = ({ children }) => {
  const [stream, setStream] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null)

  const mockHash = (password) => `hashed_${password}_salt123`;

  const addUser = useCallback((user) => {
    const newUser = {
      ...user,
      id: Date.now().toString(),
      password: mockHash(user.password)
    };
    setStream(prev => [...prev, newUser]);
    return newUser;
  }, []);

  const findUser = useCallback((email, password) => {
    return stream.find(user => 
      user.email === email && 
      user.password === mockHash(password)
    );
  }, [stream]);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  return (
    <StreamContext.Provider 
      value={{ 
        stream, 
        currentUser,
        setCurrentUser,
        addUser, 
        findUser,
        logout,
        mockHash,
        selectedMovie,
        setSelectedMovie
      }}
    >
      {children}
    </StreamContext.Provider>
  );
};

export const useStreamContext = () => useContext(StreamContext);