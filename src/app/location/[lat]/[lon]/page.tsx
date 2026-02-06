import { WeatherDetailWidget } from '@/widgets/weatherDetail/ui/WeatherDetailWidget';

interface Props {
  // 1. Next.js 15부터는 params와 searchParams가 Promise 타입입니다.
  params: Promise<{
    lat: string;
    lon: string;
  }>;
  searchParams: Promise<{
    name?: string;
  }>;
}

// 2. 컴포넌트를 async 함수로 변경해야 합니다.
export default async function LocationDetailPage(props: Props) {
  // 3. await를 사용하여 실제 데이터를 추출합니다.
  const params = await props.params;
  const searchParams = await props.searchParams;

  const lat = parseFloat(params.lat);
  const lon = parseFloat(params.lon);

  // URL 디코딩은 Next.js가 자동으로 처리해주지만,
  // 만약 깨진다면 decodeURIComponent(searchParams.name)을 사용하세요.
  const locationName = searchParams.name;

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100 pt-10 pb-20">
      <WeatherDetailWidget lat={lat} lon={lon} name={locationName} />
    </main>
  );
}
