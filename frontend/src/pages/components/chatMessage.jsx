export default function ChatMessage(props) {
  const { text, uid } = props.message;
  const id = 1;

  const messageClass = uid === id ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <p>{text}</p>
      </div>
    </>
  );
}
