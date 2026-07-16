import { ReactNode } from "react"

type AuthSubmitProps = {
    content: string | ReactNode
    isSubmitting: boolean
    contentWhileSubmitting: string | ReactNode | null
}

export default function AuthSubmit(props: AuthSubmitProps) {
    return (
        <button type="submit" disabled={props.isSubmitting} className="bg-black text-white">
            {props.isSubmitting ? props.contentWhileSubmitting && props.contentWhileSubmitting : props.content}
        </button>
    )
}