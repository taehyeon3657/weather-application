import WeatherWidget from '@/widgets/weather/ui/WeatherWidget';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-blue-200 p-4">
      <WeatherWidget />
    </main>
  );
}
