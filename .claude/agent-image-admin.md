# Image Admin System Implementation Guide

Skylogix Aviation 웹사이트의 콘텐츠 이미지를 관리자 페이지에서 업로드/교체/삭제할 수 있는 시스템을 구축한다.
문구(텍스트), 버튼 아이콘, SVG 아이콘은 관리 대상이 아니다.

---

## 1. 현재 상태 요약

### 기술 스택
- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Deployment**: Vercel
- **DB**: Supabase PostgreSQL (연결 설정 완료, 실제 사용 X)
- **Storage**: 없음 (현재 `public/` 디렉토리에 정적 파일로 관리)
- **Auth**: 없음

### 관리 대상 이미지 (총 23개)

| 카테고리 | 파일 | 사용처 | 비고 |
|---------|------|--------|------|
| **Fleet - N49202** | `/N49202/N49202_1~6.jpeg` (6개) | 홈 Fleet 섹션, `/fleet`, `/fleet/N49202` | 갤러리 이미지 배열 |
| **Fleet - N4900L** | `/N4900L/N4900L_1~6.jpeg` (6개) | 홈 Fleet 섹션, `/fleet`, `/fleet/N4900L` | 갤러리 이미지 배열 |
| **Fleet - N25976** | `/N25976/N25976_1~5.jpeg` (5개) | 홈 Fleet 섹션, `/fleet`, `/fleet/N25976` | 갤러리 이미지 배열 |
| **Crew** | `/coming_soon.png` (플레이스홀더) | 홈 Crew 섹션 | Founder 1, Instructor 3, Mechanic 2 = 총 6명 |
| **Hero/Background** | `/landing_Image.png` | 홈 Hero, Fleet 페이지 Hero, OG Image | 메인 히어로 |
| **Hero/Background** | `/plane_image.jpg` | Training Hero, 홈 CTA 배너 | |
| **Hero/Background** | `/mockDesign.png` | Inquiries(Contact) Hero | |

### 관리 대상이 아닌 이미지
- `/fullLogo.png`, `/logo.png` — 로고
- `/icon/*.svg` — UI 아이콘 (chevron, phone, mail, map, clock, menu, x 등)
- `/favicon*.png`, `/apple-touch-icon.png`, `/android-chrome-*.png` — 파비콘/PWA
- `/backPrint.png` — 배경 장식

### 현재 데이터 구조

```typescript
// src/data/fleet.ts
interface Aircraft {
  id: string;
  name: string;
  year: number;
  model: string;
  engine: string;
  horsepower: number;
  flightRule: string;
  pricePerHour: string;
  description: string;
  images: string[];        // ← 관리 대상
}

// src/data/crew.ts
interface CrewMember {
  id: string;
  name: string;
  role: string;
  image: string;           // ← 관리 대상
  bio?: string;
  certifications?: string[];
}
type CrewCategory = "founder" | "instructor" | "mechanic";
```

### 이미지가 사용되는 컴포넌트 파일
- `src/app/_components/HomeContent.tsx` — Hero(`/landing_Image.png`), Fleet 갤러리, Crew 이미지, CTA(`/plane_image.jpg`)
- `src/app/fleet/page.tsx` — Fleet 리스트 + Hero(`/landing_Image.png`)
- `src/app/fleet/[id]/page.tsx` — Fleet 상세 갤러리
- `src/app/training/_components/TrainingContent.tsx` — Hero(`/plane_image.jpg`)
- `src/app/inquiries/_components/InquiriesContent.tsx` — Hero(`/mockDesign.png`)
- `src/components/ui/ImageGallery.tsx` — Fleet 이미지 캐러셀
- `src/app/layout.tsx` — OG Image 메타데이터

---

## 2. 목표 아키텍처

```
┌─────────────────────┐
│   Admin Dashboard    │  /admin (인증된 사용자만)
│   - Fleet 이미지 관리  │
│   - Crew 이미지 관리   │
│   - Hero 이미지 관리   │
└────────┬────────────┘
         │ Upload / Delete
         ▼
┌─────────────────────┐
│  Supabase Storage    │  이미지 파일 저장소 (public bucket)
│  - fleet/            │
│  - crew/             │
│  - hero/             │
└────────┬────────────┘
         │ Public URL
         ▼
┌─────────────────────┐
│  Supabase Database   │  이미지 메타데이터
│  - fleet_images      │
│  - crew_images       │
│  - hero_images       │
└────────┬────────────┘
         │ API query
         ▼
┌─────────────────────┐
│  Next.js Frontend    │  기존 페이지에서 DB 데이터로 이미지 렌더링
└─────────────────────┘
```

---

## 3. 구현 단계

### Phase 1: Supabase 인프라 설정

#### 1-1. Supabase Storage Bucket 생성
Supabase Dashboard에서 수동 설정:
- **Bucket 이름**: `images` (public access)
- **폴더 구조**: `fleet/`, `crew/`, `hero/`
- **파일 크기 제한**: 5MB
- **허용 MIME**: `image/jpeg`, `image/png`, `image/webp`

#### 1-2. Database 테이블 생성

```sql
-- Fleet 이미지 (항공기별 다수 이미지)
CREATE TABLE fleet_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  aircraft_id TEXT NOT NULL,          -- "N49202", "N4900L", "N25976"
  image_url TEXT NOT NULL,            -- Supabase Storage public URL
  sort_order INT NOT NULL DEFAULT 0,  -- 갤러리 순서
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Crew 이미지 (멤버별 1장)
CREATE TABLE crew_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  crew_member_id TEXT NOT NULL UNIQUE, -- "founder-1", "instructor-1" 등
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Hero/배경 이미지 (페이지별 1장)
CREATE TABLE hero_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_key TEXT NOT NULL UNIQUE,       -- "home", "fleet", "training", "inquiries", "cta"
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policy: 읽기는 모든 사용자, 쓰기는 인증된 사용자만
ALTER TABLE fleet_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE crew_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON fleet_images FOR SELECT USING (true);
CREATE POLICY "Auth write" ON fleet_images FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read" ON crew_images FOR SELECT USING (true);
CREATE POLICY "Auth write" ON crew_images FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read" ON hero_images FOR SELECT USING (true);
CREATE POLICY "Auth write" ON hero_images FOR ALL USING (auth.role() = 'authenticated');
```

#### 1-3. 기존 이미지 마이그레이션
`public/` 폴더의 기존 이미지를 Supabase Storage에 업로드하고, DB에 초기 데이터를 삽입하는 seed 스크립트 작성.

```
scripts/seed-images.ts
```

### Phase 2: Supabase 클라이언트 설정

#### 2-1. 패키지 설치
```bash
npm install @supabase/supabase-js @supabase/ssr
```

#### 2-2. 클라이언트 유틸리티 파일
```
src/lib/supabase/
├── client.ts       # 브라우저용 클라이언트 (createBrowserClient)
├── server.ts       # 서버 컴포넌트용 클라이언트 (createServerClient)
└── admin.ts        # 서비스 롤 클라이언트 (Storage 업로드용)
```

#### 2-3. 환경변수 추가 (.env)
```
NEXT_PUBLIC_SUPABASE_URL=https://nbblgivzblyvwchfydqg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
```

### Phase 3: 인증 (Admin 접근 제어)

#### 3-1. 간단한 비밀번호 기반 인증
별도의 사용자 시스템 없이, 환경변수에 관리자 비밀번호를 설정하고 세션 쿠키로 인증하는 방식.

```
ADMIN_PASSWORD=<secure_password>
```

#### 3-2. 파일 구조
```
src/app/admin/
├── login/page.tsx           # 비밀번호 입력 폼
├── page.tsx                 # 대시보드 (Fleet, Crew, Hero 탭)
├── _components/
│   ├── AdminLayout.tsx      # 인증 체크 래퍼
│   ├── FleetImageManager.tsx
│   ├── CrewImageManager.tsx
│   └── HeroImageManager.tsx
└── layout.tsx               # 관리자 레이아웃
```

#### 3-3. 인증 API
```
src/app/api/admin/
├── login/route.ts           # POST: 비밀번호 검증 → 세션 쿠키 설정
├── logout/route.ts          # POST: 세션 쿠키 삭제
└── auth/route.ts            # GET: 세션 유효성 확인
```

### Phase 4: 이미지 관리 API

#### 4-1. API Routes
```
src/app/api/images/
├── fleet/
│   ├── route.ts             # GET: 항공기별 이미지 목록
│   └── [aircraftId]/
│       ├── route.ts         # POST: 이미지 업로드, DELETE: 전체 삭제
│       └── [imageId]/
│           └── route.ts     # DELETE: 개별 이미지 삭제
├── crew/
│   └── [memberId]/
│       └── route.ts         # GET, POST (업로드/교체), DELETE
├── hero/
│   └── [pageKey]/
│       └── route.ts         # GET, POST (업로드/교체), DELETE
└── reorder/
    └── route.ts             # PATCH: Fleet 이미지 순서 변경
```

#### 4-2. 업로드 플로우
1. Admin에서 이미지 선택
2. `POST /api/images/fleet/[aircraftId]` 호출
3. API에서 Supabase Storage에 업로드 → public URL 받기
4. DB `fleet_images` 테이블에 URL과 메타데이터 저장
5. 응답 반환

#### 4-3. 삭제 플로우
1. Admin에서 삭제 버튼 클릭
2. `DELETE /api/images/fleet/[aircraftId]/[imageId]` 호출
3. DB에서 레코드 삭제
4. Supabase Storage에서 파일 삭제
5. 응답 반환

### Phase 5: Admin 대시보드 UI

#### 5-1. Fleet 이미지 매니저
- 항공기 선택 탭 (N49202 / N4900L / N25976)
- 현재 이미지 그리드 (드래그 앤 드롭으로 순서 변경)
- 개별 이미지 삭제 버튼
- 새 이미지 업로드 (드래그 앤 드롭 또는 파일 선택)
- 이미지 미리보기

#### 5-2. Crew 이미지 매니저
- 카테고리별 멤버 목록 (Founder / Instructor / Mechanic)
- 각 멤버 옆에 현재 이미지 프리뷰
- 이미지 교체 버튼 (파일 선택 → 즉시 업로드)
- 플레이스홀더(`coming_soon.png`) 표시

#### 5-3. Hero 이미지 매니저
- 페이지별 Hero 이미지 목록
  - Home Hero (`landing_Image.png`)
  - Fleet Page Hero (`landing_Image.png`)
  - Training Hero (`plane_image.jpg`)
  - Inquiries Hero (`mockDesign.png`)
  - Home CTA Banner (`plane_image.jpg`)
- 각각 이미지 교체 기능

### Phase 6: 프론트엔드 데이터 소스 전환

현재 `src/data/*.ts` 정적 파일에서 이미지를 가져오는 로직을 Supabase DB에서 가져오도록 변경한다.

#### 6-1. 데이터 패칭 유틸리티
```
src/lib/queries/
├── fleet-images.ts    # getFleetImages(aircraftId): string[]
├── crew-images.ts     # getCrewImage(memberId): string
└── hero-images.ts     # getHeroImage(pageKey): string
```

#### 6-2. 변경 대상 컴포넌트

| 파일 | 현재 | 변경 후 |
|------|------|---------|
| `src/app/_components/HomeContent.tsx` | `fleet` 데이터의 `images` 배열 직접 사용 | `getFleetImages()` 호출 결과 사용 |
| `src/app/_components/HomeContent.tsx` | `crew` 데이터의 `image` 필드 직접 사용 | `getCrewImage()` 호출 결과 사용 |
| `src/app/_components/HomeContent.tsx` | `"/landing_Image.png"` 하드코딩 | `getHeroImage("home")` 결과 사용 |
| `src/app/fleet/page.tsx` | `fleet` 데이터의 `images` 배열 | `getFleetImages()` 결과 사용 |
| `src/app/fleet/[id]/page.tsx` | `fleet` 데이터의 `images` 배열 | `getFleetImages()` 결과 사용 |
| `src/app/training/_components/TrainingContent.tsx` | `"/plane_image.jpg"` 하드코딩 | `getHeroImage("training")` 결과 사용 |
| `src/app/inquiries/_components/InquiriesContent.tsx` | `"/mockDesign.png"` 하드코딩 | `getHeroImage("inquiries")` 결과 사용 |

#### 6-3. Fallback 전략
DB에 이미지가 없거나 오류 시, 기존 `public/` 정적 파일로 폴백:
```typescript
const heroImage = (await getHeroImage("home")) ?? "/landing_Image.png";
```

#### 6-4. next/image 설정
Supabase Storage 외부 URL을 허용하도록 `next.config.ts`에 추가:
```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'nbblgivzblyvwchfydqg.supabase.co',
      pathname: '/storage/v1/object/public/**',
    },
  ],
},
```

### Phase 7: 캐싱 및 최적화

#### 7-1. ISR (Incremental Static Regeneration)
이미지 데이터 페칭에 `revalidate` 설정:
```typescript
// 서버 컴포넌트에서
const images = await getFleetImages(id);
// → 내부적으로 next: { revalidate: 60 } 사용
```

#### 7-2. On-Demand Revalidation
Admin에서 이미지 변경 시 해당 페이지 캐시 무효화:
```typescript
// API route에서 이미지 업로드/삭제 후
import { revalidatePath } from "next/cache";
revalidatePath("/");
revalidatePath("/fleet");
revalidatePath(`/fleet/${aircraftId}`);
```

---

## 4. 최종 파일 구조 (새로 생성/수정되는 파일)

```
src/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx              [NEW]
│   │   ├── page.tsx                    [NEW]
│   │   ├── layout.tsx                  [NEW]
│   │   └── _components/
│   │       ├── AdminLayout.tsx         [NEW]
│   │       ├── FleetImageManager.tsx   [NEW]
│   │       ├── CrewImageManager.tsx    [NEW]
│   │       └── HeroImageManager.tsx    [NEW]
│   ├── api/
│   │   ├── admin/
│   │   │   ├── login/route.ts          [NEW]
│   │   │   ├── logout/route.ts         [NEW]
│   │   │   └── auth/route.ts           [NEW]
│   │   └── images/
│   │       ├── fleet/
│   │       │   ├── route.ts            [NEW]
│   │       │   └── [aircraftId]/
│   │       │       ├── route.ts        [NEW]
│   │       │       └── [imageId]/
│   │       │           └── route.ts    [NEW]
│   │       ├── crew/
│   │       │   └── [memberId]/
│   │       │       └── route.ts        [NEW]
│   │       ├── hero/
│   │       │   └── [pageKey]/
│   │       │       └── route.ts        [NEW]
│   │       └── reorder/
│   │           └── route.ts            [NEW]
│   ├── _components/HomeContent.tsx      [MODIFY]
│   ├── fleet/page.tsx                   [MODIFY]
│   ├── fleet/[id]/page.tsx              [MODIFY]
│   ├── training/_components/TrainingContent.tsx  [MODIFY]
│   └── inquiries/_components/InquiriesContent.tsx [MODIFY]
├── lib/
│   ├── supabase/
│   │   ├── client.ts                   [NEW]
│   │   ├── server.ts                   [NEW]
│   │   └── admin.ts                    [NEW]
│   └── queries/
│       ├── fleet-images.ts             [NEW]
│       ├── crew-images.ts              [NEW]
│       └── hero-images.ts              [NEW]
├── next.config.ts                       [MODIFY]
└── scripts/
    └── seed-images.ts                   [NEW]
```

---

## 5. 구현 순서 체크리스트

- [ ] Supabase Storage bucket 생성 (수동)
- [ ] DB 테이블 생성 (SQL 실행)
- [ ] `@supabase/supabase-js`, `@supabase/ssr` 설치
- [ ] Supabase 클라이언트 유틸리티 (`src/lib/supabase/`)
- [ ] 환경변수 설정 (`.env`)
- [ ] `next.config.ts`에 Supabase 이미지 도메인 추가
- [ ] 기존 이미지 마이그레이션 스크립트 (`scripts/seed-images.ts`)
- [ ] 인증 API (`/api/admin/login`, `logout`, `auth`)
- [ ] Admin 로그인 페이지
- [ ] Admin 레이아웃 + 인증 래퍼
- [ ] 이미지 업로드/삭제 API Routes
- [ ] Fleet 이미지 매니저 UI
- [ ] Crew 이미지 매니저 UI
- [ ] Hero 이미지 매니저 UI
- [ ] 데이터 패칭 유틸리티 (`src/lib/queries/`)
- [ ] 프론트엔드 컴포넌트 이미지 소스 전환 (DB 우선, 정적 폴백)
- [ ] On-Demand Revalidation 연결
- [ ] 기존 `public/` 이미지는 폴백용으로 유지 (삭제하지 않음)
