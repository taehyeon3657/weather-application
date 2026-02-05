import { kakaoApi } from '@/shared/api/kakao.api';

export const getCoordsByAddress = async (fullAddress: string) => {
  const query = fullAddress.replaceAll('-', ' ');

  try {
    const response = await kakaoApi.get('/search/address.json', {
      params: { query, page: 1, size: 1 },
    });

    if (!response.data.documents || response.data.documents.length === 0) {
      throw new Error('검색 결과가 없습니다.');
    }

    const doc = response.data.documents[0];

    return {
      lat: parseFloat(doc.y),
      lon: parseFloat(doc.x),
      name: fullAddress.replaceAll('-', ' '),
    };
  } catch (error) {
    throw error;
  }
};
