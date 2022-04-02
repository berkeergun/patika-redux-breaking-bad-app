import { useParams, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";
import { quotesSelector } from "../../redux/quotesSlice";

function QuoteDetail() {
  const { quote_id } = useParams();
  const items = useSelector(quotesSelector);
  const quote = items.find((item) => item.quote_id === Number(quote_id));

  if (!quote) {
    return <Redirect to="/quotes" />;
  }

  return (
    <div style={{ padding: "10px" }}>
      <h1
        style={{
          textAlign: "center",
          color: "#8360c3",
          fontWeight: "bold",
          textShadow: "2px 2px 4px #fff",
        }}
      >
        Quote Details
      </h1>
      {
        <div>
          <h4 style={{ textAlign: "center", textDecoration: "underline" }}>
            Series: {quote.series}
          </h4>
          <div style={{display:"flex",flexDirection:"column", margin: "20px", textAlign: "center" }}>
            <q
              style={{
                color: "black",
                fontStyle: "italic",
                fontSize: "45px",
                margin: "20px",
                fontWeight: "bold",
                textShadow: "5px 5px 3px #8360c3",
              }}
            >
              {quote.quote}
            </q>
            <strong style={{
                color: "black",
                fontStyle: "italic",
                fontSize: "45px",
                margin: "20px",
                fontWeight: "bold",
                textShadow: "5px 5px 3px #8360c3",
              }}>{quote.author}</strong>
          </div>
        </div>
      }

      {/* <pre>{JSON.stringify(quote, null, 2)}</pre> */}
    </div>
  );
}

export default QuoteDetail;
