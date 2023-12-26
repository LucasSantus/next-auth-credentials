import { Button, Heading, Hr, Section, Text } from "@react-email/components";
import { EmailTemplate } from "./template";

interface EmailResetPasswordProps {
  url: string;
  username: string;
  applicationName: string;
}

export const EmailResetPassword = ({
  url,
  username,
  applicationName,
}: EmailResetPasswordProps) => {
  const previewText = `Recuperação de Senha | ${applicationName}`;

  return (
    <EmailTemplate previewText={previewText}>
      <Heading className="mx-0 my-5 p-0 text-center text-2xl font-normal text-black">
        <strong>Recuperação de Senha</strong>
      </Heading>
      <Section className="text-sm leading-6">
        <Text>Olá {username},</Text>

        <Text>
          Alguém solicitou recentemente uma alteração de senha da sua conta do{" "}
          {applicationName}. Se foi você, você pode definir uma nova senha aqui
        </Text>
      </Section>

      <Section className="my-5 text-center">
        <Button
          className="rounded bg-black px-5 py-3 text-center text-sm font-semibold text-white no-underline"
          href={url}
        >
          Recuperar a Senha
        </Button>
      </Section>

      <Hr className="mx-0 my-5 w-full border border-solid border-gray-200" />

      <Section className="text-sm leading-6 text-gray-400">
        <Text>
          Se você não deseja alterar sua senha ou não solicitou isso, basta
          ignorar e excluir esta mensagem.
        </Text>
        <Text>
          Para manter sua conta segura, não encaminhe este e-mail para ninguém.
        </Text>
      </Section>
    </EmailTemplate>
  );
};

export default EmailResetPassword;
