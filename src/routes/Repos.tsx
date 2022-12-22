import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { useParams, Link } from "react-router-dom";
import classes from "./Repos.module.css";
import { AiOutlineStar } from "react-icons/ai";

type Repository = {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: string;
};

function Repos() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const { login } = useParams();
  useEffect(() => {
    fetch(`https://api.github.com/users/${login}/repos`)
      .then((response) => response.json())
      .then((data) => {
        setRepositories(data);
        console.log(data);
      });
  }, []);

  return (
    <>
      <div className={classes.container_all}>
        <ul className={classes.container_repo}>
          <h1 className={classes.user}>Repositório de : {login}</h1>
          {repositories.map((repo) => {
            return (
              <li key={repo.name} className={classes.title_repo}>
                <a href={repo.html_url} className={classes.link}>
                  {repo.name}
                  <p className={classes.description}>{repo.description}</p>
                  <p className={classes.stars}>
                    <AiOutlineStar />
                    {repo.stargazers_count}
                  </p>
                </a>
                <div>
                  <a href={`${repo.html_url}`} className={classes.goRepo}>
                    <BsSearch />
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
        <Link to={"/"} className={classes.button}>
          voltar
        </Link>
      </div>
    </>
  );
}
export default Repos;
