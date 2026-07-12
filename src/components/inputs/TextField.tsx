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
        <div className="flex flex-col gap-1">
            <label className="text-black">{props.label}</label>
            <input type={props.type} placeholder={props.placeholder} {...props.register} className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {props.errors && <span className="text-red-500">{props.errors.message}</span>}
        </div>
    )
}