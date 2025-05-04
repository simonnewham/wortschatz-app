import { Status } from "../constants/Status";

export interface IToastCardProps {
    visible: boolean;
    status: Status;
    message: string;
}

export function ToastCard(props: IToastCardProps) {
    return (props.visible && <div>
        <span>{props.message}</span>
    </div>)
}