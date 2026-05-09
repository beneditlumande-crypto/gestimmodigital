ALTER TABLE public.contact_messages
  ADD CONSTRAINT contact_messages_name_length CHECK (char_length(name) > 0 AND char_length(name) <= 100),
  ADD CONSTRAINT contact_messages_email_length CHECK (char_length(email) > 0 AND char_length(email) <= 255),
  ADD CONSTRAINT contact_messages_phone_length CHECK (phone IS NULL OR char_length(phone) <= 30),
  ADD CONSTRAINT contact_messages_message_length CHECK (char_length(message) > 0 AND char_length(message) <= 2000);