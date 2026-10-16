import 'server-only';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { CLINIC } from '@/constants/clinic';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

// OG 이미지는 테마와 무관하게 한 벌이다(카카오톡·검색 결과 미리보기). 흰 바탕 + 딥그린 띠.
const COLOR = {
  page: '#FBFBF9',
  text: '#1E2A23',
  muted: '#56635B',
  green: '#24382D',
  onGreen: '#E9EFE9',
  gold: '#C9A66B',
};

// satori 는 woff2 를 읽지 못한다. 빌드 시 Google Fonts 에서 화면에 쓰는 글자만 TTF 로 받는다.
async function loadGoogleFont(family: string, weight: number, text: string): Promise<ArrayBuffer> {
  const query = `family=${family.replace(/ /g, '+')}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(`https://fonts.googleapis.com/css2?${query}`)).text();
  const source = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);

  if (!source) throw new Error(`OG 폰트를 찾지 못했습니다: ${family} ${weight}`);
  return (await fetch(source[1])).arrayBuffer();
}

async function loadLogo(): Promise<string> {
  const file = await readFile(join(process.cwd(), 'src/assets/images/logo/logo-gold.png'));
  return `data:image/png;base64,${file.toString('base64')}`;
}

interface OgImageInput {
  title: string;
  description: string;
}

export async function renderOgImage({ title, description }: OgImageInput) {
  const footer = `${CLINIC.address.full}   ${CLINIC.phone}`;
  const [titleFont, sans, logo] = await Promise.all([
    loadGoogleFont('Noto Sans KR', 700, title),
    loadGoogleFont('Noto Sans KR', 500, `${description}${footer}365일 진료 입원실 운영`),
    loadLogo(),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: COLOR.page }}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '64px 72px',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={342} height={49} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontFamily: 'Title',
                fontSize: 68,
                lineHeight: 1.22,
                letterSpacing: -3,
                // 한글이 한 글자씩 다음 줄로 떨어지지 않게 어절 단위로 끊는다
                wordBreak: 'keep-all',
                color: COLOR.text,
              }}
            >
              {title}
            </div>
            <div
              style={{
                marginTop: 22,
                fontFamily: 'Sans',
                fontSize: 27,
                lineHeight: 1.5,
                color: COLOR.muted,
                wordBreak: 'keep-all',
              }}
            >
              {description}
            </div>
          </div>
          <div style={{ fontFamily: 'Sans', fontSize: 21, color: COLOR.muted }}>{footer}</div>
        </div>
        <div
          style={{
            width: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: 10,
            padding: '64px 48px',
            background: COLOR.green,
          }}
        >
          <div style={{ fontFamily: 'Sans', fontSize: 24, color: COLOR.gold }}>365일 진료</div>
          <div style={{ fontFamily: 'Sans', fontSize: 30, color: COLOR.onGreen }}>입원실 운영</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Title', data: titleFont, weight: 700, style: 'normal' },
        { name: 'Sans', data: sans, weight: 500, style: 'normal' },
      ],
    },
  );
}
