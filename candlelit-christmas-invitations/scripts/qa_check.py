import argparse
from pathlib import Path
import subprocess

parser = argparse.ArgumentParser()
parser.add_argument("output", type=Path)
parser.add_argument("--proof", action="store_true", help="Check static layout only")
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
for config in sorted((root / "examples").glob("*.json")):
    command = ["node", str(root / "scripts" / "render.cjs"), str(config),
               str(args.output / config.stem)]
    if args.proof:
        command.append("--proof")
    subprocess.run(command, check=True)
