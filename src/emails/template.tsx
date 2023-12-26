import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import { PropsWithChildren } from "react";

interface EmailTemplateProps extends PropsWithChildren {
  previewText: string;
}

export function EmailTemplate({ children, previewText }: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-11 w-[465px] rounded border border-solid border-gray-300 p-9">
            {children}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
