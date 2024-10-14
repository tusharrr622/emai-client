import { useDispatch, useSelector } from "react-redux";
import { addToRead, fetchEmailBody, setEmailDetails } from "../../redux";
import { formatDatime, filterEmailList } from "../../utility-functions";
import { EmailCard } from "..";

export const EmailList = ({ showEmailBody, setShowEmailBody, currentFilter }) => {
    const { show, emailId } = showEmailBody;
    const {
        listLoading,
        listLoadingError,
        emailList,
        favorites,
        read
    } = useSelector((state) => state.emailList);

    const dispatch = useDispatch();

    const filteredEmailList = filterEmailList(emailList, currentFilter, favorites, read)

    const emailCardClickHandler = (id, name, date, subject) => {
        if (show && emailId === id) {
            return setShowEmailBody({ show: false, emailId: "" });
        }

        setShowEmailBody({ show: true, emailId: id });
        dispatch(addToRead(id));
        dispatch(setEmailDetails({
            initial: name[0].toUpperCase(),
            subject: subject,
            date: formatDatime(date),
        }))
        dispatch(fetchEmailBody(id));
    }

    return (
        <div className="ec-list-wr flex-col">
            {
                listLoading &&
                <p>Please wait, we are fetching your emails...</p>
            }
            {
                listLoadingError &&
                <p>Unable to load emails. Please try again later.</p>
            }
            {
                filteredEmailList.length === 0 && !listLoading &&
                <p>It seems your inbox is empty for this filter. Try a different one!</p>

            }
            {
                filteredEmailList.length > 0 && !listLoading &&
                filteredEmailList?.map((currentEmail) => {
                    const { id, from, date, subject } = currentEmail;
                    return (
                        <EmailCard
                            key={id}
                            currentEmail={currentEmail}
                            showEmailBody={showEmailBody}
                            onClick={() => emailCardClickHandler(id, from.name, date, subject)}
                        />
                    );
                })
            }
        </div>
    );
}