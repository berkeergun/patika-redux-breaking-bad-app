import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters } from "../../redux/charactersSlice";
import Masonry from "react-masonry-css";
import "./styles.css";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.items);
  const nextPage = useSelector((state) => state.characters.page);
  const hasNextPage = useSelector((state) => state.characters.hasNextPage);
  const status = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCharacters());
    }
  }, [dispatch,status]);

  if (status === "failed") {
    return <Error message={error} />;
  }

  return (
    <div>
      <Masonry
        breakpointCols={4}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {characters.map((character) => (
          <div key={character.char_id}>
            <Link to={`/char/${character.char_id}`}>
              <img
                src={character.img}
                className="character"
                alt={character.name}
                style={{borderRadius:"5px"}}
              />
              <div className="char_name">Name: {character.name}</div>
              <li>Nickname: {character.nickname}</li>
              <li>Portrayed: {character.portrayed}</li>
            </Link>
          </div>
        ))}
      </Masonry>
      {status === "loading" && <Loading />}

      <div style={{ textAlign: "center", padding: "20px 0 40px 0" }}>
        {hasNextPage && status !== "loading" && (
          <button className="pagebutton" onClick={() => dispatch(fetchCharacters(nextPage))}>
            Load More ({nextPage})
          </button>
        )}
        {!hasNextPage && <strong style={{color:"#111"}}>There is nothing to be shown.</strong>}
      </div>
    </div>
  );
}

export default Home;
