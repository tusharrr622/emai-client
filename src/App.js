import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchEmailList } from "./redux";
import "./stylesheets/app.css"
import { EmailBody, EmailList } from "./components";

function App() {
    const [currentFilter, setCurrentFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showEmailBody, setShowEmailBody] = useState({ show: false, emailId: "" });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEmailList(currentPage));
    }, [currentPage, dispatch]);

    return (
        <div className="App container-wr flex-col">
            <header className="flex-row flex-justify-sb">
                <section className="top-section flex-row flex-align-center">
                    <h3>Filter By:</h3>
                    <button
                        className={`action-btn ${currentFilter === "UNREAD" ? "active-btn" : ""}`}
                        onClick={() => setCurrentFilter("UNREAD")}
                    >
                        Unread
                    </button>
                    <button
                        className={`action-btn ${currentFilter === "READ" ? "active-btn" : ""}`}
                        onClick={() => setCurrentFilter("READ")}
                    >
                        Read
                    </button>
                    <button
                        className={`action-btn ${currentFilter === "FAVORITES" ? "active-btn" : ""}`}
                        onClick={() => setCurrentFilter("FAVORITES")}
                    >
                        Favorites
                    </button>
                </section>

                <section className="top-section flex-row flex-align-center">
                    <h3>Page:</h3>
                    <button
                        className={`action-btn ${currentPage === 1 ? "active-btn" : ""}`}
                        onClick={() => setCurrentPage(1)}
                    >1</button>
                    <button
                        className={`action-btn ${currentPage === 2 ? "active-btn" : ""}`}
                        onClick={() => setCurrentPage(2)}
                    >2</button>
                </section>
            </header>

            <div className={`page-content-wr ${showEmailBody.show ? "grid-layout" : ""}`}>
                <aside className="aside-ec-list">
                    <EmailList
                        showEmailBody={showEmailBody}
                        setShowEmailBody={setShowEmailBody}
                        currentFilter={currentFilter}
                    />
                </aside>
                {
                    showEmailBody.show &&
                    <main className="main-email-body">
                        <EmailBody />
                    </main>
                }
            </div>
        </div>
    );
}


export default App;