import { usePage } from "@inertiajs/inertia-react";
import { useState } from "react";

const Success = ({ text }) => {
  const [hidden, setHidden] = useState(false);

  return (
    <>
      {!hidden && (
        <div className="z-0 flex max-w-lg items-center justify-between bg-emerald-400 p-3 text-white">
          <div>{text}</div>
          <div className="hover:cursor-pointer" onClick={() => setHidden(true)}>
            X
          </div>
        </div>
      )}
    </>
  );
};

const Error = ({ text }) => {
  const [hidden, setHidden] = useState(false);

  return (
    <>
      {!hidden && (
        <div className="z-0 flex max-w-lg items-center justify-between bg-red-400 p-3 text-white">
          <div>{text}</div>
          <div className="hover:cursor-pointer" onClick={() => setHidden(true)}>
            X
          </div>
        </div>
      )}
    </>
  );
};

const Message = () => {
  const { message } = usePage().props;
  if (message) {
    return (
      <>
        {message.success && <Success text={message.success} />}
        {message.error && <Error text={message.error} />}
      </>
    );
  }
  return <div></div>;
};

export default Message;
