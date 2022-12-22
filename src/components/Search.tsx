import classes from "./Search.module.css";

type SearchProps = {
  loadUser: (username: string) => Promise<void>;
};
import { useState, KeyboardEvent } from "react";
import { BsSearch } from "react-icons/bs";

const Search = ({ loadUser }: SearchProps) => {
  const [userName, setUserName] = useState("");

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      loadUser(userName);
      setUserName("");
    }
  };
  const resetInput = () => {
    setUserName("");
  };
  return (
    <div className={classes.search}>
      <h2>Busque por um usuário:</h2>
      <p>Conheça seus melhores repositórios</p>
      <div className={classes.search_container}>
        <input
          type="text"
          placeholder="Digite o nome do usuário"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKeyDown}
          value={userName}
        />
        <button
          onClick={() => {
            loadUser(userName);
            resetInput();
          }}
        >
          <BsSearch />
        </button>
      </div>
    </div>
  );
};

export default Search;
