import axios from 'axios';

export const kakaoApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_KAKAO_BASE_URL,
  headers: {
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
  },
});
