import { messages } from "@/constants/messages";
import { KeyRoundIcon } from "lucide-react";
import { Fragment } from "react";
import { AuthenticationDescription } from "../../_components/authentication-description";

export default function NotFound() {
  return (
    <Fragment>
      <AuthenticationDescription
        title="Recuperação de conta"
        description="Ops, houve um problema ao tentar recuperar as informações!"
        icon={KeyRoundIcon}
      />

      <span className="text-center">{messages.account.USER_NOT_FOUND}</span>
    </Fragment>
  );
}
