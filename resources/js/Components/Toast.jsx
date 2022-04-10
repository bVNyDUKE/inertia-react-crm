import { usePage } from "@inertiajs/inertia-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Toast = () => {
  const { message } = usePage().props;

  if (message?.success) toast.success(message.success);
  if (message?.error) toast.error(message.error);

  return (
    <ToastContainer position="bottom-right" autoClose={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable theme={"colored"} />
  );
};

export default Toast;
