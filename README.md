# SpaceStroids

A free, retro-flavored asteroid shooter with modern neon graphics and a head nod to classic vector arcade games. Turn, thrust and drift through wrap-around space on pure inertia, shatter splitting crystal rocks, dodge saucers, and take down giant boss encounters.

**Play it in your browser:** https://nbwillcox.github.io/SpaceStroids/

Everything is generated in code: sprites are vector-drawn on the fly, and all sound effects and music are synthesized with the Web Audio API. There are no image or audio files and no build step. A sibling of [SpaceGalaShooter](https://github.com/nbwillcox/SpaceGalaShooter), [SpaceCentiShooter](https://github.com/nbwillcox/SpaceCentiShooter) and [SpaceVaderShooter](https://github.com/nbwillcox/SpaceVaderShooter), with the same look and feel.

## Controls

| Action | Keys |
| --- | --- |
| Turn / aim the ship | Mouse (follow the red reticle), or `A` / `D` / `←` / `→` to turn by key |
| Thrust forward / reverse thrust (pure inertia: no friction, so counter-thrust to stop) | `W` / `S` or `↑` / `↓` |
| Fire (hold to auto-fire) | `Space` or left mouse button |
| Hyperspace (teleport, short cooldown, small risk of a bad jump) | `Shift`, `H` or right mouse button |
| Pause | `P` or `Esc` |

## Gameplay

- The arena wraps on every edge: ship, rocks, bullets and saucers all pop out the opposite side.
- Rocks **split**: large into two medium, medium into two small, and the pieces fly faster. Smaller means more points.
- **Rock types:**
  - **Ore** rocks glow gold and drop a power-up when shattered.
  - **Volatile** rocks explode in a blast ring that chain-reacts through nearby rocks (and can hurt you).
  - **Iron** rocks are armored and take several hits before they crack open.
- **Saucers** cross the screen and shoot: the big one fires wildly, the small one aims. Dawdle and an anti-stall timer speeds up the rocks and brings saucers more often.
- **Power-ups:**
  - weapon tier: single → double → spread → piercing lances (a hit drops you one tier)
  - up to 2 orbiting wingmen
  - a shield bubble you can ram rocks with
- Bullets expire after about a second, so shots still count. Hyperspace is your only emergency button.
- Chain kills for a score multiplier (up to x8) and clear a wave without being hit for a Perfect bonus.
- Every 5th wave is a **boss**, picked at random: the **Rock Titan** (armored giant rock that cracks into chunks), the **Rock Hive** (sheds rocks from its nodes) or the **Mining Mothership** (launches saucers). Destroy the armor, nodes or generators to drop the core shield, then break the core.
- Local top-10 high scores with arcade-style 3-letter initials (stored in your browser).

## Run locally

It is plain HTML/CSS/JS. Either open `index.html` directly, or serve the folder:

```bash
python -m http.server 8000
```

then visit http://localhost:8000. Desktop browsers with keyboard and mouse only for now.

## License and attribution

Licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/): free to play, share and remix **non-commercially**, as long as you give credit and **link back to this repository**: https://github.com/nbwillcox/SpaceStroids

This is an original game inspired by classic arcade shooters. It uses no assets, names or code from any existing game.
