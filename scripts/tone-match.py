"""프로필 사진 한 장의 톤을 다른 사진들에 맞추기 (profile-photos.py로 만든 웹용 WebP에 덮어씀).

다른 사진들과 조명·보정이 달라 혼자 튀는 사진용 — 2026-10-23 오지샘(p57) 자유컷에 처음 씀.
  1) 피부만 기준 사진들의 피부 평균색으로: 따뜻한 색(R−B가 큰) 픽셀일수록 채널별 비율(기준 피부 ÷ 이 사진 피부)을 더 세게 곱함
     → 배경 회색·검정 옷처럼 무채색은 그대로, 얼굴·목·손만 톤이 내려감
  2) 전체에 약한 톤 곡선으로 검정을 살짝 들어 올려 대비를 줄임(--lift), 배경 회색(238)과 흰색은 그대로
기준 사진은 같은 폴더의 다른 WebP 전부.

실행 (site.2026 폴더에서, Pillow·numpy 필요) — profile-photos.py를 다시 돌렸다면 이것도 다시:
  python3 scripts/tone-match.py public/2026/committee/p57-oh-jisaem.webp
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
    ap.add_argument("--lift", type=float, default=8, help="검정을 이만큼 들어 올림(대비 줄이기)")
    ap.add_argument("--strength", type=float, default=1.0, help="피부색 맞추는 정도 0~1")
    a = ap.parse_args()

    target = Path(a.target)
    refs = [p for p in target.parent.glob("*.webp") if p != target]
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
    Image.fromarray(out).save(target, "WEBP", quality=85, method=6)
    print(f"{target.name}: skin {src_skin.round()} -> {skin_mean(out).round()} (ref {ref_skin.round()})")


main()
