import { UseFormRegisterReturn, FieldError } from "react-hook-form";

type TextFieldProps = {
    label: string
    type: string
    placeholder: string
    register: UseFormRegisterReturn
    errors: FieldError | undefined
}

export default function TextField(props: TextFieldProps) {
    return (
        <div>
            <label>{props.label}</label>
            <input type={props.type} placeholder={props.placeholder} {...props.register} />
            {props.errors && <span>{props.errors.message}</span>}
        </div>
    )
}