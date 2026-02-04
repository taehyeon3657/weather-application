import { kakaoApi } from '@/shared/api/kakao.api';

export const getCoordsByAddress = async (fullAddress: string) => {
  const query = fullAddress.replace(/-/g, ' ');

  try {
    const response = await kakaoApi.get('/search/address.json', {
      params: { query, page: 1, size: 1 },
    });

    const doc = response.data.documents[0];
    if (!doc) throw new Error('좌표를 찾을 수 없습니다.');

    return {
      lat: parseFloat(doc.y),
      lon: parseFloat(doc.x),
      name: fullAddress.split('-').pop() || fullAddress,
    };
  } catch (error) {
    console.error('Geo Error:', error);
    throw error;
  }
};
