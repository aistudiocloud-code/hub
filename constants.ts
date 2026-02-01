import type { AspectRatio } from './types';

export const predefinedReferenceImages = {
  building: [
    { name: 'Cao tầng 1', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUCAOTANG/main/z7092588730600_40c3acebfcd07f7ea9029c82ca948a59.jpg' },
    { name: 'Cao tầng 2', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUCAOTANG/main/z7092588735695_52147b30644d6a42bec87f807661f7ff.jpg' },
    { name: 'Cao tầng 3', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUCAOTANG/main/z7092637645602_0a8bfc1046d9bfeeee62aac28d1afe87.jpg' },
    { name: 'Cao tầng 4', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUCAOTANG/main/z7092637644035_6298697cb54748adc10d86a43ebdfa7b.jpg' },
    { name: 'Cao tầng 5', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUCAOTANG/main/z7092637643871_90807b3e08c2575e83dab45b46f94e87.jpg' },
  ],
  house: [
    { name: 'Nhà phố 1', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUNHAPHO/main/z7092637643969_cd6b5c0e95120c877168f822520f18b7.jpg' },
    { name: 'Nhà phố 2', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUNHAPHO/main/z7092637649555_89ab81eea211c0448237820852b9a246.jpg' },
  ],
  villa: [
    { name: 'Biệt thự 1', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUVILLA/main/z7092637643969_cd6b5c0e95120c877168f822520f18b7.jpg' },
    { name: 'Biệt thự 2', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUVILLA/main/z7092637649555_89ab81eea211c0448237820852b9a246.jpg' },
  ],
  planning: [
    { name: 'Quy hoạch 1', url: 'https://raw.githubusercontent.com/Khanhltvpp1a/THAMCHIEUQUYHOACH/main/z7092588730600_40c3acebfcd07f7ea9029c82ca948a59.jpg' },
  ],
};

export const stylePrompts = [
    "phong cách hiện đại (Modern)",
    "phong cách tối giản (Minimalist)",
    "phong cách tân cổ điển (Neoclassic)",
    "phong cách Indochine",
    "phong cách công nghiệp (Industrial)",
    "phong cách Scandinavian",
    "phong cách Bauhaus",
    "phong cách nhiệt đới (Tropical)",
    "phong cách Brutalist",
    "phong cách Zen Nhật Bản",
    "phong cách Mediterranean (Địa Trung Hải)",
    "phong cách Art Deco",
];

export const contextPrompts = [
    "ở đường phố đô thị nhộn nhịp",
    "ở vùng làng quê yên bình Việt Nam",
    "ở khu đô thị sang trọng Vinhomes",
    "giữa rừng thông sương mù",
    "bên bờ biển xanh ngắt",
    "trên sườn núi hùng vĩ",
    "trong khu bảo tồn thiên nhiên",
];

export const weatherPrompts = [
    "trời nắng rực rỡ, ít mây",
    "trời mưa phùn lãng mạn",
    "sương mù dày đặc huyền ảo",
    "trời nhiều mây âm u (Overcast)",
    "trời sau cơn mưa, đường phố ẩm ướt",
    "có tuyết rơi trắng xóa",
];

export const climatePrompts = [
    "khí hậu nhiệt đới ẩm",
    "khí hậu ôn đới mát mẻ",
    "khí hậu lạnh giá (Winter vibe)",
    "khí hậu khô hạn sa mạc",
    "khí hậu vùng cao nguyên",
];

export const lightingPrompts = [
      "Ánh sáng ban ngày tự nhiên, trời trong xanh",
      "Ánh sáng hoàng hôn ấm áp (Golden Hour)",
      "Ánh sáng ban đêm, ánh đèn lung linh",
      "Ánh sáng bình minh dịu nhẹ",
      "Ánh sáng xanh mờ ảo (Blue Hour)",
];

export const cameraAnglePrompts = [
    { display: "Chụp từ trên cao xuống", value: "Chụp từ trên cao xuống (high-angle shot)"},
    { display: "Góc thấp (cảm giác hùng vĩ)", value: "Góc thấp từ dưới nhìn lên (low-angle shot)"},
    { display: "Chụp chính diện", value: "góc chụp chính diện mặt tiền công trình, đối xứng"},
];

export const videoPrompts = [
    { display: "Bay flycam chậm", value: "slow cinematic drone flyover shot" },
    { display: "Tiến lại gần", value: "slow dolly-in shot towards the building" },
    { display: "Lùi xa dần", value: "slow dolly-out shot away from the building" },
    { display: "Xoay quanh", value: "circular orbital camera motion around the architecture" },
];

export const planStylePrompts = [
    "phong cách tối giản luxury",
    "phong cách hiện đại tropical",
    "phong cách Indochine truyền thống",
    "phong cách nội thất Bắc Âu",
];

export const planColorizePrompts = [
    "màu sắc diễn họa kiến trúc tiêu chuẩn",
    "phối màu tông ấm wood and beige",
    "diễn họa màu nước nghệ thuật",
    "phối màu tối sang trọng",
];

export const ASPECT_RATIO_OPTIONS: AspectRatio[] = ['auto', '1:1', '4:3', '3:4', '16:9', '9:16'];

export const ASPECT_RATIO_LABELS: Record<AspectRatio, string> = {
    auto: 'Tự động',
    '1:1': 'Vuông (1:1)',
    '4:3': 'Ngang (4:3)',
    '3:4': 'Dọc (3:4)',
    '16:9': 'Rộng (16:9)',
    '9:16': 'Story (9:16)',
    '2:3': 'Dọc (2:3)',
    '3:2': 'Ngang (3:2)',
};