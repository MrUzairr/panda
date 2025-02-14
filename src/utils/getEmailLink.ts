export const getEmailLink = (
  email: string = 'care@panda.com.sa',
  subject: string = 'Contact Inquiry - Panda Support',
  body: string = 'Hello Panda Team,\n\nI would like to inquire about your products/services. Please provide me with more information.\n\nThank you.',
): string => {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};
