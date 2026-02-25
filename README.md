# Rail Runner Schedule

A mobile-friendly web app for the New Mexico Rail Runner Express train schedule.

**Live app:** [https://pcleddy.github.io/riometro/](https://pcleddy.github.io/riometro/)

## Features

- Pick your station from all 15 stops (Belen to Santa Fe Depot)
- Toggle between Northbound (to Santa Fe) and Southbound (to Belen)
- Shows next departures sorted by wait time, using your current time
- Custom time/day picker to check future schedules
- Express and Friday-only trains clearly labeled
- Remembers your station and direction between visits (localStorage)
- Zero dependencies beyond Vue 3 (loaded from CDN) — single HTML file, no build step

## Schedule Data

Based on the Rail Runner schedule effective **October 7, 2024**, covering weekday, Saturday, and Sunday service. The full schedule data is also available as `rail_runner_schedule.json`.

## Running Locally

Just open `index.html` in a browser. No server needed.
