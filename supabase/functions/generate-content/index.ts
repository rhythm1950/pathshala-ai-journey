import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const authHeader = req.headers.get("Authorization");
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Verify user is authenticated
    const token = authHeader?.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { type, chapterId, chapterTitle, chapterNumber, textbookTitle, subject, classLevel } = await req.json();

    if (type === "explanation") {
      const systemPrompt = `You are an expert Bangladeshi education content creator. Generate detailed, student-friendly chapter explanations for textbooks used in Bangladesh's national curriculum (NCTB). 
Write in a clear, engaging style suitable for Class ${classLevel} students.
Provide the explanation in BOTH English and Bangla.
Format your response as JSON with two keys: "explanation" (English) and "explanation_bn" (Bangla/Bengali).
The explanation should be comprehensive (500-800 words each language), covering key concepts, examples, and important points.
Use simple language appropriate for the grade level.`;

      const userPrompt = `Generate a detailed chapter explanation for:
- Textbook: ${textbookTitle}
- Subject: ${subject}
- Class Level: ${classLevel}
- Chapter ${chapterNumber}: ${chapterTitle}

Return JSON: {"explanation": "...", "explanation_bn": "..."}`;

      const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          tools: [{
            type: "function",
            function: {
              name: "save_explanation",
              description: "Save chapter explanation in English and Bangla",
              parameters: {
                type: "object",
                properties: {
                  explanation: { type: "string", description: "English explanation" },
                  explanation_bn: { type: "string", description: "Bangla explanation" },
                },
                required: ["explanation", "explanation_bn"],
                additionalProperties: false,
              },
            },
          }],
          tool_choice: { type: "function", function: { name: "save_explanation" } },
        }),
      });

      if (!aiResponse.ok) {
        const status = aiResponse.status;
        if (status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        if (status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        throw new Error("AI gateway error: " + await aiResponse.text());
      }

      const aiData = await aiResponse.json();
      const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
      if (!toolCall) throw new Error("No tool call in AI response");

      const parsed = JSON.parse(toolCall.function.arguments);

      const { error: updateError } = await supabase
        .from("chapters")
        .update({ explanation: parsed.explanation, explanation_bn: parsed.explanation_bn })
        .eq("id", chapterId);

      if (updateError) throw updateError;

      return new Response(JSON.stringify({ success: true, data: parsed }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    } else if (type === "quiz") {
      const systemPrompt = `You are an expert Bangladeshi education quiz creator. Create multiple-choice quiz questions for textbooks used in Bangladesh's national curriculum (NCTB).
Create exactly 5 quiz questions for Class ${classLevel} students.
Each question should have 4 options with one correct answer.
Provide everything in BOTH English and Bangla.`;

      const userPrompt = `Generate 5 quiz questions for:
- Textbook: ${textbookTitle}
- Subject: ${subject}  
- Class Level: ${classLevel}
- Chapter ${chapterNumber}: ${chapterTitle}

Return structured quiz data.`;

      const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          tools: [{
            type: "function",
            function: {
              name: "save_quiz",
              description: "Save quiz questions",
              parameters: {
                type: "object",
                properties: {
                  questions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        question: { type: "string" },
                        question_bn: { type: "string" },
                        options: { type: "array", items: { type: "string" }, minItems: 4, maxItems: 4 },
                        options_bn: { type: "array", items: { type: "string" }, minItems: 4, maxItems: 4 },
                        correct_answer: { type: "number", description: "0-indexed correct option" },
                        explanation: { type: "string" },
                        explanation_bn: { type: "string" },
                      },
                      required: ["question", "question_bn", "options", "options_bn", "correct_answer", "explanation", "explanation_bn"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["questions"],
                additionalProperties: false,
              },
            },
          }],
          tool_choice: { type: "function", function: { name: "save_quiz" } },
        }),
      });

      if (!aiResponse.ok) {
        const status = aiResponse.status;
        if (status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        if (status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        throw new Error("AI gateway error: " + await aiResponse.text());
      }

      const aiData = await aiResponse.json();
      const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
      if (!toolCall) throw new Error("No tool call in AI response");

      const parsed = JSON.parse(toolCall.function.arguments);

      // Delete existing quiz questions for this chapter
      await supabase.from("quiz_questions").delete().eq("chapter_id", chapterId);

      // Insert new questions
      const rows = parsed.questions.map((q: any) => ({
        chapter_id: chapterId,
        question: q.question,
        question_bn: q.question_bn,
        options: q.options,
        options_bn: q.options_bn,
        correct_answer: q.correct_answer,
        explanation: q.explanation,
        explanation_bn: q.explanation_bn,
      }));

      const { error: insertError } = await supabase.from("quiz_questions").insert(rows);
      if (insertError) throw insertError;

      return new Response(JSON.stringify({ success: true, count: rows.length }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid type" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-content error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
