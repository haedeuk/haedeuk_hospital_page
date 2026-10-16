import 'server-only';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { CLINIC } from '@/constants/clinic';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

// OG 이미지는 테마와 무관하게 아이보리 한 벌이다. 카카오톡·검색 결과 미리보기에서 보인다.
const COLOR = {
  page: '#FAF9F7',
  text: '#1F1C19',
  muted: '#5E564E',
  gold: '#A8844A',
  marble: '#4A3D33',
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
  const [serif, sans, logo] = await Promise.all([
    loadGoogleFont('Hahmlet', 500, title),
    loadGoogleFont('Noto Sans KR', 500, `${description}${footer}`),
    loadLogo(),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: 36,
          background: COLOR.page,
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '56px 64px',
            border: `1px solid ${COLOR.gold}`,
            borderRadius: 4,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={342} height={49} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontFamily: 'Serif',
                fontSize: 72,
                lineHeight: 1.25,
                letterSpacing: -2,
                // 한글이 한 글자씩 다음 줄로 떨어지지 않게 어절 단위로 끊는다
                wordBreak: 'keep-all',
                color: COLOR.text,
              }}
            >
              {title}
            </div>
            <div style={{ marginTop: 22, fontFamily: 'Sans', fontSize: 28, lineHeight: 1.5, color: COLOR.muted, wordBreak: 'keep-all' }}>
              {description}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: 72,
                height: 4,
                marginRight: 20,
                background: COLOR.marble,
              }}
            />
            <div style={{ fontFamily: 'Sans', fontSize: 22, color: COLOR.muted }}>{footer}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Serif', data: serif, weight: 500, style: 'normal' },
        { name: 'Sans', data: sans, weight: 500, style: 'normal' },
      ],
    },
  );
}
