import { mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import { Filled } from "./Styles";

export default function LinkButton(props) {
    let icon;

    if (props.icon) {
        icon = (
            <Icon
                className={props.text ? "mr-1" : ""}
                path={props.icon}
                size={1}
            />
        );
    }

    let variante = Filled;

    if (props.variante) {
        variante = props.variante;
    }

    let basestyle = "rounded px-3 py-2 text-base flex items-center";

    if (props.public) {
        return (
            <a
                href={props.to}
                className={basestyle + " " + variante + " " + props.className}
            >
                {icon}
                <span className="flex-1">{props.text}</span>
                <Icon path={mdiChevronRight} size={1} />
            </a>
        );
    }

    return (
        <Link
            to={props.to}
            className={basestyle + " " + variante + " " + props.className}
        >
            {icon}
            <span className="flex-1">{props.text}</span>
            <Icon path={mdiChevronRight} size={1} />
        </Link>
    );
}
