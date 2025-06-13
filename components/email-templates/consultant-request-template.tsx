import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
}

export const EmailTemplate = ({
  firstName, lastName, email, company, message
}: EmailTemplateProps): string => (
  `<div>
    <h2>New Business contact form Submission</h2>
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Company:</strong> ${company}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  </div>`
);