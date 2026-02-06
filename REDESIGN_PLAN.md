# Skylogix Aviation - Redesign 기획서

## 1. 현재 프로젝트 분석

### 1-1. 기술 스택
| 항목 | 현재 사용 |
|------|----------|
| Framework | Next.js 15.2.0 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4.1.3 |
| Font | Winky Sans (Google), Geist (Vercel) |
| Email | Nodemailer (SMTP) |
| DB | Supabase (설정만 완료, 미사용) |
| ORM | Prisma (설정만 완료, 미사용) |
| 배포 | Vercel |
| 분석 | Vercel Analytics + Speed Insights |

### 1-2. 현재 페이지 구조
```
/ (홈)                    → 랜딩 페이지 (히어로, 비행기 목록, 크루 소개, 푸터)
/becomepilot              → 파일럿 자격 로드맵 (PPL → IFR → CPL → CFI → ATP)
/inquiries                → 문의 폼 (이메일 전송)
/api/send-email           → 이메일 발송 API
/admin/dashboard          → 빈 페이지 (미구현)
/admin/signIn             → 빈 페이지 (미구현)
```

### 1-3. 비즈니스 정보
- **사업**: 비행 훈련 학교 (Flight Training School)
- **위치**: 1395 Fairplex Dr. Hangar D4, La Verne, CA 91750
- **공항**: Brackett Field (KPOC)
- **보유 기체**: Cessna 152 x 3대 (N49202, N4900L, N25976)
- **가격**: 기체 $120/hr (wet), 교관 $55/hr

### 1-4. 현재 문제점
- [ ] 디자인 통일성 부족 (색상/타이포/여백 기준 없음)
- [ ] 반응형 대응 미흡 (모바일 ↔ 데스크톱 전환 어색)
- [ ] 크루 프로필 이미지 미완성 (coming_soon.png)
- [ ] Admin 기능 미구현
- [ ] DB 연동 미사용 (Supabase/Prisma 설정만 존재)
- [ ] 일부 오타 ("Sussecegfull" 등)
- [ ] 컴포넌트 분리 부족 (page.tsx에 모든 UI 집중)

---

## 2. 리디자인 목표

### 2-1. 디자인 방향
> **키워드**: 신뢰감 / 전문성 / 항공 / 모던 / 클린

| 항목 | 방향 |
|------|------|
| 톤 | 다크 네이비 + 골드 악센트 (#FFBD59 유지 or 변경) |
| 레이아웃 | 여백 충분, 섹션 구분 명확 |
| 타이포 | 제목(Bold/Display), 본문(Regular/Clean) |
| 이미지 | 고품질 항공 사진, 히어로 풀스크린 |
| 애니메이션 | 스크롤 기반 페이드인, 부드러운 전환 |

### 2-2. 핵심 목표
1. **전환율 향상** - CTA(문의/체험비행) 도달률 극대화
2. **신뢰 구축** - 전문적이고 안전한 느낌의 UI
3. **모바일 퍼스트** - 모바일 사용자 경험 우선 설계
4. **성능 최적화** - LCP < 2.5s, CLS < 0.1
5. **확장 가능** - Admin, 예약 시스템 등 향후 기능 대비

---

## 3. 새로운 사이트맵

```
                    ┌─────────────────┐
                    │    / (홈)       │
                    │   Landing Page  │
                    └────────┬────────┘
                             │
        ┌────────────┬───────┼───────┬──────────────┐
        ▼            ▼       ▼       ▼              ▼
   /about        /fleet  /training  /inquiries   /admin
   회사 소개     기체 목록  훈련 과정   문의하기     관리자
                    │       │
                    ▼       ▼
              /fleet/[id]  /training/[step]
              기체 상세     과정 상세
```

### 3-1. 페이지별 상세

| 페이지 | 경로 | 설명 | 우선순위 |
|--------|------|------|----------|
| 홈 | `/` | 히어로 + 핵심 서비스 + CTA + 리뷰 | P0 |
| 회사 소개 | `/about` | 스토리, 미션, 크루 소개, 시설 | P1 |
| 기체 목록 | `/fleet` | 보유 기체 카드 리스트 | P0 |
| 기체 상세 | `/fleet/[id]` | 개별 기체 스펙 + 갤러리 | P1 |
| 훈련 과정 | `/training` | PPL→ATP 로드맵 타임라인 | P0 |
| 과정 상세 | `/training/[step]` | 각 자격증 상세 (시간, 비용, 요건) | P2 |
| 문의하기 | `/inquiries` | 폼 + 지도 + 연락처 | P0 |
| Admin 로그인 | `/admin/signin` | 관리자 인증 | P2 |
| Admin 대시보드 | `/admin/dashboard` | 문의 관리, 기체 관리 | P2 |

---

## 4. 페이지별 섹션 기획

### 4-1. 홈 (`/`)
```
┌─────────────────────────────────────────────┐
│  [Nav] Logo ─── About Fleet Training Contact │
├─────────────────────────────────────────────┤
│                                             │
│  ███████████████████████████████████████████ │
│  █         HERO SECTION                   █ │
│  █  "Your Journey to the Sky              █ │
│  █   Starts Here"                         █ │
│  █                                        █ │
│  █  [Book Discovery Flight] [Learn More]  █ │
│  ███████████████████████████████████████████ │
│                                             │
├─────────────────────────────────────────────┤
│  WHY SKYLOGIX?                              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │ 전문교관 │ │ 합리적  │ │ 최신기체 │       │
│  │         │ │ 가격    │ │         │       │
│  └─────────┘ └─────────┘ └─────────┘       │
├─────────────────────────────────────────────┤
│  OUR FLEET (카드 3개 슬라이드)               │
│  ┌──────┐ ┌──────┐ ┌──────┐                 │
│  │N49202│ │N4900L│ │N25976│                 │
│  │ 사진 │ │ 사진 │ │ 사진 │                 │
│  │$120/h│ │$120/h│ │$120/h│                 │
│  └──────┘ └──────┘ └──────┘                 │
├─────────────────────────────────────────────┤
│  TRAINING PATHWAY (간략 타임라인)            │
│  PPL → IFR → CPL → CFI → ATP               │
├─────────────────────────────────────────────┤
│  TESTIMONIALS (리뷰/후기)                    │
├─────────────────────────────────────────────┤
│  CTA BANNER                                 │
│  "Ready to Fly?" [Contact Us]               │
├─────────────────────────────────────────────┤
│  [Footer] 주소 | 전화 | 이메일 | 운영시간    │
└─────────────────────────────────────────────┘
```

### 4-2. 기체 목록 (`/fleet`)
```
┌─────────────────────────────────────────────┐
│  페이지 헤더: "Our Fleet"                    │
├─────────────────────────────────────────────┤
│  필터/정렬 바 (선택사항)                     │
├─────────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐    │
│  │  N49202 - Cessna 152 II             │    │
│  │  [사진 갤러리]     스펙 요약         │    │
│  │                    $120/hr wet       │    │
│  │                    [상세 보기 →]      │    │
│  └─────────────────────────────────────┘    │
│  ┌─────────────────────────────────────┐    │
│  │  N4900L - Cessna 152 II             │    │
│  │  ...                                │    │
│  └─────────────────────────────────────┘    │
│  ┌─────────────────────────────────────┐    │
│  │  N25976 - Cessna 152 II             │    │
│  │  ...                                │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

### 4-3. 훈련 과정 (`/training`)
```
┌─────────────────────────────────────────────┐
│  "Become a Pilot"                           │
├─────────────────────────────────────────────┤
│  수직 타임라인 (스크롤 애니메이션)            │
│                                             │
│  ● STEP 1: Private Pilot (PPL)              │
│  │  40시간 비행, 요건 요약                   │
│  │  [자세히 보기 →]                          │
│  │                                          │
│  ● STEP 2: Instrument Rating (IFR)          │
│  │  ...                                     │
│  │                                          │
│  ● STEP 3: Commercial Pilot (CPL)           │
│  │  ...                                     │
│  │                                          │
│  ● STEP 4: Flight Instructor (CFI)          │
│  │  ...                                     │
│  │                                          │
│  ● STEP 5: Airline Transport (ATP)          │
│     최종 목표 도달                           │
├─────────────────────────────────────────────┤
│  CTA: "Start Your Journey" [문의하기]        │
└─────────────────────────────────────────────┘
```

### 4-4. 문의하기 (`/inquiries`)
```
┌─────────────────────────────────────────────┐
│  "Contact Us"                               │
├──────────────────┬──────────────────────────┤
│  문의 폼         │  연락처 정보              │
│  ─────────       │  ─────────               │
│  이름            │  📍 1395 Fairplex Dr...  │
│  이메일          │  📞 (562) 266-6868       │
│  전화번호        │  ✉ info@skylogix...      │
│  문의 유형 선택  │  🕐 Mon-Fri 9am-4pm     │
│  메시지          │                          │
│                  │  [Google Map Embed]       │
│  [전송]          │                          │
└──────────────────┴──────────────────────────┘
```

---

## 5. 컴포넌트 아키텍처

### 5-1. 공통 컴포넌트 (Shared)
```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # 네비게이션 (모바일 햄버거 포함)
│   │   ├── Footer.tsx          # 사이트 푸터
│   │   └── Container.tsx       # 콘텐츠 최대폭 래퍼
│   │
│   ├── ui/
│   │   ├── Button.tsx          # 버튼 (primary, secondary, ghost)
│   │   ├── Card.tsx            # 범용 카드
│   │   ├── Badge.tsx           # 태그/뱃지
│   │   ├── Input.tsx           # 폼 인풋
│   │   ├── Textarea.tsx        # 폼 텍스트에리어
│   │   ├── Select.tsx          # 폼 셀렉트
│   │   └── ImageGallery.tsx    # 이미지 갤러리/캐러셀
│   │
│   └── sections/
│       ├── HeroSection.tsx     # 히어로 배너
│       ├── CTABanner.tsx       # 행동 유도 배너
│       └── SectionHeader.tsx   # 섹션 제목 + 서브타이틀
```

### 5-2. 페이지별 컴포넌트
```
src/app/
├── (home)/
│   ├── page.tsx
│   └── _components/
│       ├── WhyUs.tsx           # 장점 소개 카드
│       ├── FleetPreview.tsx    # 기체 미리보기
│       ├── TrainingPreview.tsx # 훈련과정 미리보기
│       └── Testimonials.tsx    # 후기 섹션
│
├── about/
│   ├── page.tsx
│   └── _components/
│       ├── Story.tsx           # 회사 스토리
│       ├── Mission.tsx         # 미션/비전
│       └── CrewCard.tsx        # 크루 멤버 카드
│
├── fleet/
│   ├── page.tsx
│   ├── [id]/
│   │   └── page.tsx
│   └── _components/
│       ├── PlaneCard.tsx       # 기체 카드
│       └── PlaneSpecs.tsx      # 기체 스펙 테이블
│
├── training/
│   ├── page.tsx
│   ├── [step]/
│   │   └── page.tsx
│   └── _components/
│       ├── Timeline.tsx        # 수직 타임라인
│       └── StepCard.tsx        # 과정 카드
│
└── inquiries/
    ├── page.tsx
    └── _components/
        ├── ContactForm.tsx     # 문의 폼
        └── ContactInfo.tsx     # 연락처 + 지도
```

---

## 6. 디자인 시스템

### 6-1. 컬러 팔레트
```
Primary (네이비 계열)
├── 900: #0A1628    ← 메인 다크
├── 800: #132238
├── 700: #1B3A5C
├── 500: #2E5E8E    ← 기본 Primary
├── 300: #6B9FCC
└── 100: #E8F1FA

Accent (골드 계열)
├── 600: #D49A2A
├── 500: #FFBD59    ← 현재 악센트 유지
├── 400: #FFCF7E
└── 100: #FFF5E0

Neutral (회색 계열)
├── 900: #111827
├── 700: #374151
├── 500: #6B7280
├── 300: #D1D5DB
├── 100: #F3F4F6
└──  50: #F9FAFB

Status
├── Success: #22C55E
├── Error:   #EF4444
└── Info:    #3B82F6
```

### 6-2. 타이포그래피
```
Display (히어로 제목)     → 48-72px / Bold / Winky Sans
Heading 1 (페이지 제목)   → 36-48px / Bold
Heading 2 (섹션 제목)     → 28-36px / SemiBold
Heading 3 (카드 제목)     → 20-24px / SemiBold
Body Large                → 18px / Regular
Body                      → 16px / Regular
Body Small                → 14px / Regular
Caption                   → 12px / Medium
```

### 6-3. 간격 시스템
```
Section 간격: 80-120px (모바일: 48-64px)
컴포넌트 간격: 24-48px
요소 내부 간격: 16-24px
텍스트 간격: 8-16px
```

### 6-4. 브레이크포인트
```
mobile:   < 640px     (기본)
tablet:   ≥ 640px     (sm)
laptop:   ≥ 1024px    (lg)
desktop:  ≥ 1280px    (xl)
```

---

## 7. 데이터 구조

### 7-1. 기체 데이터 (Fleet)
```typescript
interface Aircraft {
  id: string;              // "N49202"
  name: string;            // "Cessna 152 II"
  year: number;            // 1977
  registration: string;    // "N49202"
  engine: string;          // "Lycoming O-235"
  horsepower: number;      // 115
  ifrRated: boolean;       // true
  ratePerHour: number;     // 120
  images: string[];        // ["/N49202/N49202_1.jpeg", ...]
  status: "available" | "maintenance" | "reserved";
}
```

### 7-2. 훈련 과정 데이터
```typescript
interface TrainingStep {
  id: string;              // "ppl"
  order: number;           // 1
  title: string;           // "Private Pilot License"
  abbreviation: string;    // "PPL"
  description: string;
  minimumHours: number;    // 40
  estimatedCost: string;   // "$8,000 - $12,000"
  requirements: string[];
  duration: string;        // "3-6 months"
}
```

### 7-3. 크루 데이터
```typescript
interface CrewMember {
  id: string;
  name: string;
  role: string;            // "Chief Flight Instructor"
  bio: string;
  image: string;
  certifications: string[];
}
```

---

## 8. 구현 단계

### Phase 1: 기반 구축 (Foundation)
> 예상 작업: 디자인 시스템 + 레이아웃

- [ ] Tailwind 테마 설정 (컬러, 타이포, 간격)
- [ ] `Header` 컴포넌트 (반응형 네비, 모바일 메뉴)
- [ ] `Footer` 컴포넌트
- [ ] `Container`, `Button`, `Card` 등 UI 기초 컴포넌트
- [ ] `SectionHeader`, `CTABanner` 공통 섹션
- [ ] 글로벌 레이아웃 정리 (layout.tsx)

### Phase 2: 메인 페이지 (Core Pages)
> 예상 작업: P0 페이지 구현

- [ ] 홈페이지 리디자인 (히어로, Why Us, Fleet Preview, CTA)
- [ ] 기체 목록 페이지 (`/fleet`)
- [ ] 훈련 과정 페이지 (`/training`) - 타임라인 UI
- [ ] 문의 페이지 리디자인 (`/inquiries`) - 폼 + 지도

### Phase 3: 상세 페이지 (Detail Pages)
> 예상 작업: P1 페이지 구현

- [ ] 회사 소개 페이지 (`/about`)
- [ ] 기체 상세 페이지 (`/fleet/[id]`)
- [ ] 훈련 과정 상세 (`/training/[step]`)

### Phase 4: 인터랙션 & 최적화 (Polish)
> 예상 작업: 애니메이션, SEO, 성능

- [ ] 스크롤 애니메이션 (Intersection Observer / CSS)
- [ ] 이미지 최적화 (next/image, WebP, lazy loading)
- [ ] SEO 메타데이터 (각 페이지별 title, description, OG)
- [ ] 접근성 점검 (aria, keyboard nav, contrast)
- [ ] 성능 최적화 (Core Web Vitals 목표 달성)

### Phase 5: Admin & 확장 (Future)
> 예상 작업: P2 기능

- [ ] Admin 인증 (Supabase Auth)
- [ ] 문의 관리 대시보드
- [ ] 기체 관리 CRUD
- [ ] 예약 시스템 (선택)

---

## 9. 파일 구조 (최종)

```
src/
├── app/
│   ├── layout.tsx                    # 루트 레이아웃
│   ├── page.tsx                      # 홈
│   ├── globals.css                   # Tailwind + 커스텀 CSS
│   │
│   ├── about/
│   │   ├── page.tsx
│   │   └── _components/
│   │
│   ├── fleet/
│   │   ├── page.tsx
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   └── _components/
│   │
│   ├── training/
│   │   ├── page.tsx
│   │   ├── [step]/
│   │   │   └── page.tsx
│   │   └── _components/
│   │
│   ├── inquiries/
│   │   ├── page.tsx
│   │   └── _components/
│   │
│   └── admin/
│       ├── signin/
│       │   └── page.tsx
│       └── dashboard/
│           └── page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   │
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   └── ImageGallery.tsx
│   │
│   └── sections/
│       ├── HeroSection.tsx
│       ├── CTABanner.tsx
│       └── SectionHeader.tsx
│
├── data/
│   ├── fleet.ts                      # 기체 데이터
│   ├── training.ts                   # 훈련 과정 데이터
│   └── crew.ts                       # 크루 데이터
│
├── lib/
│   ├── utils.ts                      # 유틸 함수
│   └── constants.ts                  # 상수 (연락처, 주소 등)
│
├── types/
│   └── index.ts                      # 공통 타입 정의
│
└── pages/
    └── api/
        └── send-email.ts             # 이메일 API (기존 유지)
```

---

## 10. 결정 필요 사항

리디자인 시작 전 확인이 필요한 항목들:

| # | 질문 | 선택지 |
|---|------|--------|
| 1 | 컬러 테마 | A) 다크 네이비 + 골드 / B) 화이트 + 블루 / C) 기타 |
| 2 | 애니메이션 라이브러리 | A) CSS only / B) Framer Motion / C) GSAP |
| 3 | UI 컴포넌트 라이브러리 | A) 직접 구현 / B) shadcn/ui / C) Radix UI |
| 4 | 지도 연동 | A) Google Maps Embed / B) Mapbox / C) 없음 |
| 5 | 기체 데이터 관리 | A) 정적 데이터 유지 / B) Supabase DB 연동 |
| 6 | Admin 페이지 | A) 이번에 구현 / B) 추후 구현 |
| 7 | 다국어 지원 | A) 영어만 / B) 영어 + 한국어 |

---

> **다음 단계**: 위 결정 사항을 확정한 후, Phase 1부터 순차 구현을 시작합니다.
