import { forwardRef, useState, Fragment, useImperativeHandle } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Modal = forwardRef(({ children, title, buttonTitle, afterLeave = null }, ref) => {
  let [isOpen, setisOpen] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      hideModal: () => setisOpen(false),
      showModal: () => setisOpen(true),
    };
  });

  return (
    <>
      <div className="inset-0 mb-4">
        <button className="btn-indigo" onClick={() => setisOpen(true)}>
          {buttonTitle}
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment} afterLeave={afterLeave}>
        <Dialog as="div" className="fixed inset-0 z-0 overflow-y-auto" open={isOpen} onClose={() => setisOpen(false)}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </Dialog.Title>
                <div className="mt-2">{children}</div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});

Modal.displayName = "Modal";
export default Modal;
