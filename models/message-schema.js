import z from 'zod';
// Data Schema for a New Message
// matches (mostly) the one from the front-end App!
const messageSchema = z.object({
    text: z
        .string()
        .trim()
        .min(3)
        .max(30)
});
export default messageSchema;