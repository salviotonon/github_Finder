import { UserProps } from "../types/user";
import User from "../components/User";
import Error from "../components/Error";

import Search from "../components/Search";
import { useState } from "react";
const Home = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState(false);
  const loadUser = async (username: string) => {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    if (res.status === 404) {
      setError(true);
      setUser(null);
      return;
    }
    if (res.status === 200) {
      setError(false);
    }
    const { avatar_url, login, location, followers, following } = data;
    const userData: UserProps = {
      avatar_url,
      login,
      location,
      followers,
      following,
    };
    setUser(userData);
  };
  return (
    <div>
      <Search loadUser={loadUser} />
      {user && <User {...user} />}
      {error && <Error />}
    </div>
  );
};

export default Home;
