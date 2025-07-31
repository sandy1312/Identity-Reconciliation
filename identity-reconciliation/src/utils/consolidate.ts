import { PrismaClient, Contact } from '@prisma/client';

const prisma = new PrismaClient();

export async function consolidateContact(
  contacts: Contact[],
  email?: string,
  phoneNumber?: string
) {
  let primary: Contact | undefined;
  const allContacts = new Set<number>();
  const emails = new Set<string>();
  const phones = new Set<string>();
  const secondaryContactIds: number[] = [];

  // Determine primary contact
  for (const contact of contacts) {
    if (!primary || contact.createdAt < primary.createdAt) {
      primary = contact;
    }
  }

  if (primary) {
    emails.add(primary.email ?? '');
    phones.add(primary.phoneNumber ?? '');
    allContacts.add(primary.id);
  }

  for (const contact of contacts) {
    if (contact.id !== primary?.id) {
      secondaryContactIds.push(contact.id);
      emails.add(contact.email ?? '');
      phones.add(contact.phoneNumber ?? '');
      allContacts.add(contact.id);

      // Ensure correct linkage
      if (contact.linkPrecedence === 'primary') {
        await prisma.contact.update({
          where: { id: contact.id },
          data: {
            linkPrecedence: 'secondary',
            linkedId: primary?.id,
          },
        });
      }
    }
  }

  // If new info, insert as secondary
  const exists = contacts.some(c => c.email === email && c.phoneNumber === phoneNumber);

  if (!exists && (email || phoneNumber)) {
    const newContact = await prisma.contact.create({
      data: {
        email,
        phoneNumber,
        linkedId: primary?.id ?? null,
        linkPrecedence: primary ? 'secondary' : 'primary',
      },
    });

    if (!primary) primary = newContact;
    else secondaryContactIds.push(newContact.id);

    if (email) emails.add(email);
    if (phoneNumber) phones.add(phoneNumber);
    allContacts.add(newContact.id);
  }

  return {
    primaryContatctId: primary?.id,
    emails: Array.from(emails).filter(e => e),
    phoneNumbers: Array.from(phones).filter(p => p),
    secondaryContactIds,
  };
}
