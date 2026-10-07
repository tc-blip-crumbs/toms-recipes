"""Prepare recipe illustrations for the site.

Put the original square PNG, with a see-through background, in
illustrations/originals/<recipe-slug>.png and add a description to
illustrations/illustrations.json. Then run:

    python3 tools/illustrations.py

For each original, this trims the empty margin, centres the drawing in a
square with the same margin on every illustration, and writes:
  illustrations/web/<slug>-400.webp and <slug>-800.webp for the pages
  illustrations/web/<slug>-share.jpg, 1200 x 630, for link previews
"""
import json, os, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'illustrations', 'originals')
OUT = os.path.join(ROOT, 'illustrations', 'web')
MARGIN = 0.05            # empty space on each side, as a share of the square
CREAM = (235, 224, 199)  # matches --art-bg in site.css

def square(im):
    im = im.convert('RGBA')
    box = im.getchannel('A').point(lambda a: 255 if a > 8 else 0).getbbox()
    art = im.crop(box)
    side = int(max(art.size) / (1 - 2 * MARGIN))
    sq = Image.new('RGBA', (side, side), (0, 0, 0, 0))
    sq.paste(art, ((side - art.width) // 2, (side - art.height) // 2), art)
    return sq

def main():
    alts = json.load(open(os.path.join(ROOT, 'illustrations', 'illustrations.json')))
    os.makedirs(OUT, exist_ok=True)
    for name in sorted(os.listdir(SRC)):
        if not name.endswith('.png'):
            continue
        slug = name[:-4]
        if slug not in alts:
            sys.exit(f'Add a description for {slug} to illustrations/illustrations.json')
        sq = square(Image.open(os.path.join(SRC, name)))
        for size in (400, 800):
            sq.resize((size, size), Image.LANCZOS).save(os.path.join(OUT, f'{slug}-{size}.webp'), 'WEBP', quality=86, method=6)
        share = Image.new('RGB', (1200, 630), CREAM)
        art = sq.resize((590, 590), Image.LANCZOS)
        share.paste(art, ((1200 - 590) // 2, 20), art)
        share.save(os.path.join(OUT, f'{slug}-share.jpg'), 'JPEG', quality=86, optimize=True)
        print(slug, 'done')

main()
