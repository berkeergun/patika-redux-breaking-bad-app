import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

function Detail() {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(true);
  const { char_id } = useParams();

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/characters/${char_id}`)
      .then((res) => res.data)
      .then((data) => setChar(data[0]))
      .finally(() => setLoading(false));
  }, [char_id]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      {loading && <Loading />}
      {char && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <div>
            <h2
              style={{
                color:"#000",
                textAlign: "center",
                fontWeight: "bold",
                textShadow: "5px 5px 10px #fff",
              }}
            >
              {char.name}
            </h2>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={char.img}
                alt={char.name}
                style={{
                  width: "300px",
                  borderRadius: "30px",
                  boxShadow: "5px 10px 1px 1px rgba(0, 0, 0, 0.4)",
                }}
              />
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              margin: "20px",
              backgroundColor: "#a8ff7850",
              borderRadius: "10px",
              boxShadow: "5px 10px 1px 1px rgba(0, 0, 0, 0.4)",
            }}
          >
            <h4 style={{ textAlign: "center", textDecoration: "underline" }}>
              Series: {char.category}
            </h4>
            <br />
            <div style={{ fontStyle: "italic" }}>
              <strong>Nickname:</strong> {char.nickname}
            </div>
            <br />
            <strong>Birthday:</strong> {char.birthday}
            <br />
            <br />
            <strong>Occupation/Job:</strong>{" "}
            {char.occupation.map((item, key) => (
              <div key={key}>{item}</div>
            ))}
            <br />
            <strong>Status: </strong>
            {char.status}
            <br />
            <br />
            <h4>Portrayed by: {char.portrayed}</h4>
          </div>
        </div>
      )}
      {/* {char && <pre>{JSON.stringify(char, null, 2)}</pre>} */}
    </div>
  );
}

export default Detail;
