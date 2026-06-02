import { ToastCard } from "@/components/ToastCard";
import { Status } from "@/constants/Status";
import { createContext, useContext, useState, type PropsWithChildren } from "react";

interface ToastContextType {
    show: (message: string, status?: Status) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

export function ToastProvider({ children }: PropsWithChildren) {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(Status.Info);

    const show = (message: string, status: Status = Status.Info) => {
        setMessage(message);
        setStatus(status);
        setVisible(true);

        setTimeout(() => {
            setVisible(false);
        }, 3000);
    };

    return (
        <ToastContext value={{ show }}>
            {children}
            <ToastCard visible={visible} message={message} status={status} />
        </ToastContext>
    );
}
