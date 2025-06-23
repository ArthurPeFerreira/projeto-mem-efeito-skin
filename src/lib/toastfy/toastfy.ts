import { ToastOptions } from "react-toastify";

export const toastConfigs: ToastOptions = {
  position: "bottom-left",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  theme: "dark",
  style: {
    width: "fit-content",
    whiteSpace: "nowrap",
  },
  closeButton: false,
};
