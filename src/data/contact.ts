export const contactPage = {
  intro:
    "Have questions about flight training, scheduling, or our programs? We're here to help! Whether you're ready to start your journey toward becoming a pilot or just need more information, feel free to reach out.",
};

export const contactForm = {
  fields: [
    { name: "name", label: "Name", type: "text", placeholder: "name", required: true },
    { name: "email", label: "Email", type: "email", placeholder: "email", required: true },
    { name: "phone", label: "Phone", type: "text", placeholder: "phone", required: true },
    { name: "message", label: "Comment", type: "textarea", placeholder: "comment", required: true },
  ],
  submitButton: {
    default: "Submit",
    sending: "Sending...",
    success: "Successful!",
    alreadySent: "Already Sent",
  },
  alerts: {
    success: "Successfully sent!",
    error: "Failed to Send Email. Please Contact Us Directly",
  },
};
