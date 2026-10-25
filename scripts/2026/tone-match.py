"""[2026 전용 도구] 2026 시안 기준 규칙이라 다른 연도에 그대로 쓰지 말 것.
프로필 사진 한 장의 톤을 다른 사진들에 맞추기 (scripts/2026/profile-photos.py로 만든 웹용 WebP에 덮어씀).

다른 사진들과 조명·보정이 달라 혼자 튀는 사진용 — 2026-10-23 오지샘(p57) 자유컷에 처음 씀.
  1) 피부만 기준 사진들의 피부 평균색으로: 따뜻한 색(R−B가 큰) 픽셀일수록 채널별 비율(기준 피부 ÷ 이 사진 피부)을 더 세게 곱함
     → 배경 회색·검정 옷처럼 무채색은 그대로, 얼굴·목·손만 톤이 내려감
  2) 전체에 약한 톤 곡선으로 검정을 살짝 들어 올려 대비를 줄임(--lift), 배경 회색(238)과 흰색은 그대로
  3) 그래도 혼자 웜하면 피부 쪽만 채도를 줄이고(--desat) 빨강을 조금 빼고 파랑을 조금 더함(--cool)
  4) 너무 창백해지면 피부 쪽 채도를 올리되(--desat 음수, 입술·볼처럼 이미 진한 곳은 제외) 초록을 조금 빼서
     웜하지 않은 쿨한 분홍기로(--magenta). --pink(빨강 +)는 너무 빨개져서 오지샘 사진엔 안 씀
  5) 아래쪽 흰 옷이 너무 밝아 튀면 밝기만 낮춤(--dim-white)
기준 사진은 같은 폴더의 다른 WebP 전부.

실행 (site.2026 폴더에서, Pillow·numpy 필요) — profile-photos.py를 다시 돌렸다면 이것도 다시:
  python3 scripts/2026/tone-match.py public/2026/committee/p57-oh-jisaem.webp --strength 0.8 --desat -0.4 --cool 6 --magenta 3 --dim-white 0.9
"""
import argparse
from pathlib import Path

import numpy as np
from PIL import Image

BG = 238  # 사진 배경 회색 (#EEEEEE 근처) — 그대로 둠


def skin_mean(a: np.ndarray) -> np.ndarray:
    """가운데 위쪽(얼굴 부근)에서 피부색 같은 픽셀 평균."""
    h, w, _ = a.shape
    c = a[int(h * 0.15) : int(h * 0.6), int(w * 0.25) : int(w * 0.75)].reshape(-1, 3).astype(float)
    r, g, b = c[:, 0], c[:, 1], c[:, 2]
    m = (r > 110) & (r > g + 8) & (g > b) & (r - b > 20) & (r < 250)
    return c[m].mean(axis=0)


def curve(src: float, dst: float, lift: float) -> np.ndarray:
    """0→lift, src→dst, BG→BG, 255→255 를 지나는 단조 곡선(PCHIP)의 0~255 표."""
    xs = np.array([0, src, BG, 255], float)
    ys = np.array([lift, dst, BG, 255], float)
    # PCHIP(모양 보존 3차) — numpy만으로 계산
    h = np.diff(xs)
    d = np.diff(ys) / h
    m = np.zeros_like(xs)
    for k in range(1, len(xs) - 1):
        if d[k - 1] * d[k] > 0:
            w1, w2 = 2 * h[k] + h[k - 1], h[k] + 2 * h[k - 1]
            m[k] = (w1 + w2) / (w1 / d[k - 1] + w2 / d[k])
    m[0], m[-1] = d[0], d[-1]
    x = np.arange(256, dtype=float)
    i = np.clip(np.searchsorted(xs, x, side="right") - 1, 0, len(xs) - 2)
    t = (x - xs[i]) / h[i]
    h00, h10, h01, h11 = 2 * t**3 - 3 * t**2 + 1, t**3 - 2 * t**2 + t, -2 * t**3 + 3 * t**2, t**3 - t**2
    return np.clip(h00 * ys[i] + h10 * h[i] * m[i] + h01 * ys[i + 1] + h11 * h[i] * m[i + 1], 0, 255)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("target")
    ap.add_argument("--refs", help="기준 사진 폴더 (기본: 대상과 같은 폴더)")
    ap.add_argument("--lift", type=float, default=8, help="검정을 이만큼 들어 올림(대비 줄이기)")
    ap.add_argument("--strength", type=float, default=1.0, help="피부색 맞추는 정도 0~1")
    ap.add_argument("--desat", type=float, default=0.0, help="피부 쪽 채도 줄이는 정도 0~1 (음수면 채도를 올림)")
    ap.add_argument("--cool", type=float, default=0.0, help="피부 쪽 빨강을 뺄 양(파랑은 그 0.6배 더함)")
    ap.add_argument("--pink", type=float, default=0.0, help="피부 쪽 빨강을 더할 양(초록은 그 0.6배 뺌)")
    ap.add_argument("--magenta", type=float, default=0.0, help="피부 쪽 초록만 뺄 양 — 웜하지 않은(쿨한) 분홍기")
    ap.add_argument("--dim-white", type=float, default=1.0, help="아래쪽 가운데 흰 옷의 밝기 배율(1 = 그대로, 0.85면 255→217)")
    a = ap.parse_args()

    target = Path(a.target)
    ref_dir = Path(a.refs) if a.refs else target.parent
    me = target.name.split("-")[0]  # 같은 사람(p57 등)의 다른 버전은 기준에서 뺌
    refs = [p for p in ref_dir.glob("*.webp") if p.name.split("-")[0] != me]
    ref_skin = np.mean([skin_mean(np.asarray(Image.open(p).convert("RGB"))) for p in refs], axis=0)

    img = np.asarray(Image.open(target).convert("RGB"))
    src_skin = skin_mean(img)
    gain = 1 + (ref_skin / src_skin - 1) * a.strength
    f = img.astype(float)
    warm = np.clip((f[..., 0] - f[..., 2] - 8) / 22, 0, 1)[..., None]  # R−B 8 이하 무채색 0 → 30 이상 피부 1
    f = f * (1 + (gain - 1) * warm)
    out = np.empty_like(img)
    for ch in range(3):
        lut = curve(128, 128 + a.lift * (1 - 128 / BG), a.lift)  # 검정만 살짝 들어 올리는 약한 곡선
        out[..., ch] = lut[np.clip(f[..., ch], 0, 255).round().astype(np.uint8)].round().astype(np.uint8)
    if a.desat or a.cool or a.pink or a.magenta:
        f = out.astype(float)
        warm = np.clip((f[..., 0] - f[..., 2] - 8) / 22, 0, 1)[..., None]
        lum = (0.299 * f[..., 0] + 0.587 * f[..., 1] + 0.114 * f[..., 2])[..., None]
        k = warm
        if a.desat < 0:
            # 채도를 올릴 땐 이미 채도가 높은 곳(입술·볼 터치)은 빼고 옅은 피부만 — 안 그러면 입술이 빨개짐
            mx, mn = f.max(axis=-1, keepdims=True), f.min(axis=-1, keepdims=True)
            sat = (mx - mn) / np.maximum(mx, 1)
            k = warm * np.clip(1 - (sat - 0.18) / 0.1, 0, 1)
        f = lum + (f - lum) * (1 - a.desat * k)
        f[..., 0] -= a.cool * warm[..., 0]
        f[..., 2] += a.cool * 0.6 * warm[..., 0]
        f[..., 0] += a.pink * warm[..., 0]
        f[..., 1] -= a.pink * 0.6 * warm[..., 0]
        f[..., 1] -= a.magenta * warm[..., 0]
        out = np.clip(f, 0, 255).round().astype(np.uint8)
    if a.dim_white != 1.0:
        # 검정 옷 사이로 보이는 흰 옷(오지샘 레이스 이너)이 대비가 너무 세서 혼자 튐 → 밝기만 낮춤.
        # 아래 22%·가운데 60% 안의 밝고 무채색인 픽셀만(피부는 웜해서, 배경은 그 범위에 없어서 제외), 경계는 부드럽게
        f = out.astype(float)
        h, w, _ = f.shape
        lum = f.mean(axis=-1)
        neutral = np.clip(1 - (f[..., 0] - f[..., 2] - 6) / 8, 0, 1)
        bright = np.clip((lum - 150) / 50, 0, 1)
        area = np.zeros((h, w))
        area[int(h * 0.78) :, int(w * 0.2) : int(w * 0.8)] = 1
        k = (neutral * bright * area)[..., None]
        out = np.clip(f * (1 + (a.dim_white - 1) * k), 0, 255).round().astype(np.uint8)
    # WebP(손실) 저장은 평평한 회색 238을 239로 1 올려 버림 → 배경이 다른 사진들과 같은 238로 남도록 미리 237로 넣어 둠
    out[(out == BG).all(axis=-1)] = BG - 1
    Image.fromarray(out).save(target, "WEBP", quality=85, method=6)
    print(f"{target.name}: skin {src_skin.round()} -> {skin_mean(out).round()} (ref {ref_skin.round()})")


main()
