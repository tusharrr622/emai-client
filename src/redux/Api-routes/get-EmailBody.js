import axios from "axios";

export const getEmailBody = async (emailItemId) => {
    try {
        const response = await axios.get(`https://flipkart-email-mock.now.sh/?id=${emailItemId}`);
        return(response.data);
    } catch (error) {
        console.log("Error encountered while retrieving the email body", error);
    }
}