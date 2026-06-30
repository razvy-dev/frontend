import { UseFormRegisterReturn, FieldError } from "react-hook-form";

type PasswordProps = {
    label: string
    placeholder: string
    register: UseFormRegisterReturn
    errors: FieldError | undefined
}

export default function Password(props: PasswordProps) {
    return (
        <div>
            <label>{props.label}</label>
            <input type="password" placeholder={props.placeholder} {...props.register} />
            {props.errors && <span>{props.errors.message}</span>}
        </div>
    )
}
