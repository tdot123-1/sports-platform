import { createEvent } from "@/lib/actions/events/actions";
// import { useActionState } from "react";
import EventForm from "./event-form";

const initialState = {
    message: ""
}

const CreateForm = () => {
    // const [state, formAction, pending] = useActionState(createEvent, initialState)
    return ( <><EventForm action={createEvent} /></> );
}
 
export default CreateForm;