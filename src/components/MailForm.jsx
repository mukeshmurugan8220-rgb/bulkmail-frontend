import { useState } from "react";
import axios from "axios";
import "./MailForm.css";

function MailForm() {
  const [emails, setEmails] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMail = async (e) => {
    e.preventDefault();

    if (!emails || !subject || !message) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://bulkmail-backend-jc1r.onrender.com/api/mail/send",
        {
          emails,
          subject,
          message,
        }
      );

      alert(response.data.message);

      setEmails("");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Mail sending failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form className="card" onSubmit={sendMail}>
        <h1>Bulk Mail Sender</h1>

        <input
          type="text"
          placeholder="Recipient Emails"
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <textarea
          rows="6"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Mail"}
        </button>
      </form>
    </div>
  );
}

export default MailForm;