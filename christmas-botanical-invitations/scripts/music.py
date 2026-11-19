import math
import struct
import sys
import wave

RATE = 24000
DURATION = 10
BEAT = 0.46
samples = [[0.0, 0.0] for _ in range(RATE * DURATION)]

def note(pitch, start, length, volume, pan, bell=False):
    frequency = 440 * 2 ** ((pitch - 69) / 12)
    offset = round(start * RATE)
    for index in range(min(round(length * RATE), len(samples) - offset)):
        time = index / RATE
        phase = math.tau * frequency * time
        envelope = min(1.0, time / (0.008 if bell else 0.028))
        envelope *= math.exp(-time / (0.33 if bell else 0.59))
        envelope *= min(1.0, (length - time) / 0.19)
        tone = math.sin(phase) + .20 * math.sin(2 * phase) + .08 * math.sin(3.01 * phase)
        value = volume * envelope * tone
        samples[offset + index][0] += value * (1 - pan)
        samples[offset + index][1] += value * pan

chords = [(48, 55, 64, 67), (45, 52, 60, 64), (41, 53, 60, 65), (43, 55, 62, 67), (48, 55, 64, 72)]
for bar, chord in enumerate(chords):
    for beat, pitch in enumerate(chord):
        note(pitch, (bar * 4 + beat) * BEAT, 1.45, .20 if beat == 0 else .15, .44)

melody = [(0, 76), (1.5, 79), (3, 84), (4, 81), (5.5, 79), (7, 76),
          (8, 77), (9.5, 81), (11, 84), (12, 83), (13.5, 79), (15, 74), (16, 76), (18, 72)]
for beat, pitch in melody:
    start = .13 + beat * BEAT
    note(pitch, start, 1.4, .22, .58, bell=True)
    note(pitch, start + .11, .9, .033, .26, bell=True)

with wave.open(sys.argv[1], 'wb') as track:
    track.setparams((2, 2, RATE, 0, 'NONE', 'not compressed'))
    data = bytearray()
    for index, (left, right) in enumerate(samples):
        fade = min(1.0, index / (RATE * .075), (len(samples) - index) / (RATE * 1.15))
        data.extend(struct.pack('<hh', round(32767 * fade * left), round(32767 * fade * right)))
    track.writeframes(data)
