import axios from "axios";

export const getEmailList = async (pageNumber) => {
    try {
        const response = await axios.get(`https://flipkart-email-mock.now.sh/?page=${pageNumber}`);
        return (response.data.list)
    } catch (error) {
        console.log("Error encountered while retrieving the email list", error);
    }
}