import { GoogleGenAI } from "@google/genai";
import { CartItem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getChefAdvice = async (
  prompt: string,
  cartItems: CartItem[],
  conversationHistory: string[] = []
): Promise<string> => {
  try {
    const cartContext = cartItems
      .map((item) => `${item.quantity} ${item.unit} of ${item.name}`)
      .join(", ");

    const systemInstruction = `
      You are "Chef Gemini", a friendly, knowledgeable, and creative AI assistant for an online grocery store called "KASHMIRFRESH".
      
      Your Role:
      1. Suggest recipes based on the items currently in the user's cart.
      2. Answer questions about ingredients, dietary restrictions, and cooking tips.
      3. Be concise, helpful, and use emojis to make the conversation fun.
      4. If the user asks for a recipe, provide a simple list of ingredients (bolding ones they already have in their cart) and short instructions.

      Current User Cart:
      ${cartContext ? cartContext : "The cart is currently empty."}
    `;

    // Simple concatenation for history context as we are using a fresh GenerateContent for simplicity here, 
    // but in a real app, we might use the Chat API with history preservation.
    // For this implementation, we will treat each message as a fresh turn with context injected.
    
    const fullPrompt = `${conversationHistory.join('\n')}\nUser: ${prompt}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm having trouble thinking of a recipe right now. Try again!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! My kitchen is a bit busy (API Error). Please try again later.";
  }
};