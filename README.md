# 오늘의 날씨 (Weather Application)

실시간 위치 기반으로 현재 날씨를 확인하고, 원하는 지역을 검색하여 즐겨찾기 할 수 있는 날씨 애플리케이션입니다.
**Next.js 15**와 **FSD(Feature-Sliced Design)** 아키텍처를 기반으로 개발되었으며, **PWA(Progressive Web App)** 를 지원하여 모바일 환경에서도 네이티브 앱처럼 사용할 수 있습니다.

## 🚀 프로젝트 실행 방법

프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요.

### 1. 환경 변수 설정
최상위 경로에 `.env` 파일을 생성하고 다음 키 값을 입력해야 합니다.
(OpenWeatherMap 및 Kakao Developers에서 API Key 발급 필요)

```env
NEXT_PUBLIC_WEATHER_BASE_URL=[https://api.openweathermap.org/data/2.5](https://api.openweathermap.org/data/2.5)
NEXT_PUBLIC_WEATHER_API_KEY=발급받은_OPENWEATHER_API_KEY
NEXT_PUBLIC_KAKAO_BASE_URL=[https://dapi.kakao.com/v2/local](https://dapi.kakao.com/v2/local)
NEXT_PUBLIC_KAKAO_REST_API_KEY=발급받은_KAKAO_REST_API_KEY
```

### 2. 패키지 설치
패키지 매니저(pnpm 권장)를 사용하여 의존성을 설치합니다.
```bash
pnpm install
```

### 3. 개발 서버 실행
```bash
pnpm dev
```

## 주요 기능

### 1. 실시간 위치 기반 날씨
사용자의 현재 위치(GPS)를 자동으로 감지하여 해당 지역의 실시간 날씨 정보를 보여줍니다.

현재 기온, 날씨 상태(아이콘), 체감 온도, 최저/최고 기온 등을 한눈에 확인할 수 있습니다.

### 2. 지역 검색 기능
Kakao 로컬 API를 활용하여 국내 모든 지역(도로명/지번 주소)을 검색할 수 있습니다.

검색 결과에서 원하는 지역을 선택하면 해당 위치의 날씨 정보를 즉시 조회합니다.

### 3. 즐겨찾기(Bookmark) 관리
검색한 지역을 '하트' 버튼을 눌러 즐겨찾기에 추가하거나 삭제할 수 있습니다.

즐겨찾기 된 목록은 Local Storage에 영구 저장되어 재방문 시에도 유지됩니다.

즐겨찾기 목록에서 카드를 클릭하면 상세 날씨 페이지로 이동합니다.

카드 내에서 별칭(Alias) 수정 및 즐겨찾기 삭제가 가능합니다.

### 4. 상세 날씨 예보
특정 지역의 시간대별 기온 변화(3시간 간격)를 가로 스크롤 UI로 제공합니다.

상세 페이지에서는 더욱 구체적인 날씨 데이터를 확인할 수 있습니다.

### 5. PWA (Progressive Web App) 지원
모바일 기기에서 "홈 화면에 추가"를 통해 앱처럼 설치하여 사용할 수 있습니다.

오프라인 지원 및 캐싱 전략을 통해 네트워크가 불안정한 환경에서도 최적의 사용자 경험을 제공합니다.

## 기술적 의사결정 및 이유

### 아키텍처: FSD (Feature-Sliced Design)
이유: 프로젝트의 규모가 커짐에 따라 유지보수성과 확장성을 확보하기 위해 도입했습니다.

### 프레임워크: Next.js 15 (App Router)
이유: 최신 React 19의 기능과 서버 컴포넌트(RSC)를 적극 활용하여 초기 로딩 속도를 최적화하고 SEO 성능을 강화하기 위해 선택했습니다.

### 상태 관리: TanStack Query & Zustand
TanStack Query: 서버 상태(Server State) 관리. 날씨 데이터와 같은 비동기 데이터의 캐싱, 리패칭, 로딩 상태 관리를 효율적으로 처리하기 위해 사용했습니다.

Zustand: 클라이언트 상태(Client State) 관리. 즐겨찾기 목록과 같은 전역 상태를 가볍고 직관적으로 관리하며, persist 미들웨어를 통해 로컬 스토리지 연동을 간편하게 구현했습니다.

### 스타일링: Tailwind CSS 4
이유: 빠른 UI 개발과 일관된 디자인 시스템 적용을 위해 선택했습니다.

### 모바일 최적화: next-pwa
이유: 웹 애플리케이션이지만 네이티브 앱과 유사한 사용자 경험(설치 가능, 아이콘 제공 등)을 제공하여 모바일 접근성을 높였습니다.

## 기술 스택

### Core
Framework: Next.js 15.1.6

Language: TypeScript 5

Library: React 19

### State Management & Data Fetching
Server State: @tanstack/react-query v5

Client State: Zustand v5

HTTP Client: Axios

### Styling
CSS Framework: Tailwind CSS v4

Icons: Lucide React

### Code Quality
Linter: ESLint (Flat Config)

Formatter: Prettier

Git Hooks: Husky, lint-staged