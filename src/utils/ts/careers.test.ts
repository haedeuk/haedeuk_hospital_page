import { describe, expect, it } from 'vitest';
import { joinCareers, parseCareers, splitCareerTag } from './careers';

describe('parseCareers', () => {
  it('줄마다 하나씩 나누고 앞뒤 공백을 지운다', () => {
    expect(parseCareers('  현) 대표원장 \n전) 진료원장')).toEqual(['현) 대표원장', '전) 진료원장']);
  });

  it('빈 줄과 윈도우 줄바꿈을 처리한다', () => {
    expect(parseCareers('가\r\n\r\n   \n나\n')).toEqual(['가', '나']);
  });

  it('joinCareers 와 왕복해도 같다', () => {
    const careers = ['한방비만학회 회원', '대한약침학회 회원'];
    expect(parseCareers(joinCareers(careers))).toEqual(careers);
  });
});

describe('splitCareerTag', () => {
  it('현) / 전) 머리말을 태그로 뗀다', () => {
    expect(splitCareerTag('현) 해득금천한의원 대표원장')).toEqual({ tag: '현', text: '해득금천한의원 대표원장' });
    expect(splitCareerTag('전)동수원한방병원')).toEqual({ tag: '전', text: '동수원한방병원' });
  });

  it('머리말이 없으면 그대로 둔다', () => {
    expect(splitCareerTag('경희대학교 한의과대학 졸업')).toEqual({ tag: null, text: '경희대학교 한의과대학 졸업' });
  });
});
