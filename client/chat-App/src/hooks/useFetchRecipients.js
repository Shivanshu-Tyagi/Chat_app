import { useEffect, useState } from "react";
import { getRequest, baseUrl } from "../Utils/Service";

export const useFetchRecipientUser = (chat, user) => {
  const [recipient, setRecipient] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.members?.find((id) => id !== user?.loginId);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null; // Exit early if there's no recipientId

        const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);
        if (response.error) {
         return setError(error); // Set the error state correctly
        }
        setRecipient(response);
    };
    getUser();
  }, [recipientId]);

  return { recipient };
};
