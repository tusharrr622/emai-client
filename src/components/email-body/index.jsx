import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { addToFavorites, removeFromFavorites } from "../../redux";
import "../components-utility.css";
import "./email-body.css";
export const EmailBody = () => {
    const {
        bodyLoading,
        bodyLoadingError,
        emailBody: { id, body },
        initial,
        subject,
        date
    } = useSelector((state) => state.emailBody);
    const { favorites } = useSelector((state) => state.emailList);
    const dispatch = useDispatch();

    const bodyContent = body ? parse(body) : "";

    return (
        bodyLoading ? (
            <p>Retrieving email data...</p>
        ) : (
            bodyLoadingError ? (
                <p>Failed to retrieve email data.</p>
            ) : (
                <div className="email-body-wr email-container flex-row">
                    <div className="avatar flex-center">{initial}</div>

                    <div className="email-body flex-col">
                        <header className="email-body-header flex-row flex-justify-sb flex-align-center">
                            <h1 className="email-body-subject">{subject}</h1>
                            {
                                favorites.includes(id) ?
                                    <button
                                        className="email-body-btn"
                                        onClick={() => dispatch(removeFromFavorites(id))}
                                    >
                                        Remove from favorite
                                    </button> :
                                    <button
                                        className="email-body-btn"
                                        onClick={() => dispatch(addToFavorites(id))}
                                    >
                                        Mark as favorite
                                    </button>
                            }
                        </header>

                        <section className="flex-row">
                            <p>{date}</p>
                            {
                                favorites.includes(id) &&
                                <p className="email-favorite">Favorite</p>
                            }
                        </section>

                        <section className="email-body-content">
                            {bodyContent}
                        </section>
                    </div>
                </div>
            )

        )

    );
}