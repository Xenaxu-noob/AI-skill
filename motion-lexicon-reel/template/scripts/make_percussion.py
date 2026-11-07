#!/usr/bin/env python3
"""Original light-percussion bed for "Motion Lexicon" — synthesised locally, no samples.

100 BPM (one beat = 0.6 s) so every cut in the film lands on the grid.
Everything is generated from sine partials and filtered noise; the mix peaks at -1 dBFS.
"""
import numpy as np
import wave
import struct
import sys

SR = 48000


def t_axis(dur):
    return np.arange(int(dur * SR)) / SR


def env_exp(dur, tau, attack=0.002):
    t = t_axis(dur)
    e = np.exp(-t / tau)
    a = np.clip(t / attack, 0, 1) if attack > 0 else 1.0
    return e * a


def env_bell(dur, shape=2.0):
    t = np.linspace(0, 1, int(dur * SR))
    return (np.sin(np.pi * t) ** shape)


def fft_band(x, lo, hi, order=2):
    """Zero-phase Butterworth-magnitude band pass applied in the frequency domain."""
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    f = np.maximum(f, 1e-6)
    lowpass = 1.0 / (1.0 + (f / max(hi, 1e-6)) ** (2 * order))
    highpass = 1.0 / (1.0 + (max(lo, 1e-6) / f) ** (2 * order))
    return np.fft.irfft(X * lowpass * highpass, n=len(x))


def noise(n, seed):
    return np.random.default_rng(seed).standard_normal(n)


def kick(dur=0.55, f0=118, f1=44, seed=1):
    t = t_axis(dur)
    f = f1 + (f0 - f1) * np.exp(-t / 0.028)
    phase = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(phase) * env_exp(dur, 0.13, 0.001)
    click = noise(int(0.004 * SR), seed) * np.linspace(1, 0, int(0.004 * SR)) * 0.25
    out = body
    out[: len(click)] += click
    return np.tanh(out * 1.6) * 0.9


def shaker(dur=0.11, seed=7):
    n = noise(int(dur * SR), seed)
    x = fft_band(n, 3200, 11000, order=1.4)
    x /= np.max(np.abs(x)) + 1e-9
    return x * env_exp(dur, 0.028, 0.004)


def rim(dur=0.09, seed=3):
    n = noise(int(dur * SR), seed)
    x = fft_band(n, 1700, 5200, order=2.2)
    x /= np.max(np.abs(x)) + 1e-9
    tone = np.sin(2 * np.pi * 1650 * t_axis(dur)) * 0.25
    return (x + tone) * env_exp(dur, 0.018, 0.001)


def whoosh(dur=0.72, seed=11):
    t = t_axis(dur)
    n = noise(len(t), seed)
    out = np.zeros_like(n)
    # three crossfading bands, sweeping upward
    seg = len(t) // 3
    for i, (lo, hi) in enumerate([(300, 900), (700, 2200), (1600, 5200)]):
        band = fft_band(n, lo, hi, order=1.6)
        w = np.clip(1 - np.abs(t - (i + 0.5) * dur / 3) / (dur / 3), 0, 1) ** 1.4
        out += band * w
    out /= np.max(np.abs(out)) + 1e-9
    return out * env_bell(dur, 2.6)


def impact(dur=1.1, seed=5):
    t = t_axis(dur)
    sub = np.sin(2 * np.pi * (56 + 14 * np.exp(-t / 0.09)) * t) * env_exp(dur, 0.32, 0.001)
    thud = fft_band(noise(len(t), seed), 60, 420, order=1.8) * env_exp(dur, 0.07, 0.001) * 0.5
    return np.tanh((sub + thud) * 1.5) * 0.85


def tick(dur=0.05, seed=9):
    n = noise(int(dur * SR), seed)
    x = fft_band(n, 2400, 9000, order=2.4)
    x /= np.max(np.abs(x)) + 1e-9
    return x * env_exp(dur, 0.012, 0.001)


def place(bus, sig, at, gain=1.0, pan=0.0):
    i = int(at * SR)
    if i >= len(bus):
        return
    sig = sig[: len(bus) - i]
    l = gain * np.sqrt((1 - pan) / 2)
    r = gain * np.sqrt((1 + pan) / 2)
    bus[i : i + len(sig), 0] += sig * l
    bus[i : i + len(sig), 1] += sig * r


def db(x):
    return 10 ** (x / 20)


def main(path="assets/audio/percussion.wav", length=15.8):
    n = int(length * SR)
    bus = np.zeros((n, 2))

    # 120 BPM: one beat = 0.5 s, cuts land every third beat
    beat = 0.45
    # pulse: shaker on every eighth, accented on the beat
    t = 0.0
    k = 0
    while t < 12.4:
        on_beat = k % 2 == 0
        g = db(-23) if not on_beat else db(-19)
        place(bus, shaker(seed=7 + k % 5), t, g * (0.65 if t > 12.4 else 1.0), pan=0.18 if on_beat else -0.18)
        t += beat / 2
        k += 1

    # kick: half-time pulse, plus one on every cut
    pulse = [i * 0.45 for i in range(0, 28) if i % 2 == 0]
    for i, at in enumerate(pulse):
        place(bus, kick(seed=1 + i), at, db(-17 if i % 2 == 0 else -22))

    cuts = [round(i * 0.9, 2) for i in range(14)]
    for i, at in enumerate(cuts):
        place(bus, kick(f0=132, f1=48, seed=21 + i), at, db(-11))

    # ledger entries: a dry rim tick, one per row
    rows = [round(i * 0.9 + 0.62, 2) for i in range(14)]
    for i, at in enumerate(rows):
        place(bus, rim(seed=31 + i), at, db(-26), pan=0.28)
        place(bus, tick(seed=41 + i), at + 0.02, db(-34), pan=-0.1)

    # light sweep across the vermilion block
    place(bus, whoosh(), 10.34, db(-18), pan=-0.15)

    # the stamp lands, and the frame shakes
    place(bus, impact(), 11.74, db(-6))
    place(bus, kick(f0=150, f1=60, seed=77), 11.74, db(-9))

    # final low boom under the count-up
    place(bus, impact(dur=1.6, seed=91), 12.6, db(-8))

    # master: gentle high-pass, peak normalise to -1 dBFS
    for ch in range(2):
        bus[:, ch] = fft_band(bus[:, ch], 38, 19000, order=2.2)
    # soft-knee limiter: lifts the bed under the peaks, then normalise to -1 dBFS
    bus = np.tanh(bus * 2.7) / np.tanh(2.7)
    bus /= np.max(np.abs(bus)) + 1e-9
    bus *= db(-1.0)
    # 20 ms fade in, 380 ms fade out
    fi = int(0.02 * SR)
    bus[:fi] *= np.linspace(0, 1, fi)[:, None]
    fo = int(0.38 * SR)
    bus[-fo:] *= np.linspace(1, 0, fo)[:, None] ** 1.4

    pcm = (np.clip(bus, -1, 1) * 32767).astype("<i2")
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    peak = 20 * np.log10(np.max(np.abs(bus)) + 1e-12)
    rms = 20 * np.log10(np.sqrt(np.mean(bus ** 2)) + 1e-12)
    print(f"{path}  {length}s  peak {peak:.1f} dBFS  rms {rms:.1f} dBFS")


if __name__ == "__main__":
    main(*sys.argv[1:])
