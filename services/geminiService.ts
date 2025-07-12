
import { GoogleGenAI } from "@google/genai";
import { LessonPlanFormState } from '../types';

interface ApiKeys {
  gemini: string;
  openrouter: string;
}

function buildPrompt(formData: LessonPlanFormState): string {
  const { subject, level, topic, goal, duration, method, outcome } = formData;
  
  return `
Bạn là một trợ lý AI chuyên tạo giáo án chi tiết cho giảng viên Công nghệ Thông tin. Dựa vào các thông tin sau, hãy tạo một giáo án hoàn chỉnh bằng Tiếng Việt.

**Thông tin buổi học:**
- **Môn học:** ${subject}
- **Trình độ học viên:** ${level}
- **Chủ đề bài học:** ${topic}
- **Mục tiêu chính:** ${goal}
- **Thời lượng:** ${duration}
- **Phương pháp giảng dạy:** ${method}
- **Kết quả học viên cần đạt được (tùy chọn):** ${outcome || 'Không có'}

**Yêu cầu cấu trúc giáo án:**
Hãy trình bày giáo án theo định dạng Markdown, sử dụng các tiêu đề sau ĐÚNG NGUYÊN VĂN, mỗi tiêu đề trên một dòng riêng:

### TÊN BÀI HỌC:
(Tên bài học)

### MỤC TIÊU HỌC TẬP:
(Liệt kê các mục tiêu cụ thể, dùng gạch đầu dòng)

### TÀI NGUYÊN CẦN THIẾT:
(Liệt kê các tài nguyên, ví dụ: máy chiếu, slide, phần mềm VS Code,...)

### KẾ HOẠCH GIẢNG DẠY CHI TIẾT:
(Chia hoạt động theo từng mốc thời gian. Ví dụ:
- **0-10 phút:** Giới thiệu, ổn định lớp.
- **10-30 phút:** Giảng lý thuyết về [chủ đề].
- **30-75 phút:** Live coding ví dụ.
- **75-90 phút:** Sinh viên thực hành, Q&A.)

### DÀN Ý SLIDE THUYẾT TRÌNH:
(Liệt kê chi tiết từng slide, mỗi slide cần có tiêu đề và mô tả ngắn gọn nội dung sẽ trình bày. Ví dụ:
- **Slide 1: Tiêu đề bài học:** Tên môn học, tên bài học, tên giảng viên.
- **Slide 2: Mục tiêu buổi học:** Trình bày các mục tiêu cần đạt được sau buổi học.
- **Slide 3: Nội dung chính - Phần 1:** Trình bày lý thuyết về [Khái niệm A].
- **Slide 4: Ví dụ minh họa - Phần 1:** Code demo hoặc hình ảnh minh họa cho [Khái niệm A].
...
- **Slide cuối: Tóm tắt & Q&A:** Tổng kết kiến thức, bài tập về nhà và giải đáp thắc mắc.)

### VÍ DỤ MÃ NGUỒN:
(Cung cấp **ít nhất hai** ví dụ code thực tế, độ khó tăng dần, liên quan đến chủ đề. Mỗi ví dụ cần được đặt trong khối mã Markdown (ví dụ: \`\`\`python) và có giải thích ngắn gọn về chức năng của nó. Ví dụ:
- **Ví dụ 1 (Cơ bản): Hàm tính tổng**
  \`\`\`python
  # Hàm này nhận vào hai số và trả về tổng của chúng
  def tinh_tong(a, b):
    return a + b
  ket_qua = tinh_tong(5, 3)
  print(f"Tổng là: {ket_qua}")
  \`\`\`
- **Ví dụ 2 (Nâng cao): Lớp hình chữ nhật**
  \`\`\`python
  class HinhChuNhat:
    def __init__(self, chieu_dai, chieu_rong):
      self.chieu_dai = chieu_dai
      self.chieu_rong = chieu_rong
    
    def tinh_dien_tich(self):
      return self.chieu_dai * self.chieu_rong
  
  hcn = HinhChuNhat(10, 5)
  print(f"Diện tích là: {hcn.tinh_dien_tich()}")
  \`\`\`
)

### ĐÁNH GIÁ VÀ BÀI TẬP:
(Mô tả cách đánh giá và đưa ra bài tập thực hành hoặc bài tập về nhà.)

**Lưu ý:**
- Nội dung phải chuyên nghiệp, phù hợp với môi trường giáo dục đại học.
- Ngôn ngữ: Tiếng Việt.
- Chỉ trả về nội dung giáo án, không thêm lời chào hay giải thích gì thêm.
`;
}

async function generateWithGemini(prompt: string, apiKey: string): Promise<string> {
  if (!apiKey) {
    throw new Error("Google Gemini API key is missing. Please add it in Settings.");
  }
  const ai = new GoogleGenAI({ apiKey });
  const model = 'gemini-2.5-flash';
  
  const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
  });
  return response.text;
}

async function generateWithOpenRouter(formData: LessonPlanFormState, apiKey: string, prompt: string): Promise<string> {
    if (!apiKey) {
        throw new Error("OpenRouter API key is missing. Please add it in Settings.");
    }
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": window.location.href,
            "X-Title": "AI Lesson Plan Generator",
        },
        body: JSON.stringify({
            model: formData.openRouterModel,
            messages: [{ role: "user", content: prompt }],
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenRouter API Error:", errorData);
        throw new Error(`OpenRouter API error: ${errorData.error?.message || `Status ${response.status}`}`);
    }

    const data = await response.json();
    if (!data.choices || data.choices.length === 0) {
        throw new Error("Received an empty response from OpenRouter.");
    }
    return data.choices[0].message.content;
}


export async function generateLessonPlan(formData: LessonPlanFormState, apiKeys: ApiKeys): Promise<string> {
  const prompt = buildPrompt(formData);

  try {
    if (formData.provider === 'openrouter') {
      return await generateWithOpenRouter(formData, apiKeys.openrouter, prompt);
    } else { // Default to gemini
      return await generateWithGemini(prompt, apiKeys.gemini);
    }
  } catch (error) {
    console.error("Error calling AI API:", error);
    // Re-throw the specific error message from the child functions
    if (error instanceof Error) {
        throw error;
    }
    throw new Error('An unknown error occurred while generating the lesson plan.');
  }
}
