import { useSelector } from "react-redux";
import { formatDatime } from "../../utility-functions";
import "../components-utility.css";
import "./email-card.css";

export const EmailCard = ({ currentEmail, showEmailBody, onClick }) => {
    const {
        id,
        from,
        date,
        subject,
        short_description
    } = currentEmail;
    const { name, email } = from;

    const { favorites, read } = useSelector((state) => state.emailList);
    const { emailBody } = useSelector((state) => state.emailBody);

    const initial = name[0].toUpperCase()
    const formattedDate = formatDatime(date);

    return (
        <div
            className={`
                email-card-wr email-container flex-row
                ${read.includes(id) ? "email-card-read" : ""}
                ${id === emailBody.id && showEmailBody.show ? "email-card-curr" : ""}
            `}
            onClick={onClick}
        >
            <div className="avatar flex-center">{initial}</div>

            <div className="email-card-content flex-col">
                <p>From: <strong><span>{name}</span> <span>&lt;{email}&gt;</span></strong></p>
                <p>Subject: <strong>{subject}</strong></p>
                <p>{short_description}</p>
                <section className="flex-row">
                    <p>{formattedDate}</p>
                    {
                        favorites.includes(id) &&
                        <p className="email-favorite"><strong>Favorite</strong></p>
                    }
                </section>
            </div>
        </div>
    );
}